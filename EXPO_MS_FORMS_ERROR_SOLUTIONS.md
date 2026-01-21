# MS Forms Submission Error - Issue & Solutions

## Error Summary

**Error:** `400 Bad Request` - "The input was not valid."

**Response:**
```json
{
  "errors": {
    "": ["The input was not valid."]
  },
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400
}
```

---

## Root Causes Identified

### 1. ❌ Wrong API Endpoint URL

**Current (Wrong):**
```
https://forms.guest.usercontent.microsoft/formapi/api/{tenantId}/users/{userId}/forms(%27{formId}%27)/responses
```

**Correct:**
```
https://forms.office.com/formapi/api/{tenantId}/users/{userId}/forms(%27{formId}%27)/responses
```

**Difference:** Use `forms.office.com` instead of `forms.guest.usercontent.microsoft`

---

### 2. ❌ Wrong Origin and Referer Headers

**Current (Wrong):**
```typescript
Origin: "https://forms.cloud.microsoft"
Referer: "https://forms.cloud.microsoft/"
```

**Correct:**
```typescript
Origin: "https://forms.office.com"
Referer: "https://forms.office.com/pages/responsepage.aspx?id={formId}&route=shorturl"
```

---

### 3. ❌ Missing or Incorrect Cookie Header

**Required Cookies:**
- `FormsWebSessionId` - Session identifier
- `__RequestVerificationToken` - CSRF token (different from header token!)
- `msal.cache.encryption` - MSAL cache encryption
- `MUID` - Machine unique identifier

**Example:**
```
Cookie: FormsWebSessionId=ad0cfb3a-6e6c-4fc9-9db5-5571e01bba13; __RequestVerificationToken=90yL2oZn98_-88jCCZMiostZq1hzSAe2_KsddzZkS_id32z3Wo4UoeJ-XBlJ0MfxNL33q4dpCnXXOdN03NPtJDtBHLfOrOJtRq9F_MYB8Bo1; msal.cache.encryption=%7B%22id%22%3A%22019be0c8-fc16-73be-b37b-151d0f2e18db%22%2C%22key%22%3A%22tbdtKix88JJoYAMiEHRBTNbladmzCqrTEq1-qajtSoM%22%7D; MUID=3C0E9EE520516B7132AD880D245160A9
```

**Note:** The `__RequestVerificationToken` in the Cookie header is **different** from the `__requestverificationtoken` header value!

---

### 4. ❌ Answers Field Format

**Problem:** `answers` is being sent as an array/object instead of a JSON stringified string.

**Wrong:**
```json
{
  "answers": [
    {"questionId": "...", "answer1": "..."}
  ]
}
```

**Correct:**
```json
{
  "answers": "[{\"questionId\":\"...\",\"answer1\":\"...\"}]"
}
```

The `answers` field must be a **JSON stringified string**, not an object or array.

---

### 5. ❌ Missing or Incorrect Headers

**Required Headers (from working example):**

```typescript
{
  "__requestverificationtoken": "...", // From HTML body (different from cookie token!)
  "accept": "application/json",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9",
  "authorization": "", // Empty string
  "Connection": "keep-alive",
  "content-type": "application/json",
  "Cookie": "...", // All cookies as shown above
  "Host": "forms.office.com",
  "odata-maxverion": "4.0",
  "odata-version": "4.0",
  "Origin": "https://forms.office.com",
  "Referer": "https://forms.office.com/pages/responsepage.aspx?id={formId}&route=shorturl",
  "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
  "x-correlationid": "...", // UUID
  "x-ms-form-muid": "...", // Must match MUID from cookies
  "x-ms-form-request-ring": "business",
  "x-ms-form-request-source": "ms-formweb",
  "x-usersessionid": "..." // UUID
}
```

---

## Solutions

### Solution 1: Fix API Endpoint URL

```typescript
// ❌ Wrong
const url = `https://forms.guest.usercontent.microsoft/formapi/api/${tenantId}/users/${userId}/forms(%27${encodedFormId}%27)/responses`;

// ✅ Correct
const url = `https://forms.office.com/formapi/api/${tenantId}/users/${userId}/forms(%27${encodedFormId}%27)/responses`;
```

---

### Solution 2: Fix Token Extraction

Extract **TWO different tokens**:

1. **Header Token** (from HTML body) - goes in `__requestverificationtoken` header
2. **Cookie Token** (from Set-Cookie) - goes in `Cookie` header

```typescript
async function fetchMSTokens(responsePageUrl) {
  const tokenResponse = await fetch(responsePageUrl, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  const html = await tokenResponse.text();

  // Extract HEADER token from HTML body
  const headerTokenMatch = html.match(
    /name="__RequestVerificationToken"\s+value="([^"]+)"/
  );
  const headerToken = headerTokenMatch?.[1];
  if (!headerToken) {
    throw new Error("Failed to extract header verification token");
  }

  // Extract cookies (React Native compatible)
  const allHeaders = {};
  tokenResponse.headers.forEach((value, key) => {
    allHeaders[key.toLowerCase()] = value;
  });

  const cookies = [];
  let cookieToken = "";
  let formsWebSessionId = "";
  let muid = "";
  let msalCache = "";

  const setCookieHeader = allHeaders["set-cookie"];
  if (setCookieHeader) {
    const cookieArray = Array.isArray(setCookieHeader) 
      ? setCookieHeader 
      : [setCookieHeader];
    
    for (const cookie of cookieArray) {
      const cookiePair = cookie.split(";")[0].trim();
      cookies.push(cookiePair);

      if (cookiePair.startsWith("FormsWebSessionId=")) {
        formsWebSessionId = cookiePair.split("FormsWebSessionId=")[1];
      }
      if (cookiePair.startsWith("__RequestVerificationToken=")) {
        cookieToken = cookiePair.split("__RequestVerificationToken=")[1];
      }
      if (cookiePair.startsWith("MUID=")) {
        muid = cookiePair.split("MUID=")[1];
      }
      if (cookiePair.startsWith("msal.cache.encryption=")) {
        msalCache = cookiePair.split("msal.cache.encryption=")[1];
      }
    }
  }

  const cookieString = cookies.join("; ");
  const userSessionId = allHeaders["x-usersessionid"] || generateUUID();

  // Extract IDs from HTML
  const userIdMatch = html.match(/"userId":"([^"]+)"/);
  const tenantMatch = html.match(/"tenantId":"([^"]+)"/);
  const userId = userIdMatch?.[1] || process.env.EXPO_PUBLIC_MS_FORMS_USER_ID || "";
  const tenantId = tenantMatch?.[1] || process.env.EXPO_PUBLIC_MS_FORMS_TENANT_ID || "";

  return {
    headerToken, // For __requestverificationtoken header
    cookieString, // For Cookie header (includes cookieToken)
    cookieToken, // Individual cookie token
    formsWebSessionId,
    muid,
    msalCache,
    userSessionId,
    userId,
    tenantId,
  };
}
```

---

### Solution 3: Fix Request Headers

```typescript
async function submitToMSForms(
  formId: string,
  tenantId: string,
  userId: string,
  payload: any,
  tokens: any
) {
  const encodedFormId = encodeURIComponent(formId);
  
  // ✅ Correct URL
  const url = `https://forms.office.com/formapi/api/${tenantId}/users/${userId}/forms(%27${encodedFormId}%27)/responses`;

  // ✅ Ensure answers is a stringified string
  const requestBody = {
    startDate: payload.startDate,
    submitDate: payload.submitDate,
    answers: typeof payload.answers === "string" 
      ? payload.answers 
      : JSON.stringify(payload.answers), // Stringify if not already a string
  };

  // ✅ Correct headers
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "__requestverificationtoken": tokens.headerToken, // From HTML body
      "accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      "authorization": "", // Empty string
      "Connection": "keep-alive",
      "content-type": "application/json",
      "Cookie": tokens.cookieString, // All cookies including cookieToken
      "Host": "forms.office.com",
      "odata-maxverion": "4.0",
      "odata-version": "4.0",
      "Origin": "https://forms.office.com",
      "Referer": `https://forms.office.com/pages/responsepage.aspx?id=${formId}&route=shorturl`,
      "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
      "x-correlationid": payload.correlationId,
      "x-ms-form-muid": tokens.muid || "",
      "x-ms-form-request-ring": "business",
      "x-ms-form-request-source": "ms-formweb",
      "x-usersessionid": tokens.userSessionId,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`MS Forms submission failed: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}
```

---

### Solution 4: Ensure Answers is Stringified

```typescript
function buildMSFormsPayload(customerData, internalDefaults, questionIds) {
  // Build answers array
  const answers = [
    { questionId: questionIds.agentType, answer1: internalDefaults.agentType },
    // ... all other answers in correct order ...
  ];

  return {
    startDate: new Date().toISOString(),
    submitDate: new Date().toISOString(),
    answers: JSON.stringify(answers), // ⚠️ MUST be stringified!
    correlationId: generateUUID(),
  };
}
```

---

## Verification Checklist

Before submitting, verify:

- [ ] URL uses `forms.office.com` (not `forms.guest.usercontent.microsoft`)
- [ ] Origin header is `https://forms.office.com`
- [ ] Referer header includes the full response page URL with form ID
- [ ] `__requestverificationtoken` header has token from HTML body
- [ ] Cookie header includes all 4 cookies: `FormsWebSessionId`, `__RequestVerificationToken`, `msal.cache.encryption`, `MUID`
- [ ] `x-ms-form-muid` matches `MUID` from cookies
- [ ] `answers` field is a JSON stringified string (not an array/object)
- [ ] `typeof payload.answers === "string"` returns `true`
- [ ] All required headers are present

---

## Debug Logging

Add these logs to verify:

```typescript
console.log("URL check:", {
  usesOfficeCom: url.includes("forms.office.com"),
  usesGuestContent: url.includes("forms.guest.usercontent.microsoft"),
});

console.log("Token check:", {
  hasHeaderToken: !!tokens.headerToken,
  hasCookieToken: !!tokens.cookieToken,
  headerTokenLength: tokens.headerToken?.length,
  cookieStringLength: tokens.cookieString?.length,
  hasAllCookies: tokens.cookieString?.includes("FormsWebSessionId") && 
                 tokens.cookieString?.includes("__RequestVerificationToken") &&
                 tokens.cookieString?.includes("MUID"),
});

console.log("Payload check:", {
  answersType: typeof payload.answers,
  answersIsString: typeof payload.answers === "string",
  answersStartsWith: payload.answers?.startsWith("["),
  answersLength: payload.answers?.length,
});

console.log("Headers check:", {
  hasVerificationToken: !!headers["__requestverificationtoken"],
  hasCookie: !!headers["Cookie"],
  origin: headers["Origin"],
  referer: headers["Referer"],
  muidMatches: headers["x-ms-form-muid"] === tokens.muid,
});
```

---

## Summary

The main issues are:

1. **Wrong URL domain** - Use `forms.office.com` not `forms.guest.usercontent.microsoft`
2. **Wrong Origin/Referer** - Use `https://forms.office.com` not `https://forms.cloud.microsoft`
3. **Missing cookies** - Must extract and include all 4 cookies
4. **Two different tokens** - Header token (from HTML) and cookie token (from Set-Cookie) are different
5. **Answers format** - Must be a JSON stringified string, not an array

Fix these and the submission should work!

