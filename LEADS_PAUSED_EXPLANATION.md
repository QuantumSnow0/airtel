# Leads Paused Table - Purpose and Data Transfer

## Overview

The `leads_paused` table is a **temporary holding table** that stores form submissions when the system is in "paused" mode. This feature allows administrators to temporarily stop new leads from being processed or submitted to Microsoft Forms while still capturing customer information.

## Purpose

### Why `leads_paused` Exists

1. **Temporary Pause Functionality**: When the system needs to be paused (e.g., during maintenance, when Microsoft Forms is closed, or when processing capacity is full), new form submissions are redirected to `leads_paused` instead of the main `leads` table.

2. **Data Preservation**: All customer information is still captured and stored safely, ensuring no leads are lost during pause periods.

3. **Manual Review & Transfer**: Administrators can review paused leads and selectively transfer them to the main `leads` table when ready.

4. **Audit Trail**: The paused table maintains a record of all submissions that occurred during pause periods, which can be useful for auditing and analysis.

## How It Works

### 1. Pause Status Control

The system uses an `app_settings` table to control the pause state:

```sql
-- app_settings table structure
CREATE TABLE app_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  is_paused BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

- **`is_paused = false`**: New submissions go to `leads` table (normal operation)
- **`is_paused = true`**: New submissions go to `leads_paused` table (paused mode)

### 2. Form Submission Flow

When a user submits the lead capture form:

**Location**: `src/app/api/submit/route.ts` (lines 123-132)

```typescript
// Check pause status to determine which table to use
const { data: settingsData } = await supabaseAdmin
  .from("app_settings")
  .select("is_paused")
  .eq("id", 1)
  .single();

// Default to false if settings don't exist (fail-safe: always save to leads)
const isPaused = settingsData?.is_paused ?? false;
const tableName = isPaused ? "leads_paused" : "leads";

// Save to the appropriate table
const { data: supabaseData } = await supabaseAdmin
  .from(tableName)
  .insert([leadData])
  .select()
  .single();
```

**Flow Diagram:**
```
User Submits Form
       ↓
Check app_settings.is_paused
       ↓
   ┌───┴───┐
   │       │
false    true
   │       │
   ↓       ↓
leads  leads_paused
```

### 3. Table Structure

The `leads_paused` table has **identical structure** to the `leads` table:

```sql
CREATE TABLE IF NOT EXISTS leads_paused (
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
```

**Note**: The structure matches `leads` exactly, allowing seamless data transfer.

## Data Transfer Process

### API Endpoint: `/api/paused-leads`

**Location**: `src/app/api/paused-leads/route.ts`

This endpoint provides two operations:

#### 1. GET - Fetch All Paused Leads

Retrieves all leads currently stored in `leads_paused`:

```typescript
GET /api/paused-leads

Response:
{
  leads: LeadSubmission[],
  count: number
}
```

#### 2. POST - Transfer Leads to Main Table

Transfers selected leads from `leads_paused` to `leads`:

```typescript
POST /api/paused-leads
Body: {
  leadIds: string[]  // Array of UUIDs to transfer
}

Response:
{
  success: true,
  transferred: number,
  skipped: number,
  skippedIds: string[],
  transferredIds: string[],
  message: string
}
```

### Transfer Logic (Step-by-Step)

**Location**: `src/app/api/paused-leads/route.ts` (lines 40-149)

1. **Fetch Paused Leads**: Retrieves the selected leads from `leads_paused` table
   ```typescript
   const { data: pausedLeads } = await supabaseAdmin
     .from("leads_paused")
     .select("*")
     .in("id", leadIds);
   ```

2. **Check for Duplicates**: Verifies which leads already exist in `leads` table to avoid duplicates
   ```typescript
   const { data: existingLeads } = await supabaseAdmin
     .from("leads")
     .select("id")
     .in("id", leadIds);
   ```

3. **Filter Non-Duplicates**: Only transfers leads that don't already exist in `leads`
   ```typescript
   const leadsToInsert = pausedLeads.filter(
     (lead) => !existingIds.includes(lead.id)
   );
   ```

4. **Insert into Leads**: Transfers the filtered leads to the main `leads` table
   ```typescript
   const { data: insertedLeads } = await supabaseAdmin
     .from("leads")
     .insert(leadsToInsert)
     .select();
   ```

5. **Optional Deletion**: The code includes commented-out logic to delete from `leads_paused` after transfer (currently disabled for audit purposes)
   ```typescript
   // Currently commented out - leads remain in leads_paused for audit
   // const { error: deleteError } = await supabaseAdmin
   //   .from("leads_paused")
   //   .in("id", leadIds)
   //   .delete();
   ```

### Transfer Flow Diagram

```
Admin Selects Leads to Transfer
       ↓
POST /api/paused-leads with leadIds
       ↓
Fetch from leads_paused
       ↓
Check for duplicates in leads
       ↓
Filter out existing leads
       ↓
Insert into leads table
       ↓
Return success with counts
       ↓
(Optional) Delete from leads_paused
```

## Managing Pause Status

### Toggle Pause On/Off

**API Endpoint**: `/api/pause-toggle`

**Location**: `src/app/api/pause-toggle/route.ts`

#### GET - Check Current Status
```typescript
GET /api/pause-toggle

Response:
{
  is_paused: boolean
}
```

#### POST - Update Pause Status
```typescript
POST /api/pause-toggle
Body: {
  is_paused: boolean
}

Response:
{
  success: true,
  is_paused: boolean,
  message: string
}
```

**Example Usage:**
- Set `is_paused: true` → New submissions go to `leads_paused`
- Set `is_paused: false` → New submissions go to `leads` (normal operation)

## Use Cases

### Scenario 1: Microsoft Forms Maintenance
1. Microsoft Forms form is closed for maintenance
2. Admin sets `is_paused = true`
3. New submissions are stored in `leads_paused`
4. When form reopens, admin transfers leads from `leads_paused` to `leads`
5. Leads are then submitted to Microsoft Forms automatically

### Scenario 2: Capacity Management
1. Too many leads coming in at once
2. Admin pauses the system temporarily
3. Leads accumulate in `leads_paused`
4. Admin reviews and transfers leads in batches when ready

### Scenario 3: Quality Control
1. Admin wants to review leads before they're processed
2. System is paused
3. Admin reviews leads in `leads_paused`
4. Admin selectively transfers approved leads to `leads`

## Important Notes

1. **Fail-Safe Behavior**: If `app_settings` doesn't exist or there's an error reading it, the system defaults to `is_paused = false`, ensuring leads always go to the main `leads` table.

2. **No Automatic Transfer**: Leads in `leads_paused` are NOT automatically transferred. This must be done manually via the API endpoint.

3. **Duplicate Prevention**: The transfer process checks for existing leads to prevent duplicates when transferring.

4. **Audit Trail**: Currently, leads remain in `leads_paused` after transfer (deletion is commented out), providing a complete audit trail.

5. **Microsoft Forms Submission**: When leads are transferred to `leads`, they will be submitted to Microsoft Forms if the submission process is triggered (depending on your workflow).

## Database Setup

To create the `leads_paused` table, run this SQL in your Supabase SQL Editor:

```sql
-- Create leads_paused table (same structure as leads)
CREATE TABLE IF NOT EXISTS leads_paused (
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

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_paused_created_at ON leads_paused(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_paused_submission_status ON leads_paused(submission_status);

-- Enable Row Level Security (optional)
ALTER TABLE leads_paused ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts
CREATE POLICY "Allow public inserts" ON leads_paused
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow reads
CREATE POLICY "Allow public reads" ON leads_paused
  FOR SELECT
  USING (true);
```

## Summary

- **Purpose**: Temporary storage for leads when system is paused
- **Control**: Managed via `app_settings.is_paused` boolean flag
- **Transfer**: Manual process via `/api/paused-leads` POST endpoint
- **Structure**: Identical to `leads` table for seamless transfer
- **Safety**: Fail-safe defaults to `leads` table if settings unavailable

