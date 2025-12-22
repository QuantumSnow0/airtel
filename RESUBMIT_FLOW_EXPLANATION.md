# What Happens When You Click "Resubmit" - Complete Flow

## Overview
When you click the "Resubmit" button on a lead in the admin resubmit page, the system performs several operations to submit the lead to Microsoft Forms and add it to the main leads table.

---

## Step-by-Step Flow

### Step 1: User Interaction (Frontend)
**Location**: `app/admin/resubmit/page.tsx` → `handleResubmit()` function

1. **Confirmation Dialog**
   - A confirmation dialog appears asking: *"Are you sure you want to resubmit this lead? This will submit it to Microsoft Forms and add it to the leads table."*
   - If user clicks **Cancel**: Process stops, nothing happens
   - If user clicks **OK**: Process continues

2. **UI State Updates**
   - Button changes to "Resubmitting..." with a loading spinner
   - Button is disabled to prevent multiple clicks
   - Previous messages are cleared

3. **API Request Sent**
   - POST request sent to `/api/resubmit-leads/submit`
   - Request body: `{ leadId: "uuid-of-the-lead" }`

---

### Step 2: Backend Processing - Fetch Lead Data
**Location**: `app/api/resubmit-leads/submit/route.ts`

1. **Validate Request**
   - Checks if `leadId` is provided
   - Returns error if missing

2. **Fetch Lead from `leads_resubmit` Table**
   ```typescript
   const { data: resubmitLead } = await supabaseAdmin
     .from("leads_resubmit")
     .select("*")
     .eq("id", leadId)
     .single();
   ```
   - Uses **SERVICE ROLE KEY** (bypasses RLS)
   - Retrieves complete lead data including:
     - Customer info (name, phone, email)
     - Package preferences
     - Location details
     - Visit date/time
     - Agent information
     - All other fields

3. **Error Handling**
   - If lead not found: Returns 404 error with message
   - Process stops if lead doesn't exist

---

### Step 3: Prepare Data for Microsoft Forms
**Location**: `app/api/resubmit-leads/submit/route.ts`

1. **Extract and Format Data**
   - Extracts customer information from the fetched lead
   - Formats phone numbers (converts to 254XXXXXXXXX format)
   - Normalizes town names for MS Forms (e.g., "Homa Bay" → "HOMABAY")
   - Builds installation location string
   - Converts visit time to 24-hour format if needed

2. **Map Package Names**
   - Converts package names to MS Forms format:
     - `"standard"` → `"5G _15Mbps_30days at Ksh.2999"`
     - `"premium"` → `"5G _30Mbps_30days at Ksh.3999"`

---

### Step 4: Fetch Microsoft Forms Authentication Tokens
**Location**: `app/api/resubmit-leads/submit/route.ts`

1. **Get MS Forms Session**
   - Makes GET request to `MS_FORMS_RESPONSE_PAGE_URL`
   - Extracts cookies from response headers:
     - `FormsWebSessionId`
     - `__RequestVerificationToken`
     - `MUID`
     - `msal.cache.encryption`
   - Extracts user session ID from headers
   - Extracts user ID and tenant ID from HTML response

2. **Error Handling**
   - If token fetch fails: Returns 500 error
   - Process stops, error shown to user

---

### Step 5: Build Microsoft Forms Payload
**Location**: `app/api/resubmit-leads/submit/route.ts`

1. **Create Submission Payload**
   - Generates correlation ID (UUID)
   - Sets `startDate` and `submitDate` to **current timestamp** (NOW)
   - Builds answers array with all form fields in exact order MS Forms expects:
     ```typescript
     {
       questionId: "r0feee2e2bc7c44fb9af400709e7e6276",
       answer1: "Enterprise"  // agent type
     },
     {
       questionId: "r3af4eebb47ff46b78eb4118311884f53",
       answer1: "John Doe"  // customer name
     },
     // ... all other fields
     ```

---

### Step 6: Submit to Microsoft Forms
**Location**: `app/api/resubmit-leads/submit/route.ts`

1. **POST Request to MS Forms API**
   - URL: `https://forms.guest.usercontent.microsoft/formapi/api/{tenantId}/users/{userId}/forms({formId})/responses`
   - Method: POST
   - Headers include all authentication tokens and cookies
   - Body: JSON payload with answers array

2. **Process Response**
   - If successful (200/201): Extracts `responseId` from MS Forms
   - If failed: Returns error with details

3. **Error Handling**
   - Network errors
   - MS Forms API errors (form closed, invalid data, etc.)
   - Returns detailed error message

---

### Step 7: Insert into `leads` Table
**Location**: `app/api/resubmit-leads/submit/route.ts`

**⚠️ IMPORTANT**: This step happens **AFTER** successful MS Forms submission

1. **Create New Lead Record**
   ```typescript
   const newLeadData = {
     id: randomUUID(),  // ⚠️ NEW UUID (not reusing original)
     created_at: new Date().toISOString(),  // ⚠️ CURRENT timestamp
     customer_name: "...",
     airtel_number: "254712345678",
     // ... all other fields from resubmit lead
     ms_forms_response_id: msFormsResponseId,  // From Step 6
     ms_forms_submitted_at: new Date().toISOString(),  // Current time
     submission_status: "submitted",
     bypass_duplicate_check: true  // ⚠️ CRITICAL: Prevents duplicate warnings
   }
   ```

2. **Key Points**:
   - **New UUID**: Doesn't reuse the original lead ID
   - **Current Timestamp**: `created_at` is set to NOW, not original time
   - **`bypass_duplicate_check = true`**: Ensures system won't flag this as duplicate
   - **All fields copied**: Customer data, location, package, etc. all copied
   - **MS Forms data included**: Response ID and submission timestamp stored

3. **Insert into Database**
   ```typescript
   await supabaseAdmin
     .from("leads")
     .insert([newLeadData])
     .select()
     .single();
   ```

4. **Error Handling**
   - If insert fails: Returns error (but MS Forms submission already succeeded)
   - Error message includes MS Forms response ID for reference

---

### Step 8: Cleanup (Optional)
**Location**: `app/api/resubmit-leads/submit/route.ts`

**Currently DISABLED** (commented out):
- The code includes logic to delete the lead from `leads_resubmit` table
- **This is commented out** to keep an audit trail
- If you want to auto-delete after resubmission, uncomment lines 463-470

```typescript
// Currently commented out:
// await supabaseAdmin
//   .from("leads_resubmit")
//   .delete()
//   .eq("id", leadId);
```

---

### Step 9: Return Success Response
**Location**: `app/api/resubmit-leads/submit/route.ts`

```typescript
return NextResponse.json({
  success: true,
  message: "Lead resubmitted successfully",
  leadId: insertedLead.id,  // New UUID in leads table
  msFormsResponseId: msFormsResponseId,
  newLeadCreatedAt: insertedLead.created_at
});
```

---

### Step 10: Frontend Updates (UI Response)
**Location**: `app/admin/resubmit/page.tsx`

1. **Success Scenario**:
   - ✅ Success message displayed: *"Successfully resubmitted! MS Forms ID: {id}. Lead ID: {newId}"*
   - Message appears in green box
   - Button returns to normal "Resubmit" state
   - After 1.5 seconds: Page automatically refreshes to show updated list
   - Message auto-clears after 5 seconds

2. **Error Scenario**:
   - ❌ Error message displayed with details
   - Message appears in red box
   - Button returns to normal state
   - Error logged to console for debugging
   - Message auto-clears after 5 seconds

---

## Visual Flow Diagram

```
User clicks "Resubmit"
        ↓
   [Confirmation Dialog]
        ↓
   User confirms
        ↓
   [UI: Loading State]
        ↓
   POST /api/resubmit-leads/submit
        ↓
   [Fetch from leads_resubmit]
        ↓
   [Prepare MS Forms data]
        ↓
   [Get MS Forms tokens]
        ↓
   [Submit to MS Forms API]
        ↓
   [MS Forms Success?]
    ├─ NO → Return Error → UI shows error
    └─ YES
        ↓
   [Insert into leads table]
    - New UUID
    - Current timestamp
    - bypass_duplicate_check = true
    - MS Forms response ID
        ↓
   [Return Success]
        ↓
   [UI: Success Message]
        ↓
   [Auto-refresh list]
```

---

## Important Points

### ⏰ Timing
- **MS Forms submission happens at current time** (not original submission time)
- **Lead `created_at` is set to NOW** (not original timestamp)
- This ensures the resubmitted lead appears as a new, current submission

### 🔑 Duplicate Prevention
- `bypass_duplicate_check = true` prevents the system from flagging this as a duplicate
- Even though phone numbers/email might match existing leads, this flag bypasses duplicate detection

### 🔄 Data Flow
1. **Original lead** stays in `leads_resubmit` table (for audit)
2. **New lead** is created in `leads` table with:
   - New UUID
   - Current timestamp
   - All original data
   - MS Forms submission details

### 🛡️ Error Handling
- If MS Forms submission fails: Process stops, lead NOT inserted into `leads`
- If database insert fails: Error returned, but MS Forms submission already succeeded
- User sees clear error messages with details

### 📝 Audit Trail
- Original lead remains in `leads_resubmit` table
- New lead in `leads` table with different ID and timestamp
- Both records exist, allowing you to track resubmissions

---

## Example Timeline

**Original Lead** (in `leads_resubmit`):
- ID: `abc-123-xyz`
- Created: `2024-01-15 10:30:00`
- Status: `pending`

**User clicks Resubmit on 2024-02-20 14:45:00**

**New Lead** (in `leads`):
- ID: `def-456-uvw` (new UUID)
- Created: `2024-02-20 14:45:00` (current time)
- Status: `submitted`
- `bypass_duplicate_check`: `true`
- `ms_forms_response_id`: `789123`
- `ms_forms_submitted_at`: `2024-02-20 14:45:05`

Both records exist with different IDs and timestamps.

