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
        { error: "Supabase admin client not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: "leadId is required" },
        { status: 400 }
      );
    }

    // Step 1: Fetch the record from leads_resubmit
    const { data: resubmitLead, error: fetchError } = await supabaseAdmin
      .from("leads_resubmit")
      .select("*")
      .eq("id", leadId)
      .single();

    if (fetchError || !resubmitLead) {
      console.error("Error fetching resubmit lead:", fetchError);
      return NextResponse.json(
        {
          error: "Lead not found in leads_resubmit table",
          details: fetchError?.message,
        },
        { status: 404 }
      );
    }

    // Step 2: Prepare data for MS Forms submission
    const {
      customer_name,
      airtel_number,
      alternate_number,
      email,
      preferred_package,
      installation_town,
      delivery_landmark,
      visit_date,
      visit_time,
    } = resubmitLead;

    // Normalize town name for MS Forms (remove spaces, convert to uppercase)
    const normalizeTownForMSForms = (town: string): string => {
      if (!town) return town;
      return town.replace(/\s+/g, "").toUpperCase();
    };

    const normalizedTown = normalizeTownForMSForms(installation_town);

    // Build installation location (if we have delivery_landmark, use it)
    // For resubmit, we'll use delivery_landmark as installation location if available
    const installationLocation =
      delivery_landmark && normalizedTown
        ? `${normalizedTown} - ${delivery_landmark}`
        : delivery_landmark || normalizedTown || "";

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

    // Step 3: Fetch Microsoft Forms tokens
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

      // Extract cookies from Set-Cookie headers
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

      // Extract __RequestVerificationToken from response body
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

    // Step 4: Build Microsoft Forms payload
    const startDate = new Date().toISOString();
    const submitDate = new Date().toISOString();
    const correlationId = randomUUID();

    if (!userSessionId) {
      userSessionId = randomUUID();
    }

    // Map package names to full Microsoft Forms format
    const packageMap: Record<string, string> = {
      standard: "5G _15Mbps_30days at Ksh.2999",
      premium: "5G _30Mbps_30days at Ksh.3999",
    };
    const fullPackageName =
      packageMap[preferred_package?.toLowerCase() || ""] || preferred_package;

    // Convert time from 12-hour format to 24-hour format
    const convertTo24Hour = (time12h: string): string => {
      const timeMatch = time12h.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!timeMatch) return time12h;

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
    const time24Hour = convertTo24Hour(visit_time || "10:00 AM");

    // Build answers array in the exact order as Microsoft Forms expects
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
        answer1: customer_name,
      },
      {
        questionId: QUESTION_IDS.airtelNumber,
        answer1: formatPhone(airtel_number),
      },
      {
        questionId: QUESTION_IDS.alternateNumber,
        answer1: formatPhone(alternate_number),
      },
      {
        questionId: QUESTION_IDS.email,
        answer1: email,
      },
      {
        questionId: QUESTION_IDS.preferredPackage,
        answer1: fullPackageName,
      },
      {
        questionId: QUESTION_IDS.visitDate,
        answer1: visit_date,
      },
      {
        questionId: QUESTION_IDS.visitTime,
        answer1: time24Hour,
      },
      {
        questionId: QUESTION_IDS.deliveryLandmark,
        answer1: delivery_landmark || "",
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

    // Step 5: Submit to Microsoft Forms
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
        leadId: leadId,
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

    // Step 6: Insert into leads table with bypass_duplicate_check = true
    const newLeadData = {
      // Generate new UUID (don't reuse the original)
      id: randomUUID(),
      // Use current timestamp
      created_at: new Date().toISOString(),
      // Customer information
      customer_name,
      airtel_number: formatPhone(airtel_number),
      alternate_number: formatPhone(alternate_number),
      email,
      // Package and location
      preferred_package: preferred_package,
      installation_town: installation_town,
      delivery_landmark: delivery_landmark || "",
      // Installation schedule
      visit_date: visit_date,
      visit_time: visit_time,
      // Internal agent data (use from resubmit lead or defaults)
      agent_type: resubmitLead.agent_type || INTERNAL_DEFAULTS.agentType,
      enterprise_cp:
        resubmitLead.enterprise_cp || INTERNAL_DEFAULTS.enterpriseCP,
      agent_name: resubmitLead.agent_name || INTERNAL_DEFAULTS.agentName,
      agent_mobile: resubmitLead.agent_mobile || INTERNAL_DEFAULTS.agentMobile,
      lead_type: resubmitLead.lead_type || INTERNAL_DEFAULTS.leadType,
      connection_type:
        resubmitLead.connection_type || INTERNAL_DEFAULTS.connectionType,
      // Microsoft Forms submission tracking
      ms_forms_response_id: msFormsResponseId,
      ms_forms_submitted_at: new Date().toISOString(),
      submission_status: "submitted" as const,
      // IMPORTANT: Set bypass_duplicate_check to true
      bypass_duplicate_check: true,
    };

    const { data: insertedLead, error: insertError } = await supabaseAdmin
      .from("leads")
      .insert([newLeadData])
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting lead into leads table:", insertError);
      return NextResponse.json(
        {
          error: "Failed to insert lead into leads table",
          details: insertError.message,
          msFormsResponseId: msFormsResponseId, // MS Forms submission succeeded, but DB insert failed
        },
        { status: 500 }
      );
    }

    // Step 7: Update resubmit_count in leads_resubmit table
    // Increment the resubmit_count (default to 0 if null, then add 1)
    const currentCount = (resubmitLead.resubmit_count as number) || 0;
    const newCount = currentCount + 1;

    const { error: updateError } = await supabaseAdmin
      .from("leads_resubmit")
      .update({
        resubmit_count: newCount,
        last_resubmitted_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (updateError) {
      console.error("Error updating resubmit_count:", updateError);
      // Don't fail the request - lead was successfully inserted and submitted
    }

    return NextResponse.json({
      success: true,
      message: "Lead resubmitted successfully",
      leadId: insertedLead.id,
      msFormsResponseId: msFormsResponseId,
      newLeadCreatedAt: insertedLead.created_at,
      resubmitCount: newCount,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
