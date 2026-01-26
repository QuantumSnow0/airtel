# Microsoft Forms Integration Changes Summary

This document summarizes all the changes made to the Microsoft Forms integration that you need to apply to your agent dashboard or other implementations.

## 1. Environment Variables

### Updated Form ID
```env
MS_FORMS_FORM_ID=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UNE5JMkcyMEtYSDhZUEdZUVoyUDZBSlA1Wi4u
```

### Updated Response Page URL
```env
MS_FORMS_RESPONSE_PAGE_URL=https://forms.office.com/pages/responsepage.aspx?id=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UNE5JMkcyMEtYSDhZUEdZUVoyUDZBSlA1Wi4u&route=shorturl
```

### Tenant ID and User ID (unchanged)
```env
MS_FORMS_TENANT_ID=16c73727-979c-4d82-b3a7-eb6a2fddfe57
MS_FORMS_USER_ID=7726dd57-48bb-4c89-9e1e-f2669916f1fe
```

---

## 2. API Endpoint URL

### Changed From:
```
https://forms.guest.usercontent.microsoft/formapi/api/{tenantId}/users/{userId}/forms('{formId}')/responses
```

### Changed To:
```
https://forms.office.com/formapi/api/{tenantId}/users/{userId}/forms('%27{formId}%27)/responses
```

**Note:** The form ID must be URL-encoded in the endpoint. Use `encodeURIComponent()` on the form ID, then wrap it with `%27` (single quote encoding).

**Full example:**
```javascript
const encodedFormId = encodeURIComponent(MS_FORMS_FORM_ID);
const msFormsUrl = `https://forms.office.com/formapi/api/${tenantId}/users/${userId}/forms(%27${encodedFormId}%27)/responses`;
```

---

## 3. Request Headers

### Updated Headers for POST Request:

```javascript
headers: {
  __requestverificationtoken: requestVerificationToken,
  accept: "application/json",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9",
  authorization: "",
  Connection: "keep-alive",
  "Content-Type": "application/json",
  Host: "forms.office.com",                    // ✅ CHANGED
  "odata-maxverion": "4.0",
  "odata-version": "4.0",
  Origin: "https://forms.office.com",          // ✅ CHANGED
  Referer: `https://forms.office.com/pages/responsepage.aspx?id=${MS_FORMS_FORM_ID}&route=shorturl`,  // ✅ CHANGED
  "sec-ch-ua": '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',  // ✅ CHANGED
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",             // ✅ CHANGED
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",  // ✅ CHANGED
  "x-correlationid": correlationId,
  "x-ms-form-muid": muid || "",
  "x-ms-form-request-ring": "business",
  "x-ms-form-request-source": "ms-formweb",
  "x-usersessionid": userSessionId,
  Cookie: cookieString,
}
```

### Key Header Changes:
- **Host**: Changed from `forms.guest.usercontent.microsoft` to `forms.office.com`
- **Origin**: Changed from `https://forms.guest.usercontent.microsoft` to `https://forms.office.com`
- **Referer**: Changed to use `forms.office.com` domain
- **Sec-Fetch-Site**: Changed to `same-origin`
- **User-Agent**: Updated to Chrome 143
- **sec-ch-ua**: Updated to Chrome 143 version

---

## 4. Date Format Change

### Changed From:
- Format: `M/d/yyyy` (e.g., "1/12/2026")
- Used directly in `answer1` field

### Changed To:
- Format: `YYYY-MM-DD` (e.g., "2026-01-12")
- Must be converted before sending to MS Forms

### Implementation:
```javascript
const formatVisitDate = (dateStr: string): string => {
  // If already in YYYY-MM-DD format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  // Convert from M/d/yyyy to YYYY-MM-DD
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    // If date parsing fails, return original
    return dateStr;
  }
  return date.toISOString().split("T")[0];
};

const formattedVisitDate = formatVisitDate(visitDate);

// Use in answers array:
{
  questionId: QUESTION_IDS.visitDate,
  answer1: formattedVisitDate,  // Now in YYYY-MM-DD format
}
```

---

## 5. Answers Field Format

### Critical: Must be JSON Stringified String

The `answers` field in the payload **MUST** be a JSON stringified string, NOT an array.

### ❌ Wrong:
```javascript
{
  startDate: "...",
  submitDate: "...",
  answers: [                    // ❌ Array - will fail!
    { questionId: "...", answer1: "..." },
    ...
  ]
}
```

### ✅ Correct:
```javascript
{
  startDate: "...",
  submitDate: "...",
  answers: JSON.stringify([     // ✅ Stringified array
    { questionId: "...", answer1: "..." },
    ...
  ])
}
```

### Full Payload Example:
```javascript
const msFormsPayload = {
  startDate: new Date().toISOString(),
  submitDate: new Date().toISOString(),
  answers: JSON.stringify(answers),  // ✅ Must be stringified!
};
```

---

## 6. Token Fetching (GET Request)

### URL:
Uses the `MS_FORMS_RESPONSE_PAGE_URL` environment variable:
```
https://forms.office.com/pages/responsepage.aspx?id={FORM_ID}&route=shorturl
```

### Headers for GET Request:
```javascript
headers: {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br, zstd",
}
```

### Token Extraction:
1. Extract cookies from `Set-Cookie` headers
2. Extract `__RequestVerificationToken` from HTML body (hidden input field)
3. Extract `x-usersessionid` from response headers (if present)

---

## 7. Complete Implementation Checklist

When implementing in your agent dashboard, ensure:

- [ ] Updated `MS_FORMS_FORM_ID` environment variable
- [ ] Updated `MS_FORMS_RESPONSE_PAGE_URL` environment variable
- [ ] Changed API endpoint URL to `forms.office.com`
- [ ] Updated all request headers (Host, Origin, Referer, Sec-Fetch-Site, User-Agent, sec-ch-ua)
- [ ] Date format conversion: `M/d/yyyy` → `YYYY-MM-DD`
- [ ] `answers` field is JSON stringified (not an array)
- [ ] Form ID is URL-encoded in the endpoint URL
- [ ] Token fetching uses the correct response page URL

---

## 8. Common Errors and Solutions

### Error: "InvalidRequestBody" (400)
**Cause:** `answers` field is an array instead of a stringified JSON string.
**Solution:** Use `JSON.stringify(answers)` for the `answers` field.

### Error: "Form schema mismatch" (400)
**Cause:** Date format is incorrect or headers are wrong.
**Solution:** 
- Ensure date is in `YYYY-MM-DD` format
- Verify all headers match the updated values above

### Error: 403 Forbidden - "This form is ended"
**Cause:** The Microsoft Form is closed in Microsoft Forms settings.
**Solution:** Reopen the form in Microsoft Forms admin panel.

### Error: Token extraction fails
**Cause:** Using wrong URL or headers for token fetch.
**Solution:** Use `MS_FORMS_RESPONSE_PAGE_URL` with correct headers.

---

## 9. Question IDs (Unchanged)

These Question IDs remain the same:
```javascript
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
```

---

## Summary

The main changes are:
1. **Domain change**: `forms.guest.usercontent.microsoft` → `forms.office.com`
2. **Date format**: `M/d/yyyy` → `YYYY-MM-DD`
3. **Answers format**: Must be JSON stringified string
4. **Updated headers**: Host, Origin, Referer, Sec-Fetch-Site, User-Agent, sec-ch-ua
5. **Form ID**: Updated to new form ID

Apply these changes to your agent dashboard implementation.

