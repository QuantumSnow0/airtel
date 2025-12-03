import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { LeadSubmission } from "@/lib/types";
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
  totalUnitsRequired: "r5d2a658a265b4f3ea2ad9aee1c8bc9c5", // Total Units Required (field 5)
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
  installationLocation: "r55f328ec020a4a629f58639cd56ecd85", // Combined location field (e.g., "NAIROBI - Langata")
  optionalField: "r1e3b5a91acaa465b8aab76bab2cad94a", // Optional field (can be null)
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

    // Build installation location (town - landmark format)
    const installationLocation = `${installationTown} - ${deliveryLandmark}`;

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
      agent_type: INTERNAL_DEFAULTS.agentType,
      enterprise_cp: INTERNAL_DEFAULTS.enterpriseCP,
      agent_name: INTERNAL_DEFAULTS.agentName,
      agent_mobile: INTERNAL_DEFAULTS.agentMobile,
      lead_type: INTERNAL_DEFAULTS.leadType,
      connection_type: INTERNAL_DEFAULTS.connectionType,
      submission_status: "pending",
    };

    // Step 1: Save to Supabase first
    const { data: supabaseData, error: supabaseError } = await supabaseAdmin
      .from("leads")
      .insert([leadData])
      .select()
      .single();

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError);
      return NextResponse.json(
        { error: "Failed to save to database", details: supabaseError.message },
        { status: 500 }
      );
    }

    const leadId = supabaseData.id;

    // Step 2: Fetch Microsoft Forms tokens
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
        // Extract cookie name and value (everything before the first semicolon)
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

      // Build cookie string for POST request
      cookieString = cookies.join("; ");

      // Extract x-usersessionid from response headers (if present)
      userSessionId = tokenResponse.headers.get("x-usersessionid") || "";

      // Extract __RequestVerificationToken from response body (it's in a hidden input)
      const html = await tokenResponse.text();
      const tokenMatch = html.match(
        /name="__RequestVerificationToken"\s+value="([^"]+)"/
      );
      if (tokenMatch) {
        requestVerificationToken = tokenMatch[1];
      }

      // Extract user and tenant IDs from the page (they might be in the HTML or we use defaults)
      // These are typically in the API endpoint URL structure
      // For now, we'll use the pattern we observed
      const userIdMatch = html.match(/"userId":"([^"]+)"/);
      const tenantMatch = html.match(/"tenantId":"([^"]+)"/);

      // If not found in HTML, use the configured values
      userId = userIdMatch ? userIdMatch[1] : MS_FORMS_USER_ID;
      tenantId = tenantMatch ? tenantMatch[1] : MS_FORMS_TENANT_ID;

      console.log("✅ Microsoft Forms tokens fetched successfully:", {
        formsSessionId: formsSessionId ? "✓" : "✗",
        requestVerificationToken: requestVerificationToken ? "✓" : "✗",
        userSessionId: userSessionId || "generated",
        userId: userId,
        tenantId: tenantId,
        timestamp: new Date().toISOString(),
      });
    } catch (tokenError) {
      // Log error for debugging but don't fail the request - data is safely stored
      console.error(
        "Error fetching Microsoft Forms tokens (data saved to database):",
        {
          error: tokenError,
          message:
            tokenError instanceof Error
              ? tokenError.message
              : String(tokenError),
          stack: tokenError instanceof Error ? tokenError.stack : undefined,
          leadId: leadId,
          timestamp: new Date().toISOString(),
        }
      );
      // Update Supabase with pending status (will be submitted when form reopens)
      await supabaseAdmin
        .from("leads")
        .update({
          submission_status: "pending",
          error_details:
            tokenError instanceof Error
              ? tokenError.message
              : String(tokenError),
        })
        .eq("id", leadId);

      // Return success to user - data is safely stored in database
      return NextResponse.json(
        {
          success: true,
          message: "Form submitted successfully! We'll contact you soon.",
          leadId: leadId,
          savedToDatabase: true,
        },
        { status: 200 }
      );
    }

    // Step 3: Build Microsoft Forms payload
    const startDate = new Date().toISOString();
    const submitDate = new Date().toISOString();

    // Generate correlation ID
    const correlationId = randomUUID();

    // Generate user session ID if not extracted from headers
    if (!userSessionId) {
      userSessionId = randomUUID();
    }

    // Map package names to full Microsoft Forms format
    // Format must match exactly: "5G _[SPEED]Mbps_30days at Ksh.[PRICE]"
    const packageMap: Record<string, string> = {
      standard: "5G _15Mbps_30days at Ksh.2999",
      premium: "5G _30Mbps_30days at Ksh.3999",
    };
    const fullPackageName =
      packageMap[preferredPackage.toLowerCase()] || preferredPackage;

    // Convert time from 12-hour format (e.g., "10:00 AM") to 24-hour format (e.g., "10:00")
    const convertTo24Hour = (time12h: string): string => {
      const timeMatch = time12h.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!timeMatch) return time12h; // Return as-is if format doesn't match

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
    const time24Hour = convertTo24Hour(visitTime);

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
        answer1: email,
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
        answer1: deliveryLandmark,
      },
      {
        questionId: QUESTION_IDS.installationTown,
        answer1: installationTown,
      },
      {
        questionId: QUESTION_IDS.installationLocation,
        answer1: installationLocation,
      },
      {
        questionId: QUESTION_IDS.optionalField,
        answer1: null, // Optional field - set to null as per form structure
      },
    ];

    const msFormsPayload = {
      startDate: startDate,
      submitDate: submitDate,
      answers: JSON.stringify(answers),
    };

    // Step 4: Submit to Microsoft Forms
    // URL encode the form ID for the API endpoint
    const encodedFormId = encodeURIComponent(MS_FORMS_FORM_ID);
    const msFormsUrl = `https://forms.guest.usercontent.microsoft/formapi/api/${tenantId}/users/${userId}/forms(%27${encodedFormId}%27)/responses`;

    console.log("📤 Submitting to Microsoft Forms:", {
      url: msFormsUrl,
      correlationId: correlationId,
      userSessionId: userSessionId,
      payloadSize: JSON.stringify(msFormsPayload).length,
      timestamp: new Date().toISOString(),
    });

    console.log("📋 Request Body:", {
      startDate: msFormsPayload.startDate,
      submitDate: msFormsPayload.submitDate,
      answers: JSON.parse(msFormsPayload.answers), // Parse to show readable format
      answersString: msFormsPayload.answers, // Also show the stringified version
    });

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
        console.error("Microsoft Forms response (non-JSON):", textResponse);
        throw new Error(
          `Microsoft Forms submission failed: ${
            formsResponse.status
          } - ${textResponse.substring(0, 500)}`
        );
      }

      if (!formsResponse.ok) {
        console.error("Microsoft Forms error response:", {
          status: formsResponse.status,
          statusText: formsResponse.statusText,
          data: formsResponseData,
          headers: Object.fromEntries(formsResponse.headers.entries()),
        });

        // Check if form is closed
        if (
          formsResponse.status === 403 &&
          formsResponseData?.error?.message?.includes("closed")
        ) {
          throw new Error(
            "Microsoft Forms form is closed. Please reopen the form in Microsoft Forms to enable submissions."
          );
        }

        throw new Error(
          `Microsoft Forms submission failed: ${
            formsResponse.status
          } - ${JSON.stringify(formsResponseData)}`
        );
      }

      // Extract response ID from the new API structure (201 Created response)
      const responseId = formsResponseData?.id || null;

      console.log("✅ Microsoft Forms submission SUCCESS:", {
        status: formsResponse.status,
        statusText: formsResponse.statusText,
        responseId: responseId,
        leadId: leadId,
        submitDate: formsResponseData?.submitDate,
        responder: formsResponseData?.responder,
        timestamp: new Date().toISOString(),
        responseHeaders: {
          location: formsResponse.headers.get("Location"),
          correlationId: formsResponse.headers.get("x-correlationid"),
        },
      });

      // Step 5: Update Supabase with success
      await supabaseAdmin
        .from("leads")
        .update({
          submission_status: "submitted",
          ms_forms_response_id: responseId,
          ms_forms_submitted_at: new Date().toISOString(),
        })
        .eq("id", leadId);

      return NextResponse.json(
        {
          success: true,
          message: "Form submitted successfully to Microsoft Forms",
          leadId: leadId,
          msFormsResponseId: responseId,
        },
        { status: 200 }
      );
    } catch (formsError) {
      // Log error for debugging but don't fail the request - data is safely stored
      console.error(
        "Microsoft Forms submission error (data saved to database):",
        {
          error: formsError,
          message:
            formsError instanceof Error
              ? formsError.message
              : String(formsError),
          stack: formsError instanceof Error ? formsError.stack : undefined,
          leadId: leadId,
          timestamp: new Date().toISOString(),
        }
      );

      // Update Supabase with pending status (will be submitted when form reopens)
      await supabaseAdmin
        .from("leads")
        .update({
          submission_status: "pending",
          error_details:
            formsError instanceof Error
              ? formsError.message
              : String(formsError),
        })
        .eq("id", leadId);

      // Return success to user - data is safely stored in database
      return NextResponse.json(
        {
          success: true,
          message: "Form submitted successfully! We'll contact you soon.",
          leadId: leadId,
          savedToDatabase: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
