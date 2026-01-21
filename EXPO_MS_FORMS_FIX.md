# Fix for MS Forms Submission in Expo/React Native

## Issues Identified

1. **Token/Cookie Fetching**: `hasCookies: false` and `hasToken: false` - React Native's fetch doesn't support `getSetCookie()` the same way
2. **Request Body Format**: The `answers` field must be a JSON stringified string

## Solutions

### 1. Fix Token Fetching for React Native

In React Native/Expo, you need to handle cookies differently. Here's the corrected token fetch function:

```typescript
async function fetchMSTokens(responsePageUrl: string) {
  try {
    const tokenResponse = await fetch(responsePageUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch tokens: ${tokenResponse.status}`);
    }

    // In React Native, get all headers and look for Set-Cookie
    const allHeaders: Record<string, string> = {};
    tokenResponse.headers.forEach((value, key) => {
      allHeaders[key.toLowerCase()] = value;
    });

    const cookies: string[] = [];
    let formsSessionId = "";
    let requestVerificationToken = "";
    let muid = "";

    // Check for Set-Cookie header (might be lowercase in React Native)
    const setCookieHeader = allHeaders["set-cookie"] || allHeaders["Set-Cookie"];
    
    if (setCookieHeader) {
      // Handle single cookie string or array
      const cookieArray = Array.isArray(setCookieHeader) 
        ? setCookieHeader 
        : [setCookieHeader];
      
      for (const cookie of cookieArray) {
        // Extract cookie name and value (everything before the first semicolon)
        const cookiePair = cookie.split(";")[0].trim();
        cookies.push(cookiePair);

        if (cookiePair.startsWith("FormsWebSessionId=")) {
          formsSessionId = cookiePair.split("FormsWebSessionId=")[1];
        }
        if (cookiePair.startsWith("__RequestVerificationToken=")) {
          requestVerificationToken = cookiePair.split("__RequestVerificationToken=")[1];
        }
        if (cookiePair.startsWith("MUID=")) {
          muid = cookiePair.split("MUID=")[1];
        }
      }
    }

    const cookieString = cookies.join("; ");

    // Extract x-usersessionid from response headers
    const userSessionId = allHeaders["x-usersessionid"] || "";

    // Extract __RequestVerificationToken from response body (CRITICAL - this is the main token)
    const html = await tokenResponse.text();
    const tokenMatch = html.match(
      /name="__RequestVerificationToken"\s+value="([^"]+)"/
    );
    if (tokenMatch && tokenMatch[1]) {
      requestVerificationToken = tokenMatch[1];
    }

    // Extract user and tenant IDs from HTML or use defaults
    const userIdMatch = html.match(/"userId":"([^"]+)"/);
    const tenantMatch = html.match(/"tenantId":"([^"]+)"/);
    const userId = userIdMatch ? userIdMatch[1] : process.env.EXPO_PUBLIC_MS_FORMS_USER_ID || "";
    const tenantId = tenantMatch ? tenantMatch[1] : process.env.EXPO_PUBLIC_MS_FORMS_TENANT_ID || "";

    // Generate UUID if userSessionId not found
    const finalUserSessionId = userSessionId || generateUUID();

    console.log("✅ Tokens fetched:", {
      hasCookies: cookies.length > 0,
      hasToken: !!requestVerificationToken,
      cookieCount: cookies.length,
      tenantId,
      userId,
    });

    return {
      requestVerificationToken,
      cookieString,
      muid,
      userSessionId: finalUserSessionId,
      userId,
      tenantId,
    };
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
}
```

### 2. Fix Request Body Format

The **CRITICAL** issue: The `answers` field must be a **JSON stringified string**, not an object or array.

```typescript
function buildMSFormsPayload(customerData: any, internalDefaults: any, questionIds: any) {
  const startDate = new Date().toISOString();
  const submitDate = new Date().toISOString();
  const correlationId = generateUUID();

  // ... format all your data (phone numbers, town names, etc.) ...

  // Build answers array
  const answers = [
    {
      questionId: questionIds.agentType,
      answer1: internalDefaults.agentType,
    },
    // ... all other answers in correct order ...
  ];

  // ⚠️ CRITICAL: answers must be JSON.stringify() - a STRING, not an object!
  const msFormsPayload = {
    startDate: startDate,
    submitDate: submitDate,
    answers: JSON.stringify(answers), // ← This MUST be a stringified JSON string
  };

  return {
    ...msFormsPayload,
    correlationId,
  };
}
```

### 3. Fix API Request Headers

Make sure you're sending the request with the correct headers and body:

```typescript
async function submitToMSForms(
  formId: string,
  tenantId: string,
  userId: string,
  payload: any,
  tokens: any
) {
  const encodedFormId = encodeURIComponent(formId);
  const msFormsUrl = `https://forms.guest.usercontent.microsoft/formapi/api/${tenantId}/users/${userId}/forms(%27${encodedFormId}%27)/responses`;

  // ⚠️ CRITICAL: The body must have answers as a STRING
  const requestBody = {
    startDate: payload.startDate,
    submitDate: payload.submitDate,
    answers: payload.answers, // This should already be a JSON string from buildMSFormsPayload
  };

  console.log("Request Body:", {
    startDate: requestBody.startDate,
    submitDate: requestBody.submitDate,
    answersType: typeof requestBody.answers, // Should be "string"
    answersLength: requestBody.answers.length,
    answersPreview: requestBody.answers.substring(0, 200), // First 200 chars
  });

  const response = await fetch(msFormsUrl, {
    method: "POST",
    headers: {
      __requestverificationtoken: tokens.requestVerificationToken, // ⚠️ Must have this!
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.9",
      "Content-Type": "application/json",
      Origin: "https://forms.cloud.microsoft",
      Referer: "https://forms.cloud.microsoft/",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
      "x-correlationid": payload.correlationId,
      "x-ms-form-muid": tokens.muid || "",
      "x-ms-form-request-ring": "business",
      "x-ms-form-request-source": "ms-formweb",
      "x-usersessionid": tokens.userSessionId,
      Cookie: tokens.cookieString, // ⚠️ Must include cookies!
    },
    body: JSON.stringify(requestBody), // Stringify the entire body
  });

  // ... rest of error handling ...
}
```

### 4. Complete Working Example

Here's a complete working version for Expo:

```typescript
import { randomUUID } from 'expo-crypto'; // or use crypto.randomUUID() if available

// Generate UUID helper
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return randomUUID();
}

// Token fetch with React Native compatibility
async function fetchMSTokens(responsePageUrl: string) {
  const tokenResponse = await fetch(responsePageUrl, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  if (!tokenResponse.ok) {
    throw new Error(`Failed to fetch tokens: ${tokenResponse.status}`);
  }

  // Get all headers (React Native compatible)
  const allHeaders: Record<string, string> = {};
  tokenResponse.headers.forEach((value, key) => {
    allHeaders[key.toLowerCase()] = value;
  });

  const cookies: string[] = [];
  let muid = "";

  // Extract cookies
  const setCookieHeader = allHeaders["set-cookie"];
  if (setCookieHeader) {
    const cookieArray = Array.isArray(setCookieHeader) 
      ? setCookieHeader 
      : [setCookieHeader];
    
    for (const cookie of cookieArray) {
      const cookiePair = cookie.split(";")[0].trim();
      cookies.push(cookiePair);
      if (cookiePair.startsWith("MUID=")) {
        muid = cookiePair.split("MUID=")[1];
      }
    }
  }

  const cookieString = cookies.join("; ");
  const userSessionId = allHeaders["x-usersessionid"] || generateUUID();

  // Extract token from HTML body (MOST IMPORTANT!)
  const html = await tokenResponse.text();
  const tokenMatch = html.match(
    /name="__RequestVerificationToken"\s+value="([^"]+)"/
  );
  
  if (!tokenMatch || !tokenMatch[1]) {
    throw new Error("Failed to extract verification token from response");
  }

  const requestVerificationToken = tokenMatch[1];

  const userIdMatch = html.match(/"userId":"([^"]+)"/);
  const tenantMatch = html.match(/"tenantId":"([^"]+)"/);
  const userId = userIdMatch?.[1] || process.env.EXPO_PUBLIC_MS_FORMS_USER_ID || "";
  const tenantId = tenantMatch?.[1] || process.env.EXPO_PUBLIC_MS_FORMS_TENANT_ID || "";

  return {
    requestVerificationToken,
    cookieString,
    muid,
    userSessionId,
    userId,
    tenantId,
  };
}

// Build payload with correct format
function buildMSFormsPayload(customerData: any, internalDefaults: any, questionIds: any) {
  // ... format all data ...

  const answers = [
    { questionId: questionIds.agentType, answer1: internalDefaults.agentType },
    // ... all answers in order ...
  ];

  return {
    startDate: new Date().toISOString(),
    submitDate: new Date().toISOString(),
    answers: JSON.stringify(answers), // ⚠️ MUST be stringified!
    correlationId: generateUUID(),
  };
}

// Submit with correct body format
async function submitToMSForms(
  formId: string,
  tenantId: string,
  userId: string,
  payload: any,
  tokens: any
) {
  const encodedFormId = encodeURIComponent(formId);
  const url = `https://forms.guest.usercontent.microsoft/formapi/api/${tenantId}/users/${userId}/forms(%27${encodedFormId}%27)/responses`;

  // ⚠️ Body structure - answers is already a string from buildMSFormsPayload
  const requestBody = {
    startDate: payload.startDate,
    submitDate: payload.submitDate,
    answers: payload.answers, // This is a JSON string, not an object
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      __requestverificationtoken: tokens.requestVerificationToken,
      accept: "application/json",
      "Content-Type": "application/json",
      Cookie: tokens.cookieString,
      "x-correlationid": payload.correlationId,
      "x-usersessionid": tokens.userSessionId,
      "x-ms-form-muid": tokens.muid || "",
      "x-ms-form-request-ring": "business",
      "x-ms-form-request-source": "ms-formweb",
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

## Key Points to Check

1. ✅ **Token extraction**: Must extract `__RequestVerificationToken` from HTML body (not just cookies)
2. ✅ **Answers format**: Must be `JSON.stringify(answers)` - a string, not an object
3. ✅ **Request body**: When sending, `answers` should already be a string
4. ✅ **Headers**: Must include `__requestverificationtoken` and `Cookie`
5. ✅ **Cookie handling**: React Native needs different cookie extraction method

## Debug Checklist

Add these logs to verify:

```typescript
console.log("Token check:", {
  hasToken: !!tokens.requestVerificationToken,
  tokenLength: tokens.requestVerificationToken?.length,
  hasCookies: !!tokens.cookieString,
  cookieLength: tokens.cookieString?.length,
});

console.log("Payload check:", {
  answersType: typeof payload.answers, // Should be "string"
  answersIsString: typeof payload.answers === "string",
  answersLength: payload.answers?.length,
  answersPreview: payload.answers?.substring(0, 100),
});
```

The most common issue is that `answers` is being sent as an object/array instead of a JSON stringified string!


