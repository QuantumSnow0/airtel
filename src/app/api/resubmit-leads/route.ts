import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Fetch all records from leads_resubmit table
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin client not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("leads_resubmit")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching resubmit leads:", error);
      return NextResponse.json(
        { error: "Failed to fetch resubmit leads", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      leads: data || [],
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}










