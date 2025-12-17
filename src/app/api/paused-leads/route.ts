import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Fetch all paused leads
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin client not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("leads_paused")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching paused leads:", error);
      return NextResponse.json(
        { error: "Failed to fetch paused leads", details: error.message },
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

// POST - Transfer selected leads from leads_paused to leads
export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin client not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { leadIds } = body;

    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      return NextResponse.json(
        { error: "leadIds must be a non-empty array" },
        { status: 400 }
      );
    }

    // Fetch the leads from leads_paused
    const { data: pausedLeads, error: fetchError } = await supabaseAdmin
      .from("leads_paused")
      .select("*")
      .in("id", leadIds);

    if (fetchError) {
      console.error("Error fetching paused leads:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch paused leads", details: fetchError.message },
        { status: 500 }
      );
    }

    if (!pausedLeads || pausedLeads.length === 0) {
      return NextResponse.json(
        { error: "No leads found with the provided IDs" },
        { status: 404 }
      );
    }

    // Check which leads already exist in leads (to avoid duplicates)
    const { data: existingLeads, error: checkError } = await supabaseAdmin
      .from("leads")
      .select("id")
      .in("id", leadIds);

    if (checkError) {
      console.error("Error checking existing leads:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing leads", details: checkError.message },
        { status: 500 }
      );
    }

    const existingIds = existingLeads?.map((lead) => lead.id) || [];
    const leadsToInsert = pausedLeads.filter(
      (lead) => !existingIds.includes(lead.id)
    );
    const skippedIds = pausedLeads
      .filter((lead) => existingIds.includes(lead.id))
      .map((lead) => lead.id);

    if (leadsToInsert.length === 0) {
      return NextResponse.json({
        success: true,
        transferred: 0,
        skipped: skippedIds.length,
        skippedIds: skippedIds,
        message: "All selected leads already exist in leads table",
      });
    }

    // Insert into leads table
    const { data: insertedLeads, error: insertError } = await supabaseAdmin
      .from("leads")
      .insert(leadsToInsert)
      .select();

    if (insertError) {
      console.error("Error inserting leads:", insertError);
      return NextResponse.json(
        { error: "Failed to transfer leads", details: insertError.message },
        { status: 500 }
      );
    }

    // Delete from leads_paused (optional - you might want to keep them for audit)
    // Uncomment if you want to delete after transfer:
    // const { error: deleteError } = await supabaseAdmin
    //   .from("leads_paused")
    //   .in("id", leadIds)
    //   .delete();

    return NextResponse.json({
      success: true,
      transferred: insertedLeads?.length || 0,
      skipped: skippedIds.length,
      skippedIds: skippedIds,
      transferredIds: insertedLeads?.map((lead) => lead.id) || [],
      message: `Successfully transferred ${insertedLeads?.length || 0} lead(s)`,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

