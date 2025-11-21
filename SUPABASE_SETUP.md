# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Create a new project
4. Go to Settings > API and note:
   - **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role key** (for `SUPABASE_SERVICE_ROLE_KEY`) - ⚠️ Keep this secret!

## 2. Set Up Environment Variables

Create a `.env.local` file in the root of the project with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Microsoft Forms Configuration
MS_FORMS_FORM_ID=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzJBMFE5VUpRSzM3VVFNRlJUNkY2QlBIRC4u
MS_FORMS_RESPONSE_PAGE_URL=https://forms.office.com/pages/responsepage.aspx?id=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzJBMFE5VUpRSzM3VVFNRlJUNkY2QlBIRC4u&route=shorturl
```

**Important Notes:**

- `NEXT_PUBLIC_*` variables are exposed to the browser (safe for anon key)
- `SUPABASE_SERVICE_ROLE_KEY` is **server-only** and bypasses Row Level Security - never expose this to the client!
- The service role key is used in API routes for inserting data

## 3. Create Database Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Customer information
  customer_name TEXT NOT NULL,
  airtel_number TEXT NOT NULL,
  alternate_number TEXT NOT NULL,
  email TEXT NOT NULL,

  -- Package and location
  preferred_package TEXT NOT NULL,
  installation_town TEXT NOT NULL,
  delivery_landmark TEXT NOT NULL,

  -- Installation schedule
  visit_date DATE NOT NULL,
  visit_time TEXT NOT NULL,

  -- Internal agent data (auto-filled)
  agent_type TEXT NOT NULL,
  enterprise_cp TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  agent_mobile TEXT NOT NULL,
  lead_type TEXT NOT NULL,
  connection_type TEXT NOT NULL,

  -- Microsoft Forms submission tracking
  ms_forms_response_id INTEGER,
  ms_forms_submitted_at TIMESTAMP WITH TIME ZONE,
  submission_status TEXT DEFAULT 'pending' CHECK (submission_status IN ('pending', 'submitted', 'failed'))
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_submission_status ON leads(submission_status);

-- Enable Row Level Security (optional - adjust policies as needed)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts (adjust based on your auth requirements)
CREATE POLICY "Allow public inserts" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow reads (adjust based on your auth requirements)
CREATE POLICY "Allow public reads" ON leads
  FOR SELECT
  USING (true);
```

## 4. Verify Setup

After setting up:

1. Restart your Next.js dev server
2. The Supabase client should be ready to use in your API routes
