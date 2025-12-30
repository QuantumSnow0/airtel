import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// POST - Lookup lead by email
export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Fetch the most recent lead with this email
    const { data: leads, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("email", email.trim().toLowerCase())
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching lead:", error);
      return NextResponse.json(
        { error: "Failed to lookup lead", details: error.message },
        { status: 500 }
      );
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json(
        {
          error:
            "Email not found. Please contact us at 0789 457 580 for assistance.",
        },
        { status: 404 }
      );
    }

    const lead = leads[0];

    // Return lead data (exclude sensitive fields)
    return NextResponse.json({
      lead: {
        customer_name: lead.customer_name,
        airtel_number: lead.airtel_number,
        alternate_number: lead.alternate_number,
        email: lead.email,
        preferred_package: lead.preferred_package,
        installation_town: lead.installation_town,
        delivery_landmark: lead.delivery_landmark,
        visit_date: lead.visit_date,
        visit_time: lead.visit_time,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}


