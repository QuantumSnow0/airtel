# Fix: Microsoft Forms 400 "Form schema mismatch" / "InvalidRequestBody"

Apply these changes in your **Supabase Edge Function** (`submit-ms-forms`).

---

## 1. Request body: only 3 keys

MS Forms expects the body to contain **only** these keys:

- `startDate` (string, ISO)
- `submitDate` (string, ISO)
- `answers` (string = `JSON.stringify(answersArray)`)

**Do not send** any other top-level key (e.g. `emailReceiptConsent`). Remove it if present.

```ts
const requestBody = {
  startDate,
  submitDate,
  answers: answersString,  // already JSON.stringify(answers)
};
// Do NOT add emailReceiptConsent or anything else
const requestBodyString = JSON.stringify(requestBody);
```

---

## 2. Optional field: use `null`, not `""`

The last answer (optional field) must use `answer1: null`, not `answer1: ""`.

**Wrong:**
```ts
{ questionId: QUESTION_IDS.optionalField, answer1: "" }
```

**Correct:**
```ts
{ questionId: QUESTION_IDS.optionalField, answer1: null }
```

---

## 3. Ensure `answers` is a string (not an array)

When you build the fetch body, `answers` must be the **string** form of the array, not the array itself.

**Correct:**
```ts
const answers = [ /* ... */ ];
const answersString = JSON.stringify(answers);
const requestBody = {
  startDate,
  submitDate,
  answers: answersString,  // string
};
fetch(msFormsUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json", /* ... */ },
  body: JSON.stringify(requestBody),  // whole body stringified once
});
```

So in the final HTTP body you have: `"answers": "[{\"questionId\":\"...\",\"answer1\":\"...\"},...]"` (a string inside JSON).

---

## 4. No `undefined` in the answers array

Every `answer1` except the optional (last) one should be a **string**. If any value is `undefined`, it can break the schema.

Use a helper and use it for every answer except the optional one:

```ts
const safeString = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value);
};
// For each answer except the last (optional):
answer1: safeString(someValue),
// Last answer only:
answer1: null
```

---

## 5. Optional field question ID

Ensure the optional field uses the correct ID:

```ts
optionalField: "r1Ht6TLmpMc3xhN5euPZo5ecC4RJtfJrJu8",
```

---

## 6. Quick checklist in the Edge Function

- [ ] `requestBody` has only `startDate`, `submitDate`, `answers`.
- [ ] `answers` is `JSON.stringify(answersArray)` (a string).
- [ ] Last item in `answersArray` is `{ questionId: QUESTION_IDS.optionalField, answer1: null }`.
- [ ] All other `answer1` values are strings (use `safeString()` if needed).
- [ ] `QUESTION_IDS.optionalField` is `"r1Ht6TLmpMc3xhN5euPZo5ecC4RJtfJrJu8"`.
- [ ] Fetch body is `body: JSON.stringify(requestBody)` (or equivalent single stringify of that object).

After these changes, redeploy the Edge Function and test again.
