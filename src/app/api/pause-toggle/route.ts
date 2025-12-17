import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Check current pause status
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin client not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("app_settings")
      .select("is_paused")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Error fetching pause status:", error);
      return NextResponse.json(
        { error: "Failed to fetch pause status", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      is_paused: data?.is_paused || false,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

// POST - Toggle pause status
export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin client not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { is_paused } = body;

    if (typeof is_paused !== "boolean") {
      return NextResponse.json(
        { error: "is_paused must be a boolean" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("app_settings")
      .update({
        is_paused: is_paused,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      console.error("Error updating pause status:", error);
      return NextResponse.json(
        { error: "Failed to update pause status", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      is_paused: data.is_paused,
      message: data.is_paused
        ? "Pause enabled - submissions will go to leads_paused"
        : "Pause disabled - submissions will go to leads",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

