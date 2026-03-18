# Airtel Registration: Required Details & MS Forms Submission

This document lists **every detail required to register for Airtel SmartConnect** and **how that data is sent to Microsoft Forms**.

---

## 1. Details Required to Register for Airtel

### 1.1 Customer fields (collected from user/agent)

| # | Field | Type | Required | Validation | Example |
|---|--------|------|----------|-------------|---------|
| 1 | **customerName** | String | Yes | Min 2 characters (after trim) | `"John Kamau"` |
| 2 | **airtelNumber** | String | Yes | 10–12 digits (spaces ignored) | `"0712345678"` or `"254712345678"` |
| 3 | **alternateNumber** | String | Yes | 10–12 digits | `"0722123456"` |
| 4 | **email** | String | Yes | Valid email | `"customer@example.com"` |
| 5 | **preferredPackage** | String | Yes | `"standard"` or `"premium"` (case-insensitive) | `"standard"` |
| 6 | **installationTown** | String | Yes | Non-empty; must be a valid town | `"Nairobi"`, `"Homa Bay"` |
| 7 | **deliveryLandmark** | String | Yes | Min 3 characters (after trim) | `"Near Total station"` |
| 8 | **installationLocation** | String | Yes | Location within town (or "Other" + custom text) | `"Kangemi"`, `"Langata"` |
| 9 | **visitDate** | String | Yes | Valid date; stored/sent as `YYYY-MM-DD` | `"2024-12-25"` or `"12/25/2024"` |
| 10 | **visitTime** | String | Yes | 12-hour format `h:mm AM/PM` | `"10:00 AM"`, `"2:30 PM"` |

**Notes:**

- **Phone numbers:** Accepted as `07XXXXXXXX`, `254XXXXXXXXX`, or `XXXXXXXXX`. They are normalized to `254XXXXXXXXX` before save and MS Forms.
- **Installation town:** Sent to MS Forms as **no spaces, UPPERCASE** (e.g. `"Homa Bay"` → `"HOMABAY"`).
- **Installation location:** In the app this is often the landmark/location name only (e.g. `"Kangemi"`); for MS Forms it is sent as **`{NORMALIZED_TOWN} - {landmark}`** (e.g. `"NAIROBI - Kangemi"`).

### 1.2 Internal/auto-filled fields (not collected from user)

These are set by the app and must not be left empty when building the MS Forms payload:

| Field | Value | Notes |
|-------|--------|--------|
| **agentType** | `"Enterprise"` | Fixed |
| **enterpriseCP** | `"WAM APPLICATIONS"` | Fixed |
| **agentName** | e.g. `"samson karau maingi"` | From agent/auth; not user input |
| **agentMobile** | e.g. `"0789457580"` | From agent/auth; normalized to `254...` for MS Forms |
| **leadType** | `"Confirmed"` | Fixed |
| **connectionType** | `"SmartConnect (5G ODU)"` | Fixed |
| **totalUnitsRequired** | `"1"` | Fixed |

---

## 2. How Data Is Sent to Microsoft Forms

### 2.1 High-level flow

1. **Save to database (Supabase)**  
   Lead is stored in `leads` or `leads_paused` (depending on app pause setting).

2. **Get MS Forms tokens**  
   GET the form response page; read cookies and `__RequestVerificationToken` from the HTML.

3. **Build MS Forms payload**  
   Apply formatting (phones, town, package, time, date, installation location), then build the `answers` array in the exact order expected by the form.

4. **POST to MS Forms API**  
   Send the payload with the correct URL, headers, and body shape.

### 2.2 Environment variables

```env
MS_FORMS_FORM_ID=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQjc4M0wwWU9HRTJPRjMxWlc5QjRLOUhaMC4u
MS_FORMS_TENANT_ID=16c73727-979c-4d82-b3a7-eb6a2fddfe57
MS_FORMS_USER_ID=7726dd57-48bb-4c89-9e1e-f2669916f1fe
MS_FORMS_RESPONSE_PAGE_URL=https://forms.office.com/pages/responsepage.aspx?id={MS_FORMS_FORM_ID}&route=shorturl
```

(Or the app may use `https://forms.cloud.microsoft/` as response page; implementation may vary.)

### 2.3 Microsoft Forms question IDs

Each form question has a fixed ID. The **order** of entries in `answers` must match the form:

| Order | Field | Question ID |
|-------|--------|-------------|
| 1 | agentType | `r0feee2e2bc7c44fb9af400709e7e6276` |
| 2 | enterpriseCP | `r52e9f6e788444e2a96d9e30de5d635d8` |
| 3 | agentName | `rcf88d2d33e8c4ed4b33ccc91fec1d771` |
| 4 | agentMobile | `r2855e7f8fcfb44c98a2c5797e8e9b087` |
| 5 | leadType | `rd897bb0eb8344bafaaf8db07a535a049` |
| 6 | totalUnitsRequired | `r5d2a658a265b4f3ea2ad9aee1c8bc9c5` |
| 7 | connectionType | `r4ceb180775c04d5a92a39fd687573090` |
| 8 | customerName | `r3af4eebb47ff46b78eb4118311884f53` |
| 9 | airtelNumber | `r8b0d2eb8e038433f8ce4888e07bed122` |
| 10 | alternateNumber | `r401284e3fee94602a39ed9a0a14890ea` |
| 11 | email | `r5dbc62a93dc64f3d84a2442f5ea4a856` |
| 12 | preferredPackage | `r819c212e954f4367acaba71082424415` |
| 13 | visitDate | `r68b858271107400189b8d681d1b19c38` |
| 14 | visitTime | `rae98a58cb06949c1a3222443368aa64e` |
| 15 | deliveryLandmark | `r7a69684d43ec4bf1b6971b21a8b4dd18` |
| 16 | installationTown | `rc89257414e57426dac9a183c60a4b556` |
| 17 | installationLocation | `r55f328ec020a4a629f58639cd56ecd85` |
| 18 | optionalField | `r1e3b5a91acaa465b8aab76bab2cad94a` |

### 2.4 Formatting before sending to MS Forms

- **Phones:** `07XXXXXXXX` or `254...` → `254XXXXXXXXX` (digits only, then ensure 254 prefix and length).
- **Town:** Remove spaces, UPPERCASE. Example: `"Homa Bay"` → `"HOMABAY"`.
- **Installation location:** `{NORMALIZED_TOWN} - {landmark}`. Example: `"NAIROBI - Kangemi"`.
- **Preferred package:**  
  - `"standard"` → `"5G _15Mbps_30days at Ksh.2999"`  
  - `"premium"` → `"5G _30Mbps_30days at Ksh.3999"`
- **Visit date:** Sent as `YYYY-MM-DD` (e.g. `"2024-12-25"`). If the app receives `M/d/yyyy`, it is converted to `YYYY-MM-DD` before sending.
- **Visit time:** Convert 12-hour to 24-hour. Examples: `"10:00 AM"` → `"10:00"`, `"2:30 PM"` → `"14:30"`.
- **optionalField:** Sent as `null` in the answers array.

### 2.5 Payload structure sent to MS Forms

**Request:**

- **Method:** `POST`
- **URL:**  
  `https://forms.office.com/formapi/api/{tenantId}/users/{userId}/forms('{formId}')/responses`  
  with `formId` URL-encoded (single quotes in path are encoded as `%27`).

**Body (JSON):**

```json
{
  "startDate": "<ISO8601 datetime>",
  "submitDate": "<ISO8601 datetime>",
  "answers": "<JSON string of answers array>"
}
```

**Important:** `answers` is a **string**: the array is `JSON.stringify()`’d. The array contains one object per question, in the same order as the table above:

```json
[
  { "questionId": "<id>", "answer1": "<value>" },
  { "questionId": "<id>", "answer1": "<value>" },
  …
  { "questionId": "r1e3b5a91acaa465b8aab76bab2cad94a", "answer1": null }
]
```

### 2.6 Headers required for the POST

- `__requestverificationtoken`: from the form response page HTML.
- `Content-Type: application/json`
- `Cookie`: full cookie string from the token GET (e.g. `FormsWebSessionId`, `__RequestVerificationToken`, `MUID`, etc.).
- `x-correlationid`: UUID for the request.
- `x-usersessionid`: from response page or generated.
- `x-ms-form-muid`: from cookies/response (can be empty string if not present).
- `x-ms-form-request-ring: business`
- `x-ms-form-request-source: ms-formweb`
- Standard browser-like headers: `User-Agent`, `Accept`, `Origin`, `Referer` (Referer typically points to the form response page URL).

### 2.7 Token/cookie retrieval (step 1)

1. GET `MS_FORMS_RESPONSE_PAGE_URL` (same as form response page).
2. From response:
   - **Cookies:** `Set-Cookie` → concatenate into one `Cookie` header for the POST.
   - **Body:** parse HTML and extract `__RequestVerificationToken` (e.g. from a hidden input or script).
   - Optionally extract `userId` and `tenantId` from the page if not using env vars.
3. Use these cookies and token on the single POST that sends the payload.

### 2.8 Summary: what is sent to MS Forms

| What | Format / value |
|------|-----------------|
| Customer name | As entered |
| Airtel number | `254XXXXXXXXX` |
| Alternate number | `254XXXXXXXXX` |
| Email | As entered |
| Preferred package | `"5G _15Mbps_30days at Ksh.2999"` or `"5G _30Mbps_30days at Ksh.3999"` |
| Visit date | `YYYY-MM-DD` |
| Visit time | 24-hour `HH:mm` |
| Delivery landmark | As entered |
| Installation town | No spaces, UPPERCASE (e.g. `HOMABAY`) |
| Installation location | `{NORMALIZED_TOWN} - {landmark}` |
| Internal fields | As in § 1.2 (agent type, CP, agent name/mobile, lead type, connection type, total units) |
| Optional field | `null` |

---

## 3. Reference: API route and doc

- **Submit API:** `src/app/api/submit/route.ts` — receives registration fields, saves to Supabase, then builds the MS Forms payload and POSTs it using the steps above.
- **Full integration guide:** `CUSTOMER_REGISTRATION_MS_FORMS.md` — more detail on validation, town lists, and troubleshooting.

---

*Last updated: 2025-03-11*
