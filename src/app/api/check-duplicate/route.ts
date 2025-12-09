import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Helper function to normalize phone numbers
function normalizePhone(phone: string): string {
  if (!phone) return "";
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, "");
  // Convert to international format
  if (digits.startsWith("254") && digits.length >= 12) {
    return digits;
  }
  if (digits.startsWith("0") && digits.length >= 9) {
    return `254${digits.substring(1)}`;
  }
  if (digits.length >= 9 && !digits.startsWith("254")) {
    return `254${digits}`;
  }
  return digits;
}

// Helper function to check if names are similar (case-insensitive exact match for now)
function areNamesSimilar(name1: string, name2: string): boolean {
  if (!name1 || !name2) return false;
  return name1.trim().toLowerCase() === name2.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      airtelNumber,
      alternateNumber,
      email,
      preferredPackage,
      installationTown,
      deliveryLandmark,
    } = body;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    // Normalize phone numbers once (reused throughout)
    const normalizedAirtel = normalizePhone(airtelNumber);
    const normalizedAlternate = normalizePhone(alternateNumber);
    
    // Pre-compute normalized values for comparison
    const newEmail = (email || "").trim().toLowerCase();
    const newName = (customerName || "").trim().toLowerCase();

    // Build query conditions - deduplicate if both phone numbers are the same
    const conditions: string[] = [];
    const uniquePhones = new Set<string>();
    
    if (normalizedAirtel) {
      uniquePhones.add(normalizedAirtel);
    }
    if (normalizedAlternate && normalizedAlternate !== normalizedAirtel) {
      uniquePhones.add(normalizedAlternate);
    }
    
    // Add conditions for each unique phone number
    for (const phone of uniquePhones) {
      conditions.push(`airtel_number.eq.${phone}`);
      conditions.push(`alternate_number.eq.${phone}`);
    }
    
    if (email) {
      conditions.push(`email.eq.${email}`);
    }

    // Early return if no conditions to check
    if (conditions.length === 0) {
      return NextResponse.json({ status: "NONE", match: null });
    }

    // Query with limit to prevent fetching too many rows
    // Limit of 50 should be sufficient for duplicate checking
    const { data: existingLeads, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .or(conditions.join(","))
      .limit(50);

    if (error) {
      console.error("Database query error:", error);
      return NextResponse.json(
        { error: "Failed to check for duplicates" },
        { status: 500 }
      );
    }

    if (!existingLeads || existingLeads.length === 0) {
      return NextResponse.json({ status: "NONE", match: null });
    }

    // Pre-compute normalized values for all existing leads once
    const processedLeads = existingLeads.map((lead) => ({
      originalLead: lead,
      normalizedAirtel: normalizePhone(lead.airtel_number || ""),
      normalizedAlternate: normalizePhone(lead.alternate_number || ""),
      normalizedEmail: (lead.email || "").trim().toLowerCase(),
      normalizedName: (lead.customer_name || "").trim().toLowerCase(),
      package: lead.preferred_package || "",
      town: lead.installation_town || "",
      landmark: lead.delivery_landmark || "",
    }));

    // Run checks in optimized order (simpler checks first, complex last)
    // Stop at first match for efficiency
    for (const existing of processedLeads) {
      const {
        originalLead,
        normalizedAirtel: existingAirtel,
        normalizedAlternate: existingAlternate,
        normalizedEmail: existingEmail,
        normalizedName: existingName,
        package: existingPackage,
        town: existingTown,
        landmark: existingLandmark,
      } = existing;

      // Check 1: Same name + same Airtel number (simple, common case)
      if (
        existingName === newName &&
        existingAirtel === normalizedAirtel &&
        existingAirtel !== ""
      ) {
        return NextResponse.json({
          status: "RED",
          match: originalLead,
          reason: "Same name and Airtel number match",
        });
      }

      // Check 2: Both phone numbers + email match
      if (
        existingAirtel === normalizedAirtel &&
        existingAlternate === normalizedAlternate &&
        existingEmail === newEmail &&
        existingEmail !== ""
      ) {
        return NextResponse.json({
          status: "RED",
          match: originalLead,
          reason: "Both phone numbers and email match",
        });
      }

      // Check 3: Only one phone number matches (simple check)
      const onlyAirtelMatches =
        existingAirtel === normalizedAirtel &&
        existingAirtel !== "" &&
        existingAlternate !== normalizedAlternate;
      const onlyAlternateMatches =
        existingAlternate === normalizedAlternate &&
        existingAlternate !== "" &&
        existingAirtel !== normalizedAirtel;
      const crossMatches =
        (existingAirtel === normalizedAlternate && normalizedAlternate !== "") ||
        (existingAlternate === normalizedAirtel && normalizedAirtel !== "");

      if (onlyAirtelMatches || onlyAlternateMatches || crossMatches) {
        return NextResponse.json({
          status: "ORANGE",
          match: originalLead,
          reason: "Only one phone number matches",
        });
      }

      // Check 4: Only email matches
      if (
        existingEmail === newEmail &&
        existingEmail !== "" &&
        (existingAirtel !== normalizedAirtel ||
          existingAlternate !== normalizedAlternate ||
          existingName !== newName)
      ) {
        return NextResponse.json({
          status: "ORANGE",
          match: originalLead,
          reason: "Only email matches",
        });
      }

      // Check 5: Different name but both phone numbers match
      if (
        existingName !== newName &&
        existingAirtel === normalizedAirtel &&
        existingAlternate === normalizedAlternate
      ) {
        return NextResponse.json({
          status: "ORANGE",
          match: originalLead,
          reason: "Different name but both phone numbers match",
        });
      }

      // Check 6: Similar names + at least one phone matches (with another field)
      const namesSimilar = areNamesSimilar(existingName, newName);
      const onePhoneMatches =
        existingAirtel === normalizedAirtel ||
        existingAlternate === normalizedAlternate ||
        existingAirtel === normalizedAlternate ||
        existingAlternate === normalizedAirtel;

      // Require another matching field (email, package, or town)
      const anotherFieldMatches =
        (existingEmail === newEmail && existingEmail !== "") ||
        existingPackage === preferredPackage ||
        existingTown === installationTown;

      if (namesSimilar && onePhoneMatches && anotherFieldMatches) {
        return NextResponse.json({
          status: "RED",
          match: originalLead,
          reason: "Similar name and phone match with another field",
        });
      }

      // Check 7: All details match (most expensive check - done last)
      if (
        existingName === newName &&
        existingAirtel === normalizedAirtel &&
        existingAlternate === normalizedAlternate &&
        existingEmail === newEmail &&
        existingPackage === preferredPackage &&
        existingTown === installationTown &&
        existingLandmark === deliveryLandmark
      ) {
        return NextResponse.json({
          status: "RED",
          match: originalLead,
          reason: "All details match",
        });
      }
    }

    // No matches found
    return NextResponse.json({ status: "NONE", match: null });
  } catch (error: any) {
    console.error("Duplicate check error:", error);
    return NextResponse.json(
      { error: "Failed to check for duplicates", details: error.message },
      { status: 500 }
    );
  }
}

