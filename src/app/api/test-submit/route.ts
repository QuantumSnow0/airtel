import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { LeadSubmission } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin client not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      customerName,
      airtelNumber,
      alternateNumber,
      email,
      preferredPackage,
      installationTown,
      deliveryLandmark,
      visitDate,
      visitTime,
    } = body;

    // Format phone numbers (convert from 7XXXXXXXX to 2547XXXXXXXX)
    const formatPhone = (phone: string): string => {
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

    // Prepare data for Supabase
    const leadData: LeadSubmission = {
      customer_name: customerName,
      airtel_number: formatPhone(airtelNumber),
      alternate_number: formatPhone(alternateNumber),
      email: email,
      preferred_package: preferredPackage,
      installation_town: installationTown,
      delivery_landmark: deliveryLandmark,
      visit_date: visitDate,
      visit_time: visitTime,
      // Internal defaults
      agent_type: "Enterprise",
      enterprise_cp: "WAM APPLICATIONS",
      agent_name: "samson karau maingi",
      agent_mobile: "0789457580",
      lead_type: "Confirmed",
      connection_type: "SmartConnect (5G ODU)",
      submission_status: "pending",
    };

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert([leadData])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save to database", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead saved successfully",
        id: data.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}





