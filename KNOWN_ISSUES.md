# Known Issues to Fix

## Issue: Homa Bay Town Format Mismatch

### Problem Identified
- **Location:** `src/app/api/submit/route.ts` line 360
- **Issue:** Town name "Homa Bay" (with space) is being sent directly to MS Forms
- **Current Flow:**
  1. User selects "Homa Bay" from dropdown (line 600 in mobile/page.tsx)
  2. Value stored as: `"Homa Bay"` (with space)
  3. Sent to MS Forms as: `"Homa Bay"` (line 360 in submit/route.ts)
  4. LocationsData key is: `"HOMABAY"` (no space, all caps)

### Questions to Answer Before Fixing:
1. **What exactly happens when "Homa Bay" is submitted?**
   - Does MS Forms reject it?
   - Does it show as wrong value?
   - Does it appear as empty/missing?
   - Does it work but show incorrectly?

2. **Do other towns work correctly?**
   - Test with other multi-word towns (if any)
   - Verify single-word towns work fine

3. **What format does MS Forms expect?**
   - Check MS Forms responses to see what format is accepted
   - Check if there's a town mapping/transformation needed

### Potential Solutions (to implement after answering questions):
- Option 1: Normalize town names before sending (remove spaces, convert case)
- Option 2: Create a town mapping object to convert display names to MS Forms format
- Option 3: Use the LocationsData key format instead of display name

### Files Involved:
- `src/app/mobile/page.tsx` (line 600 - dropdown value)
- `src/app/mobile/page.tsx` (line 191 - locationsData key)
- `src/app/api/submit/route.ts` (line 360 - MS Forms submission)
- `src/app/desktop/page.tsx` (similar structure)
- `src/app/mobile-test/page.tsx` (similar structure)

### Status: 
✅ **FIXED** - Town names are now normalized before sending to MS Forms

### Fix Applied:
1. **Added normalization function** in `submit/route.ts`:
   - Converts "Homa Bay" → "HOMABAY" (removes spaces, uppercase)
   - Applied to both `installationTown` and `installationLocation` fields

2. **Fixed `getInstallationLocationOptions()`** in all page files:
   - Now properly matches "Homa Bay" to "HOMABAY" key in locationsData
   - Removes spaces before matching: `installationTown.replace(/\s+/g, "").toUpperCase()`

3. **Files Updated:**
   - `src/app/api/submit/route.ts` (lines 71-77, 360)
   - `src/app/mobile/page.tsx` (line 610)
   - `src/app/desktop/page.tsx` (line 568)
   - `src/app/mobile-test/page.tsx` (line 608)

### How It Works Now:
- User selects: "Homa Bay" (display name with space)
- Normalized for MS Forms: "HOMABAY" (no space, uppercase)
- Sent to MS Forms: "HOMABAY" (matches dropdown format)
- Installation Location: "HOMABAY - CBD" (normalized format)

---

