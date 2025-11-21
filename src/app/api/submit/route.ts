import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { LeadSubmission } from "@/lib/types";

const MS_FORMS_FORM_ID =
  process.env.MS_FORMS_FORM_ID ||
  "JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzJBMFE5VUpRSzM3VVFNRlJUNkY2QlBIRC4u";
const MS_FORMS_RESPONSE_PAGE_URL =
  process.env.MS_FORMS_RESPONSE_PAGE_URL ||
  "https://forms.office.com/pages/responsepage.aspx?id=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzJBMFE5VUpRSzM3VVFNRlJUNkY2QlBIRC4u&route=shorturl";

// Question IDs from Microsoft Forms
const QUESTION_IDS = {
  agentType: "r0feee2e2bc7c44fb9af400709e7e6276",
  enterpriseCP: "r52e9f6e788444e2a96d9e30de5d635d8",
  agentName: "rcf88d2d33e8c4ed4b33ccc91fec1d771",
  agentMobile: "r2855e7f8fcfb44c98a2c5797e8e9b087",
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
    let userId = "";
    let tenantId = "";

    try {
      const tokenResponse = await fetch(MS_FORMS_RESPONSE_PAGE_URL, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      if (!tokenResponse.ok) {
        throw new Error(`Failed to fetch tokens: ${tokenResponse.status}`);
      }

      // Extract cookies
      const setCookieHeaders = tokenResponse.headers.getSetCookie();
      for (const cookie of setCookieHeaders) {
        if (cookie.startsWith("FormsWebSessionId=")) {
          formsSessionId = cookie.split("FormsWebSessionId=")[1].split(";")[0];
        }
        if (cookie.startsWith("__RequestVerificationToken=")) {
          requestVerificationToken = cookie
            .split("__RequestVerificationToken=")[1]
            .split(";")[0];
        }
      }

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

      // If not found in HTML, use the observed values from the captured request
      userId = userIdMatch
        ? userIdMatch[1]
        : "7726dd57-48bb-4c89-9e1e-f2669916f1fe";
      tenantId = tenantMatch
        ? tenantMatch[1]
        : "16c73727-979c-4d82-b3a7-eb6a2fddfe57";
    } catch (tokenError) {
      console.error("Error fetching Microsoft Forms tokens:", tokenError);
      // Update Supabase with failed status
      await supabaseAdmin
        .from("leads")
        .update({ submission_status: "failed" })
        .eq("id", leadId);

      return NextResponse.json(
        {
          error: "Failed to connect to Microsoft Forms",
          details: String(tokenError),
          savedToDatabase: true,
          leadId: leadId,
        },
        { status: 500 }
      );
    }

    // Step 3: Build Microsoft Forms payload
    const startDate = new Date().toISOString();
    const submitDate = new Date().toISOString();

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
        answer1: preferredPackage,
      },
      {
        questionId: QUESTION_IDS.installationTown,
        answer1: installationTown,
      },
      {
        questionId: QUESTION_IDS.deliveryLandmark,
        answer1: deliveryLandmark,
      },
      {
        questionId: QUESTION_IDS.visitDate,
        answer1: visitDate,
      },
      {
        questionId: QUESTION_IDS.visitTime,
        answer1: visitTime,
      },
    ];

    const msFormsPayload = {
      startDate: startDate,
      submitDate: submitDate,
      answers: JSON.stringify(answers),
    };

    // Step 4: Submit to Microsoft Forms
    const msFormsUrl = `https://forms.office.com/formapi/api/${tenantId}/users/${userId}/forms('${MS_FORMS_FORM_ID}')/responses`;

    try {
      const formsResponse = await fetch(msFormsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          __requestverificationtoken: requestVerificationToken,
          accept: "application/json",
          "odata-version": "4.0",
          "odata-maxversion": "4.0",
          "x-ms-form-request-ring": "business",
          "x-ms-form-request-source": "ms-formweb",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: JSON.stringify(msFormsPayload),
      });

      const formsResponseData = await formsResponse.json();

      if (!formsResponse.ok) {
        throw new Error(
          `Microsoft Forms submission failed: ${
            formsResponse.status
          } - ${JSON.stringify(formsResponseData)}`
        );
      }

      // Extract response ID if available
      const responseId =
        formsResponseData?.ResponseId || formsResponseData?.id || null;

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
      console.error("Microsoft Forms submission error:", formsError);

      // Update Supabase with failed status
      await supabaseAdmin
        .from("leads")
        .update({ submission_status: "failed" })
        .eq("id", leadId);

      return NextResponse.json(
        {
          error: "Failed to submit to Microsoft Forms",
          details: String(formsError),
          savedToDatabase: true,
          leadId: leadId,
        },
        { status: 500 }
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
