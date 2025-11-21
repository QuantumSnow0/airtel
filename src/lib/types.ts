// Database types for Supabase

export type LeadSubmission = {
  id?: string;
  created_at?: string;
  // Customer information
  customer_name: string;
  airtel_number: string;
  alternate_number: string;
  email: string;
  // Package and location
  preferred_package: string;
  installation_town: string;
  delivery_landmark: string;
  // Installation schedule
  visit_date: string;
  visit_time: string;
  // Internal agent data (auto-filled)
  agent_type: string;
  enterprise_cp: string;
  agent_name: string;
  agent_mobile: string;
  lead_type: string;
  connection_type: string;
  // Microsoft Forms submission tracking
  ms_forms_response_id?: number | null;
  ms_forms_submitted_at?: string | null;
  submission_status?: "pending" | "submitted" | "failed";
};

