import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// POST - Check if email + phone combination exists (for real-time detection)
export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, airtelNumber, alternateNumber } = body;

    if (!email || !email.trim()) {
      return NextResponse.json({ found: false });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Normalize phone numbers for comparison
    const normalizePhone = (phone: string): string => {
      if (!phone) return "";
      const digits = phone.replace(/\D/g, "");
      if (digits.startsWith("254") && digits.length >= 12) {
        return digits;
      }
      if (digits.startsWith("0")) {
        return `254${digits.substring(1)}`;
      }
      if (digits.length >= 9) {
        return `254${digits}`;
      }
      return digits;
    };

    const normalizedAirtel = normalizePhone(airtelNumber || "");
    const normalizedAlternate = normalizePhone(alternateNumber || "");

    // If no phone numbers provided, return not found (security: require phone match)
    if (!normalizedAirtel && !normalizedAlternate) {
      return NextResponse.json({ found: false });
    }

    // Query: First get all leads with matching email
    // Then filter in JavaScript for phone match (more reliable than complex Supabase query)
    const { data: leadsByEmail, error: emailError } = await supabaseAdmin
      .from("leads")
      .select("id, customer_name, created_at, airtel_number, alternate_number")
      .eq("email", normalizedEmail)
      .order("created_at", { ascending: false })
      .limit(10); // Get a few recent ones to check

    if (emailError) {
      console.error("Error checking for existing lead by email:", emailError);
      return NextResponse.json({ found: false });
    }

    if (!leadsByEmail || leadsByEmail.length === 0) {
      return NextResponse.json({ found: false });
    }

    // Now filter for phone number match
    let matchingLead = null;
    for (const lead of leadsByEmail) {
      const leadAirtel = normalizePhone(lead.airtel_number || "");
      const leadAlternate = normalizePhone(lead.alternate_number || "");
      
      // Check if at least one phone number matches
      const phoneMatches = 
        (normalizedAirtel && (leadAirtel === normalizedAirtel || leadAlternate === normalizedAirtel)) ||
        (normalizedAlternate && (leadAirtel === normalizedAlternate || leadAlternate === normalizedAlternate));
      
      if (phoneMatches) {
        matchingLead = lead;
        break; // Found a match, use the most recent one
      }
    }

    if (!matchingLead) {
      return NextResponse.json({ found: false });
    }

    // Return minimal data (just enough to show notification)
    return NextResponse.json({
      found: true,
      leadId: matchingLead.id,
      customerName: matchingLead.customer_name,
      createdAt: matchingLead.created_at,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ found: false });
  }
}
