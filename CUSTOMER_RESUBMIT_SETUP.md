# Customer Resubmit Feature - Setup Guide

## Overview

This feature allows customers to resubmit their installation requests manually without filling out the entire form again. Customers can look up their previous submission by email, review/edit their information, and resubmit.

## Features

- **Fixed Banner**: Small banner at the top of all pages with "Already requested? Submit Again" button
- **Email Lookup**: Customers enter their email to find their previous submission
- **Editable Form**: Pre-filled form with their previous data that can be edited
- **Rate Limiting**: Only allows one resubmission every 3 days per email
- **Microsoft Forms Integration**: Automatically submits to Microsoft Forms
- **Database Tracking**: Marks resubmissions with `resubmitted = true` flag

## Database Setup

### Add `resubmitted` Column to `leads` Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Add resubmitted column to leads table
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS resubmitted BOOLEAN DEFAULT false;

-- Create index for faster rate limit queries
CREATE INDEX IF NOT EXISTS idx_leads_resubmitted_email ON leads(email, resubmitted, created_at);
```

## API Routes

### 1. GET `/api/customer-resubmit/lookup`
- **Purpose**: Look up a lead by email address
- **Method**: POST
- **Body**: `{ email: string }`
- **Returns**: Lead data (most recent one if multiple exist)
- **Error**: 404 if email not found (with agent contact info)

### 2. POST `/api/customer-resubmit`
- **Purpose**: Submit customer resubmission
- **Method**: POST
- **Body**: Form data (same as main submit route)
- **Features**:
  - Checks 3-day rate limit
  - Submits to Microsoft Forms
  - Inserts into `leads` table with `resubmitted = true`
  - Sets `bypass_duplicate_check = true`
- **Rate Limit**: Returns 429 error if resubmitted within 3 days

## Components

### 1. `CustomerResubmitBanner.tsx`
- Fixed banner at top of page
- Yellow/amber styling to match brand
- Contains "Submit Again" button
- Opens modal on click

### 2. `CustomerResubmitModal.tsx`
- Two-step modal flow:
  - **Step 1**: Email input and lookup
  - **Step 2**: Pre-filled editable form
- Shows success message after submission
- Auto-closes after 3 seconds on success
- Shows agent contact if email not found

## Integration

The banner is integrated into:
- `app/mobile/page.tsx` (mobile version)
- `app/desktop/page.tsx` (desktop version)

Both pages have padding-top added to account for the fixed banner height.

## Rate Limiting Logic

The system checks for recent resubmissions (within 3 days) by querying:
```sql
SELECT created_at 
FROM leads 
WHERE email = ? 
  AND resubmitted = true 
  AND created_at >= (NOW() - INTERVAL '3 days')
ORDER BY created_at DESC 
LIMIT 1
```

If a resubmission is found, it returns a 429 error with message indicating how many days remain.

## Flow Diagram

```
Customer clicks "Submit Again" button
         ↓
Email lookup modal opens
         ↓
Customer enters email
         ↓
System looks up most recent lead
         ↓
If found → Show pre-filled form
If not found → Show error with agent contact
         ↓
Customer reviews/edits data
         ↓
Customer clicks "Resubmit Request"
         ↓
System checks 3-day rate limit
         ↓
If within 3 days → Show error
If OK → Submit to Microsoft Forms
         ↓
Insert into leads table:
  - resubmitted = true
  - bypass_duplicate_check = true
  - All other fields from form
         ↓
Show success message
         ↓
Auto-close modal after 3 seconds
```

## Error Handling

1. **Email Not Found**: Shows message with agent contact number (0789 457 580)
2. **Rate Limit Exceeded**: Shows message with days remaining
3. **MS Forms Failure**: Shows generic error message
4. **Database Errors**: Logged to console, user sees generic error

## Styling

- Banner: Yellow/amber gradient with subtle border
- Modal: Dark theme matching site design
- Buttons: Yellow primary buttons, gray secondary
- Success: Green checkmark icon with message

## Notes

- Email lookup is case-insensitive
- Uses most recent lead if multiple exist for same email
- Form fields are fully editable (except email - read-only)
- All validations from main form apply
- Time input uses 24-hour format (HH:MM)
- Phone numbers are auto-formatted to 254XXXXXXXXX format

