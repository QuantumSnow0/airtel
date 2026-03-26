# Airtel Signup Requirements and Available Towns/Locations

This is the current signup requirement and options reference based on the app code.

## 1) Required Signup Fields

The signup request requires all of the following:

- `customerName`
- `airtelNumber`
- `alternateNumber`
- `email`
- `preferredPackage`
- `installationTown`
- `deliveryLandmark`
- `installationLocation`
- `visitDate`
- `visitTime`

API-side required check is in `src/app/api/submit/route.ts` and rejects missing/empty values.

## 2) Validation Rules (Current UI)

From `src/app/mobile/page.tsx` and `src/app/desktop/page.tsx`:

- `customerName`: minimum 2 characters (trimmed)
- `airtelNumber`: 10-12 digits (spaces ignored)
- `alternateNumber`: 10-12 digits (spaces ignored)
- `email`: standard email format
- `installationTown`: required (non-empty)
- `deliveryLandmark`: minimum 3 characters (trimmed)
- `installationLocation`:
  - must be selected and not empty, and not `"Other"`, OR
  - if `"Other"` is selected, custom text must be non-empty
- `visitDate`: required
- `visitTime`: required
- `preferredPackage`: required

## 3) Towns Shown in Main Dropdown (current UX list)

From `townOptions` in `src/app/mobile/page.tsx`:

- Bungoma
- Eldoret
- Garissa
- Kakamega
- Kilifi
- Kisii
- Kisumu
- Kitale
- Machakos
- Meru
- Migori
- Mombasa
- Nairobi
- Nakuru

## 4) Full Town -> Location Options (source of truth)

From `locationsData` in `src/app/mobile/page.tsx` (also mirrored in desktop):

```ts
const locationsData: Record<string, string[]> = {
  BOMET: ["CBD", "Longisa", "Ndanai", "Silibwet", "Siongiroi", "Sotik", "University"],
  BUSIA: ["Alupe", "Bumala", "BurumbaAngoromMayenje", "Butula", "CBD", "Nambale"],
  BUNGOMA: ["CBD", "Chwele", "Kamukuywa", "Kanduyi", "Kimilili", "Sirisia"],
  CHUKA: ["CBD", "Chuka University", "Igambang'ombe", "Maara"],
  Eldoret: ["Annex", "Bahati", "Munyaka", "Pioneer", "Sisibo", "Upper Eldoville", "Hillside", "Kapsoya"],
  EMBU: ["Blue Valley", "Itabua", "Kamiu", "Kangaru", "Majengo", "Matakari", "Njukiri"],
  GARISSA: ["CBD", "Galbet", "Iftin", "Township", "Waberi"],
  HOMABAY: ["CBD", "Kendu Bay", "Mbita", "Ndhiwa", "Gwasi", "Kaspul", "Rangwe", "Karachuonyo"],
  ISIOLO: ["CBD", "Merti", "Oldonyiro"],
  ITEN: ["Arror", "Chebiemit", "Chepkorio", "Chesoi", "Flax", "Iten CBD", "Kapsowar", "Kaptarakwa", "Kapyego", "Nyaru", "Tambach", "Tot"],
  KABARNET: ["CBD", "Eldama ravine", "Marigat", "Mogotio"],
  KAKAMEGA: ["CBD", "Butere", "Ikolomani", "Khwisero", "Lugari", "Lukuyani", "Malava", "Matungu", "Mumias", "Navakholo", "Shinyalu"],
  KAPENGURIA: ["CBD", "Chepkram", "Kitalakape", "Kongelai", "Kanyarkwat"],
  KAPSABET: ["CBD", "Mosoriot", "Kabiyet", "Nandi Hills", "Kaiboi"],
  KERICHO: ["CBD", "Kapsaos", "Kipkelion", "Ainamoi"],
  KERUGOYA: ["CBD", "Sagana", "Wanguru", "Kagumo", "Kagio"],
  KILIFI: ["CBD", "Kaloleni", "Magarini", "Malindi", "Mariakani", "Mazeras", "Mtwapa", "Rabai", "Watamu"],
  KISII: ["CBD", "Kenyeya", "Keroka", "Marani", "Masimba", "Nyacheki", "Nyamache", "Nyamarambe", "Ogembo", "Suneka", "Nyamataro", "Nyanchwa", "Jogoo", "Mwembe", "Nyakoe", "Mosocho", "Nyatieko", "Bigege", "Keumbu", "Omogonchoro", "Manga"],
  KISUMU: ["Kondele", "Lolwe Estate", "Manyatta", "Milimani Estate", "Mountain View Estate", "Nyalenda", "Okore Estate", "Polyview Estate", "Tom Mboya Estate", "Translakes Estate (Kibos Road)"],
  KITALE: ["Kitale CBD", "Milimani", "Kiminini", "Saboti", "Kongelai", "Kwanza", "Endebess", "Section 6"],
  KITENGELA: ["CBD", "Kitengela Plains", "Boston", "Chuna", "Muigai Prestige", "Milimani", "Kitengela Breeze", "The Riverine"],
  KITUI: ["Township", "Kwa Ngendu Estate", "Kalawa Road Estate", "Kyangwithya East & West", "Kwa Vonza/Yatta", "Kauwi", "Mutomo", "Kyuso", "Zombe", "Itoleka", "Tulia", "Kyanika"],
  LODWAR: ["Lodwar CBD", "Loima", "Lokichar", "Kalokol", "Kakuma", "Lokichogio"],
  LUANDA: ["Vihiga Municipality", "Chavagali", "Mbale CBD", "Serem", "Kaimosi", "Hamisi", "Sabatia", "Majengo-Vihiga"],
  MACHAKOS: ["Mulolongo", "Athi River", "Konza City", "Joska", "Kangundo Road", "Mua Hills", "Central", "South Park Estate", "Encasa Apartments", "Summit Urban Estates", "Lukenya Hills Estate", "Kyumvi", "Kenya Israel", "Greenpark Estate", "Katani", "Syokimau", "Gateway Mall Gated Estate", "Gratewall"],
  MALINDI: ["Township"],
  MANDERA: ["CBD", "Rhamu", "El Wak", "Takaba"],
  MARALAL: ["CBD", "Wamba", "Kisima", "Baragoi", "Lodosoit", "Archers Post"],
  MARSABIT: ["CBD", "Moyale", "Ileret", "Laisamis", "Loiyangalani"],
  MAUA: ["Maili Tatu", "Mutuati", "Kimongoro", "Athiru", "Kithetu", "Kiegoi"],
  MERU: ["Laare", "Nkubu", "Timau"],
  MIGORI: ["Migori CBD", "Rongo", "Uriri", "Awendo", "Muhuru Bay", "Isbania", "Nyatike"],
  MOMBASA: ["Kongowea", "KWALE", "Ukunda", "Watamu", "Bamburi", "Changamwe", "Jomvu", "Kisauni", "Kizingo", "Likoni", "Magongo", "Mikindani", "Miritini", "Nyali", "Shanzu", "Tudor"],
  "MURANG'A": ["CBD", "Kangema", "Kiharu", "Kabati", "Kandara", "Maragua", "Makuyu", "Kiriani", "Gatura"],
  NAIROBI: ["Athiriver", "Babadogo", "Bellevue", "Buru Buru", "CBD", "Chokaa", "Chuka", "Dagoreti Market", "Dandora", "Donholm", "Eastleigh", "Embakasi", "Fedha", "Gachie", "Garden Estate", "Gigiri", "Githurai", "Imara Daima", "Industrial Area", "Joska Town", "Juja", "Kahawa Sukari", "Kahawa Wendani", "Kahawa West", "Kamulu", "Kangemi", "Karen", "Kariobangi", "Kasarani", "Kawangware", "Kayole", "Kiambu", "Kikuyu", "Kileleshwa", "Kilimani", "Kinoo", "Kiserian", "Kitusuru", "Komarock", "Langata", "Lavington", "Limuru", "Lower Kabete", "Lucky Summer", "Machakos", "Mlolongo", "Mombasa Road", "Mukuru", "Muthaiga", "Mwiki", "Ngara", "Ngong Road", "Njiru", "Nyari", "Pangani", "Pipeline", "Riverside", "Rongai", "Roysambu", "Ruai", "Ruaka", "Ruiru", "Runda", "Saika", "South B", "South C", "Spring Valley", "Syokimau", "Tassia", "Thome", "Umoja", "Utawala", "Uthiru", "Westlands & Parklands", "Zimmerman"],
  NAIVASHA: ["Kabati", "Kayole Naivasha", "Kehoto", "Karagita", "Kamere", "Fly-Over", "Delamere", "Naivasha CBD", "Mirera", "Mai Mahiu"],
  NAKURU: ["Barnabas", "Flamingo", "Mireri Estates", "Naka", "Section 58", "Upper Hill", "Milimani", "Nakuru Meadows"],
  NANYUKI: ["Mount Kenya Wildlife Estate (MKWE)", "Mukima Ridge", "Muthaiga Estate, Nanyuki", "Sweetwaters / Baraka Estate", "Sarova Maiyan Villas", "Ol Saruni Gardens", "Beverly Acres", "Airstrip Gardens", "Fahari Ridge 2", "Nanyuki Town Centre", "Bargain Area", "Timau Belt", "Likii Estate", "Kwa Huku Estate", "Nkando Estate", "Snow View Estate", "Madison Lane", "Cedar Mall Estate", "Burguret Area", "Daiga & Ethi", "Jua Kali Zone"],
  NAROK: ["Lenana Estate", "Olerai Estate", "Tumaini Estate", "Ilmashariani", "Leleshwa", "Maasai Mara", "Ololulunga", "Nkareta", "London Estate"],
  NYAHURURU: ["CBD", "Gatundia Estate", "Igwamiti", "Madaraka Estate", "Mairo Inya", "Ndururumo Area", "Ngano Estate"],
  NYAMIRA: ["CBD", "Ekerubo", "Kebirigo", "Kijauri", "Nyansiongo"],
  NYERI: ["CBD", "Chaka", "Endarasha", "Karatina", "Mukurwe ini", "Mweiga", "Naro Moru", "Othaya"],
  RUIRU: ["Daykio Bustani Estate", "Easternville Estate", "Kamakis", "Kamiti", "Membley Estate", "Mhasibu Bustani Estate", "Mugutha", "Ruiru Town", "Tatu City"],
  SIAYA: ["Bondo", "CBD", "Ugunja", "Ugenya", "Yala", "Gem", "Sega"],
  THIKA: ["Ngoingwa", "CBD", "Makongeni", "Kiahuria"],
  VOI: ["CBD", "Kasigau", "Marungu", "Mbololo", "Ngolia", "Sagalla"],
  WAJIR: ["Habaswein", "CBD", "Hadado", "Tarbaj", "Diff", "Eldas", "Bute"],
  WEBUYE: ["CBD", "Bokoli", "Cheptulu", "Maraka", "Matulo", "Mihuu", "Misikhu", "Ndivisi", "Sitikho"],
  WOTE: ["CBD", "Kaiti", "Makueni"],
  OLKALOU: ["Gichungo", "Kaimbaga", "Rurii"],
  MAGUMU: ["CBD", "Forest", "Njabini", "Kibiru", "Mukera", "Kinangop"],
  MWEA: ["CBD", "Kimbimbi", "Kutus"],
};
```

## 5) How Installation Location Options Are Derived

- User selects `installationTown`
- App normalizes town by removing spaces and uppercasing
- App looks up normalized key in `locationsData`
- Options shown are `locationsData[town] + ["Other"]`
- If no town match exists, fallback options = `["Other"]`

## 6) Notes for Integrations

- `deliveryLandmark` minimum is currently **3 chars**
- `installationLocation` must be provided (including `"Other"` custom value when used)
- API expects the 10 required request fields listed in section 1

