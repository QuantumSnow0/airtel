-- Create indexes for efficient duplicate checking
-- These are critical for performance as the database grows
-- Run this in your Supabase SQL Editor

CREATE INDEX IF NOT EXISTS idx_leads_airtel_number ON leads(airtel_number);
CREATE INDEX IF NOT EXISTS idx_leads_alternate_number ON leads(alternate_number);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

