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

    // Normalize phone numbers
    const normalizedAirtel = normalizePhone(airtelNumber);
    const normalizedAlternate = normalizePhone(alternateNumber);

    // Query database for potential matches (by phone numbers or email)
    // Check all time (no date filter)
    // Build OR conditions properly
    const conditions: string[] = [];
    
    if (normalizedAirtel) {
      conditions.push(`airtel_number.eq.${normalizedAirtel}`);
      conditions.push(`alternate_number.eq.${normalizedAirtel}`);
    }
    if (normalizedAlternate) {
      conditions.push(`airtel_number.eq.${normalizedAlternate}`);
      conditions.push(`alternate_number.eq.${normalizedAlternate}`);
    }
    if (email) {
      conditions.push(`email.eq.${email}`);
    }

    const { data: existingLeads, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .or(conditions.join(","));

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

    // Run checks in order, stop at first match
    for (const existingLead of existingLeads) {
      const existingAirtel = normalizePhone(existingLead.airtel_number || "");
      const existingAlternate = normalizePhone(
        existingLead.alternate_number || ""
      );
      const existingEmail = (existingLead.email || "").trim().toLowerCase();
      const existingName = (existingLead.customer_name || "").trim();
      const existingPackage = existingLead.preferred_package || "";
      const existingTown = existingLead.installation_town || "";
      const existingLandmark = existingLead.delivery_landmark || "";

      const newEmail = (email || "").trim().toLowerCase();
      const newName = (customerName || "").trim();

      // Check 1: All details match (excluding agent fields and timestamps)
      const allDetailsMatch =
        existingName.toLowerCase() === newName.toLowerCase() &&
        existingAirtel === normalizedAirtel &&
        existingAlternate === normalizedAlternate &&
        existingEmail === newEmail &&
        existingPackage === preferredPackage &&
        existingTown === installationTown &&
        existingLandmark === deliveryLandmark;

      if (allDetailsMatch) {
        return NextResponse.json({
          status: "RED",
          match: existingLead,
          reason: "All details match",
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
          match: existingLead,
          reason: "Both phone numbers and email match",
        });
      }

      // Check 3: Different name but both phone numbers match
      if (
        existingName.toLowerCase() !== newName.toLowerCase() &&
        existingAirtel === normalizedAirtel &&
        existingAlternate === normalizedAlternate
      ) {
        return NextResponse.json({
          status: "ORANGE",
          match: existingLead,
          reason: "Different name but both phone numbers match",
        });
      }

      // Check 4: Only email matches
      if (
        existingEmail === newEmail &&
        existingEmail !== "" &&
        (existingAirtel !== normalizedAirtel ||
          existingAlternate !== normalizedAlternate ||
          existingName.toLowerCase() !== newName.toLowerCase())
      ) {
        return NextResponse.json({
          status: "ORANGE",
          match: existingLead,
          reason: "Only email matches",
        });
      }

      // Check 5: Same name + same Airtel number
      if (
        existingName.toLowerCase() === newName.toLowerCase() &&
        existingAirtel === normalizedAirtel &&
        existingAirtel !== ""
      ) {
        return NextResponse.json({
          status: "RED",
          match: existingLead,
          reason: "Same name and Airtel number match",
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
          match: existingLead,
          reason: "Similar name and phone match with another field",
        });
      }

      // Check 7: Only one phone number matches
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
          match: existingLead,
          reason: "Only one phone number matches",
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

