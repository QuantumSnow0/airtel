# Microsoft Forms Migration Guide – Key Changes for Another App

Use this document to apply the same MS Form updates in another app (same form, same payload structure).

---

## 1. Form ID

**Old form ID (ended):**
```
JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UNE5JMkcyMEtYSDhZUEdZUVoyUDZBSlA1Wi4u
```

**New form ID (current):**
```
JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzU1TjNRSjJWNFJaUzNBNVo5S1BXQ0lINi4u
```

**Normalization (optional but recommended):** If env or cache can still hold the old ID, normalize so the app always uses the new form:

```ts
const MS_FORMS_FORM_ID_OLD = "JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UNE5JMkcyMEtYSDhZUEdZUVoyUDZBSlA1Wi4u";
const MS_FORMS_FORM_ID_NEW = "JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzU1TjNRSjJWNFJaUzNBNVo5S1BXQ0lINi4u";
const MS_FORMS_FORM_ID =
  (process.env.MS_FORMS_FORM_ID || MS_FORMS_FORM_ID_NEW) === MS_FORMS_FORM_ID_OLD
    ? MS_FORMS_FORM_ID_NEW
    : process.env.MS_FORMS_FORM_ID || MS_FORMS_FORM_ID_NEW;
```

---

## 2. Question IDs (shared fields)

Use these in **all** routes that build the MS Forms payload:

| Field | Question ID |
|-------|-------------|
| agentType | `r0feee2e2bc7c44fb9af400709e7e6276` |
| enterpriseCP | `r52e9f6e788444e2a96d9e30de5d635d8` |
| agentName | `rcf88d2d33e8c4ed4b33ccc91fec1d771` |
| agentMobile | `r2855e7f8fcfb44c98a2c5797e8e9b087` |
| totalUnitsRequired | `r5d2a658a265b4f3ea2ad9aee1c8bc9c5` |
| leadType | `rd897bb0eb8344bafaaf8db07a535a049` |
| connectionType | `r4ceb180775c04d5a92a39fd687573090` |
| customerName | `r3af4eebb47ff46b78eb4118311884f53` |
| airtelNumber | `r8b0d2eb8e038433f8ce4888e07bed122` |
| alternateNumber | `r401284e3fee94602a39ed9a0a14890ea` |
| email | `r5dbc62a93dc64f3d84a2442f5ea4a856` |
| preferredPackage | `r819c212e954f4367acaba71082424415` |
| installationTown | `rc89257414e57426dac9a183c60a4b556` |
| deliveryLandmark | `r7a69684d43ec4bf1b6971b21a8b4dd18` |
| visitDate | `r68b858271107400189b8d681d1b19c38` |
| visitTime | `rae98a58cb06949c1a3222443368aa64e` |
| optionalField (last, null) | `r1Ht6TLmpMc3xhN5euPZo5ecC4RJtfJrJu8` |

**Changed from previous form:**
- **installationLocation** – no longer a single ID; see §3 (town-specific columns).
- **optionalField** – was `r1e3b5a91acaa465b8aab76bab2cad94a`, now `r1Ht6TLmpMc3xhN5euPZo5ecC4RJtfJrJu8`.

---

## 3. Town-specific “Installation Location” columns

The form has **one column per town**. The “Town - Landmark” value must be sent to the **question ID for that town’s column**, not a single shared ID.

**Map (normalized town → location question ID):**

| Town | Question ID |
|------|-------------|
| BUNGOMA | `rbf5746ac7f5e4d2cab54a1b8df24b5e1` |
| ELDORET | `r24b818b049314910ad025b6b727e64a3` |
| GARISSA | `r2fc4cb930c154b5e8f1a354d4ac354a5` |
| KAKAMEGA | `r28f2b48873504822b4010ba668be5267` |
| KILIFI | `rafb9a2cdb406426fa865a66baa42b3a0` |
| KISII | `r77cbe5ec85a8411ca451f323c9336c7e` |
| KISUMU | `r39626af0978948d780a63643b5a14ef7` |
| KITALE | `rcae794cab7ff49bbacecf526f6c7f4ff` |
| MACHAKOS | `re7e1cac4a9424be9a965efd0e7065812` |
| MERU | `rd95772902dc54356bce0f3d11204586a` |
| MIGORI | `r3a023823fcfe46798b4b8af5051dc632` |
| MOMBASA | `r6c5bd7f72fde4c51b2ac8661f3d3afac` |
| NAIROBI | `r99215bf0748f4e949b127b4a344e44ec` |
| NAKURU | `r37c5c841668f44269a3410c03e9eb055` |

**Logic:**
- Normalize installation town: remove spaces, UPPERCASE (e.g. `"Homa Bay"` → `"HOMABAY"`).
- Build installation location string: `"{NORMALIZED_TOWN} - {landmark}"` (e.g. `"ELDORET - Airport"`).
- For the **answer** that carries this string, use **question ID** = `TOWN_TO_LOCATION_QUESTION_ID[normalizedTown] ?? QUESTION_IDS.installationLocation` (fallback to Nairobi ID if town not in map).

**Code shape:**
```ts
const TOWN_TO_LOCATION_QUESTION_ID: Record<string, string> = {
  BUNGOMA: "rbf5746ac7f5e4d2cab54a1b8df24b5e1",
  ELDORET: "r24b818b049314910ad025b6b727e64a3",
  // ... rest as above
  NAIROBI: "r99215bf0748f4e949b127b4a344e44ec",
  NAKURU: "r37c5c841668f44269a3410c03e9eb055",
};

// In answers array, for the "installation location" answer:
{
  questionId: TOWN_TO_LOCATION_QUESTION_ID[normalizedTown] ?? QUESTION_IDS.installationLocation,
  answer1: installationLocation,  // e.g. "ELDORET - Airport"
}
```

---

## 4. Payload structure and order

- **URL:** `https://forms.office.com/formapi/api/${tenantId}/users/${userId}/forms(%27${encodeURIComponent(formId)}%27)/responses`
- **Method:** POST  
- **Body:**  
  `{ "startDate": "<ISO>", "submitDate": "<ISO>", "answers": "<JSON string of array>" }`

**Answers array order (each item `{ questionId, answer1 }`):**

1. agentType  
2. enterpriseCP  
3. agentName  
4. agentMobile  
5. leadType  
6. totalUnitsRequired  
7. connectionType  
8. customerName  
9. airtelNumber  
10. alternateNumber  
11. email  
12. preferredPackage  
13. visitDate  
14. visitTime  
15. deliveryLandmark  
16. installationTown  
17. **installation location** (use town-specific question ID from §3)  
18. optionalField (`answer1: null`)

**Formats:**
- **installationTown:** normalized (no spaces, UPPERCASE), e.g. `NAIROBI`, `ELDORET`.
- **visitDate:** `YYYY-MM-DD`.
- **visitTime:** 24-hour `HH:mm` (e.g. `10:00`, `14:30`).
- **preferredPackage:** full label e.g. `5G _15Mbps_30days at Ksh.2999`, `5G _30Mbps_30days at Ksh.3999`.
- **Phones:** `254XXXXXXXXX`.

---

## 5. Environment variables

```env
MS_FORMS_FORM_ID=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzU1TjNRSjJWNFJaUzNBNVo5S1BXQ0lINi4u
MS_FORMS_TENANT_ID=16c73727-979c-4d82-b3a7-eb6a2fddfe57
MS_FORMS_USER_ID=7726dd57-48bb-4c89-9e1e-f2669916f1fe
MS_FORMS_RESPONSE_PAGE_URL=https://forms.office.com/pages/responsepage.aspx?id=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzU1TjNRSjJWNFJaUzNBNVo5S1BXQ0lINi4u&route=shorturl
```

Use the **new** form ID in `MS_FORMS_RESPONSE_PAGE_URL` (same as `MS_FORMS_FORM_ID`).

---

## 6. Response handling

- **Success:** status 201, body includes `"id": <number>`. Use that as `ms_forms_response_id` if you store it.
- **Form closed:** 403 with message containing “closed” or “form is ended”.
- No change to response handling was required for the new form.

---

## 7. Checklist for the other app

- [ ] Replace form ID with new one (and optional old→new normalization).
- [ ] Update `optionalField` question ID to `r1Ht6TLmpMc3xhN5euPZo5ecC4RJtfJrJu8`.
- [ ] Add `TOWN_TO_LOCATION_QUESTION_ID` map and use it for the installation-location answer (do not send all locations to the Nairobi ID).
- [ ] Keep answers array order as in §4.
- [ ] Use `forms.office.com` for both token page and submit URL (not `forms.guest.usercontent.microsoft` or `forms.cloud.microsoft`).
- [ ] Ensure request body includes all required fields; validate before submit (e.g. required fields list + delivery landmark min length if you use it).
- [ ] (Optional) Delivery landmark min length: 3 characters if you mirror this app’s validation.

---

## 8. Files to update (in this repo; adapt paths for the other app)

- `src/app/api/submit/route.ts` – main registration submit
- `src/app/api/resubmit-leads/submit/route.ts` – admin resubmit
- `src/app/api/customer-resubmit/route.ts` – customer resubmit

Each of these should have: updated form ID, updated question IDs, and the town→location question ID map used when building the installation-location answer.
