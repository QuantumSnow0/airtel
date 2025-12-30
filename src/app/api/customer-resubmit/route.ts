import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { randomUUID } from "crypto";

const MS_FORMS_FORM_ID =
  process.env.MS_FORMS_FORM_ID ||
  "JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQjc4M0wwWU9HRTJPRjMxWlc5QjRLOUhaMC4u";
const MS_FORMS_TENANT_ID =
  process.env.MS_FORMS_TENANT_ID || "16c73727-979c-4d82-b3a7-eb6a2fddfe57";
const MS_FORMS_USER_ID =
  process.env.MS_FORMS_USER_ID || "7726dd57-48bb-4c89-9e1e-f2669916f1fe";
const MS_FORMS_RESPONSE_PAGE_URL =
  process.env.MS_FORMS_RESPONSE_PAGE_URL || "https://forms.cloud.microsoft/";

// Question IDs from Microsoft Forms
const QUESTION_IDS = {
  agentType: "r0feee2e2bc7c44fb9af400709e7e6276",
  enterpriseCP: "r52e9f6e788444e2a96d9e30de5d635d8",
  agentName: "rcf88d2d33e8c4ed4b33ccc91fec1d771",
  agentMobile: "r2855e7f8fcfb44c98a2c5797e8e9b087",
  totalUnitsRequired: "r5d2a658a265b4f3ea2ad9aee1c8bc9c5",
  leadType: "rd897bb0eb8344bafaaf8db07a535a049",
  connectionType: "r4ceb180775c04d5a92a39fd687573090",
  customerName: "r3af4eebb47ff46b78eb4118311884f53",
  airtelNumber: "r8b0d2eb8e038433f8ce4888e07bed122",
  alternateNumber: "r401284e3fee94602a39ed9a0a14890ea",
  email: "r5dbc62a93dc64f3d84a2442f5ea4a856",
  preferredPackage: "r819c212e954f4367acaba71082424415",
  installationTown: "rc89257414e57426dac9a183c60a4b556",
  deliveryLandmark: "r7a69684d43ec4bf1b6971b21a8b4dd18",
  visitDate: "r68b858271107400189b8d681d1b19c38",
  visitTime: "rae98a58cb06949c1a3222443368aa64e",
  installationLocation: "r55f328ec020a4a629f58639cd56ecd85",
  optionalField: "r1e3b5a91acaa465b8aab76bab2cad94a",
};

// Internal defaults
const INTERNAL_DEFAULTS = {
  agentType: "Enterprise",
  enterpriseCP: "WAM APPLICATIONS",
  agentName: "samson karau maingi",
  agentMobile: "0789457580",
  leadType: "Confirmed",
  connectionType: "SmartConnect (5G ODU)",
};

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      email,
      customerName,
      airtelNumber,
      alternateNumber,
      preferredPackage,
      installationTown,
      deliveryLandmark,
      visitDate,
      visitTime,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check for 3-day rate limit (check by email only if resubmitted column doesn't exist)
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    let recentResubmissions: any[] = [];
    try {
      // Try to check with resubmitted flag first
      const { data, error: rateLimitError } = await supabaseAdmin
        .from("leads")
        .select("created_at")
        .eq("email", normalizedEmail)
        .gte("created_at", threeDaysAgo.toISOString())
        .order("created_at", { ascending: false })
        .limit(1);

      if (rateLimitError && rateLimitError.code === "42703") {
        // Column doesn't exist, skip rate limit check
        console.log("resubmitted column not found, skipping rate limit check");
      } else if (rateLimitError) {
        console.error("Error checking rate limit:", rateLimitError);
        // Continue anyway - don't block on rate limit check error
      } else {
        recentResubmissions = data || [];
      }
    } catch (err) {
      console.error("Error in rate limit check:", err);
      // Continue anyway
    }

    if (recentResubmissions && recentResubmissions.length > 0) {
      const lastResubmission = new Date(recentResubmissions[0].created_at);
      const daysSince = Math.floor(
        (Date.now() - lastResubmission.getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysRemaining = 3 - daysSince;

      if (daysRemaining > 0) {
        return NextResponse.json(
          {
            error: `You can only resubmit once every 3 days. Please wait ${daysRemaining} more day${daysRemaining > 1 ? "s" : ""}.`,
          },
          { status: 429 }
        );
      }
    }

    // Normalize town name for MS Forms
    const normalizeTownForMSForms = (town: string): string => {
      if (!town) return town;
      return town.replace(/\s+/g, "").toUpperCase();
    };

    const normalizedTown = normalizeTownForMSForms(installationTown);

    // Build installation location (use deliveryLandmark as installationLocation)
    const installationLocation =
      deliveryLandmark && normalizedTown
        ? `${normalizedTown} - ${deliveryLandmark}`
        : deliveryLandmark || "";

    // Format phone numbers
    const formatPhone = (phone: string | undefined | null): string => {
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

    // Fetch Microsoft Forms tokens
    let formsSessionId = "";
    let requestVerificationToken = "";
    let muid = "";
    let msalCacheEncryption = "";
    let userSessionId = "";
    let userId = "";
    let tenantId = "";
    let cookieString = "";

    try {
      const tokenResponse = await fetch(MS_FORMS_RESPONSE_PAGE_URL, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br, zstd",
        },
      });

      if (!tokenResponse.ok) {
        throw new Error(`Failed to fetch tokens: ${tokenResponse.status}`);
      }

      const setCookieHeaders = tokenResponse.headers.getSetCookie();
      const cookies: string[] = [];

      for (const cookie of setCookieHeaders) {
        const cookiePair = cookie.split(";")[0];
        cookies.push(cookiePair);

        if (cookie.startsWith("FormsWebSessionId=")) {
          formsSessionId = cookiePair.split("FormsWebSessionId=")[1];
        }
        if (cookie.startsWith("__RequestVerificationToken=")) {
          requestVerificationToken = cookiePair.split(
            "__RequestVerificationToken="
          )[1];
        }
        if (cookie.startsWith("MUID=")) {
          muid = cookiePair.split("MUID=")[1];
        }
        if (cookie.startsWith("msal.cache.encryption=")) {
          msalCacheEncryption = cookiePair.split("msal.cache.encryption=")[1];
        }
      }

      cookieString = cookies.join("; ");
      userSessionId = tokenResponse.headers.get("x-usersessionid") || "";

      const html = await tokenResponse.text();
      const tokenMatch = html.match(
        /name="__RequestVerificationToken"\s+value="([^"]+)"/
      );
      if (tokenMatch) {
        requestVerificationToken = tokenMatch[1];
      }

      const userIdMatch = html.match(/"userId":"([^"]+)"/);
      const tenantMatch = html.match(/"tenantId":"([^"]+)"/);

      userId = userIdMatch ? userIdMatch[1] : MS_FORMS_USER_ID;
      tenantId = tenantMatch ? tenantMatch[1] : MS_FORMS_TENANT_ID;
    } catch (tokenError) {
      console.error("Error fetching Microsoft Forms tokens:", tokenError);
      return NextResponse.json(
        {
          error: "Failed to fetch Microsoft Forms tokens",
          details:
            tokenError instanceof Error
              ? tokenError.message
              : String(tokenError),
        },
        { status: 500 }
      );
    }

    // Build Microsoft Forms payload
    const startDate = new Date().toISOString();
    const submitDate = new Date().toISOString();
    const correlationId = randomUUID();

    if (!userSessionId) {
      userSessionId = randomUUID();
    }

    // Map package names
    const packageMap: Record<string, string> = {
      standard: "5G _15Mbps_30days at Ksh.2999",
      premium: "5G _30Mbps_30days at Ksh.3999",
    };
    const fullPackageName =
      packageMap[preferredPackage?.toLowerCase() || ""] || preferredPackage;

    // Convert time to 24-hour format (time input gives HH:MM, but handle 12-hour format too)
    const convertTo24Hour = (time: string): string => {
      // If already in 24-hour format (HH:MM), return as-is
      const time24Match = time.match(/^(\d{1,2}):(\d{2})$/);
      if (time24Match && parseInt(time24Match[1]) < 24) {
        return time;
      }

      // Try 12-hour format (HH:MM AM/PM)
      const timeMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!timeMatch) return time || "10:00";

      let hours = parseInt(timeMatch[1], 10);
      const minutes = timeMatch[2];
      const period = timeMatch[3].toUpperCase();

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };
    const time24Hour = convertTo24Hour(visitTime || "10:00");

    // Build answers array
    const answers = [
      {
        questionId: QUESTION_IDS.agentType,
        answer1: INTERNAL_DEFAULTS.agentType,
      },
      {
        questionId: QUESTION_IDS.enterpriseCP,
        answer1: INTERNAL_DEFAULTS.enterpriseCP,
      },
      {
        questionId: QUESTION_IDS.agentName,
        answer1: INTERNAL_DEFAULTS.agentName,
      },
      {
        questionId: QUESTION_IDS.agentMobile,
        answer1: `254${INTERNAL_DEFAULTS.agentMobile.replace(/^0/, "")}`,
      },
      {
        questionId: QUESTION_IDS.leadType,
        answer1: INTERNAL_DEFAULTS.leadType,
      },
      {
        questionId: QUESTION_IDS.totalUnitsRequired,
        answer1: "1",
      },
      {
        questionId: QUESTION_IDS.connectionType,
        answer1: INTERNAL_DEFAULTS.connectionType,
      },
      {
        questionId: QUESTION_IDS.customerName,
        answer1: customerName,
      },
      {
        questionId: QUESTION_IDS.airtelNumber,
        answer1: formatPhone(airtelNumber),
      },
      {
        questionId: QUESTION_IDS.alternateNumber,
        answer1: formatPhone(alternateNumber),
      },
      {
        questionId: QUESTION_IDS.email,
        answer1: normalizedEmail,
      },
      {
        questionId: QUESTION_IDS.preferredPackage,
        answer1: fullPackageName,
      },
      {
        questionId: QUESTION_IDS.visitDate,
        answer1: visitDate,
      },
      {
        questionId: QUESTION_IDS.visitTime,
        answer1: time24Hour,
      },
      {
        questionId: QUESTION_IDS.deliveryLandmark,
        answer1: deliveryLandmark || "",
      },
      {
        questionId: QUESTION_IDS.installationTown,
        answer1: normalizedTown,
      },
      {
        questionId: QUESTION_IDS.installationLocation,
        answer1: installationLocation,
      },
      {
        questionId: QUESTION_IDS.optionalField,
        answer1: null,
      },
    ];

    const msFormsPayload = {
      startDate: startDate,
      submitDate: submitDate,
      answers: JSON.stringify(answers),
    };

    // Submit to Microsoft Forms
    const encodedFormId = encodeURIComponent(MS_FORMS_FORM_ID);
    const msFormsUrl = `https://forms.guest.usercontent.microsoft/formapi/api/${tenantId}/users/${userId}/forms(%27${encodedFormId}%27)/responses`;

    let msFormsResponseId: number | null = null;

    try {
      const formsResponse = await fetch(msFormsUrl, {
        method: "POST",
        headers: {
          __requestverificationtoken: requestVerificationToken,
          accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-US,en;q=0.9",
          authorization: "",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          Host: "forms.guest.usercontent.microsoft",
          "odata-maxverion": "4.0",
          "odata-version": "4.0",
          Origin: "https://forms.cloud.microsoft",
          Referer: "https://forms.cloud.microsoft/",
          "sec-ch-ua":
            '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
          "x-correlationid": correlationId,
          "x-ms-form-muid": muid || "",
          "x-ms-form-request-ring": "business",
          "x-ms-form-request-source": "ms-formweb",
          "x-usersessionid": userSessionId,
          Cookie: cookieString,
        },
        body: JSON.stringify(msFormsPayload),
      });

      let formsResponseData;
      try {
        formsResponseData = await formsResponse.json();
      } catch (jsonError) {
        const textResponse = await formsResponse.text();
        throw new Error(
          `Microsoft Forms submission failed: ${
            formsResponse.status
          } - ${textResponse.substring(0, 500)}`
        );
      }

      if (!formsResponse.ok) {
        throw new Error(
          `Microsoft Forms submission failed: ${
            formsResponse.status
          } - ${JSON.stringify(formsResponseData)}`
        );
      }

      msFormsResponseId = formsResponseData?.id || null;

      console.log("✅ Microsoft Forms submission SUCCESS:", {
        status: formsResponse.status,
        responseId: msFormsResponseId,
        email: normalizedEmail,
        timestamp: new Date().toISOString(),
      });
    } catch (formsError) {
      console.error("Microsoft Forms submission error:", formsError);
      return NextResponse.json(
        {
          error: "Failed to submit to Microsoft Forms",
          details:
            formsError instanceof Error
              ? formsError.message
              : String(formsError),
        },
        { status: 500 }
      );
    }

    // Insert into leads table
    // Note: resubmitted column may not exist yet - if insert fails, check database schema
    const leadData: any = {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      customer_name: customerName,
      airtel_number: formatPhone(airtelNumber),
      alternate_number: formatPhone(alternateNumber),
      email: normalizedEmail,
      preferred_package: preferredPackage,
      installation_town: installationTown,
      delivery_landmark: deliveryLandmark || "",
      visit_date: visitDate,
      visit_time: visitTime,
      agent_type: INTERNAL_DEFAULTS.agentType,
      enterprise_cp: INTERNAL_DEFAULTS.enterpriseCP,
      agent_name: INTERNAL_DEFAULTS.agentName,
      agent_mobile: INTERNAL_DEFAULTS.agentMobile,
      lead_type: INTERNAL_DEFAULTS.leadType,
      connection_type: INTERNAL_DEFAULTS.connectionType,
      ms_forms_response_id: msFormsResponseId,
      ms_forms_submitted_at: new Date().toISOString(),
      submission_status: "submitted",
      bypass_duplicate_check: true, // Allow resubmission
      resubmitted: true, 
    };

    const { data: insertedLead, error: insertError } = await supabaseAdmin
      .from("leads")
      .insert([leadData])
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting lead:", insertError);
      return NextResponse.json(
        {
          error: "Failed to save resubmission",
          details: insertError.message,
          msFormsResponseId: msFormsResponseId,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request resubmitted successfully",
      leadId: insertedLead.id,
      msFormsResponseId: msFormsResponseId,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

