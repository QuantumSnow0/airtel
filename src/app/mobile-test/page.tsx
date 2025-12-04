"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Model3DWithText from "../components/Model3DWithText";
import PricingCards from "../components/PricingCards";
import { usePackage } from "../contexts/PackageContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function TestMobilePage() {
  const step2Ref = useRef<HTMLDivElement>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const alternativeInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const deliveryLocationInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        townDropdownRef.current &&
        townButtonRef.current &&
        !townDropdownRef.current.contains(event.target as Node) &&
        !townButtonRef.current.contains(event.target as Node)
      ) {
        setShowTownDropdown(false);
      }
      if (
        installationLocationDropdownRef.current &&
        installationLocationButtonRef.current &&
        !installationLocationDropdownRef.current.contains(
          event.target as Node
        ) &&
        !installationLocationButtonRef.current.contains(event.target as Node)
      ) {
        setShowInstallationLocationDropdown(false);
      }
      if (
        timeDropdownRef.current &&
        timeButtonRef.current &&
        !timeDropdownRef.current.contains(event.target as Node) &&
        !timeButtonRef.current.contains(event.target as Node)
      ) {
        setShowTimeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { selectedPackage } = usePackage();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAlternativeNumber, setCustomerAlternativeNumber] =
    useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [installationTown, setInstallationTown] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [installationLocation, setInstallationLocation] = useState("");
  const [isInstallationLocationOther, setIsInstallationLocationOther] =
    useState(false);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [nameBlurred, setNameBlurred] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  const [alternativeBlurred, setAlternativeBlurred] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [townBlurred, setTownBlurred] = useState(false);
  const [deliveryLocationBlurred, setDeliveryLocationBlurred] = useState(false);
  const [installationLocationBlurred, setInstallationLocationBlurred] =
    useState(false);
  const [preferredDateBlurred, setPreferredDateBlurred] = useState(false);
  const [preferredTimeBlurred, setPreferredTimeBlurred] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [alternativeFocused, setAlternativeFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [townFocused, setTownFocused] = useState(false);
  const [deliveryLocationFocused, setDeliveryLocationFocused] = useState(false);
  const [installationLocationFocused, setInstallationLocationFocused] =
    useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [timeFocused, setTimeFocused] = useState(false);
  const [showTownDropdown, setShowTownDropdown] = useState(false);
  const [
    showInstallationLocationDropdown,
    setShowInstallationLocationDropdown,
  ] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const townDropdownRef = useRef<HTMLDivElement>(null);
  const townButtonRef = useRef<HTMLButtonElement>(null);
  const installationLocationDropdownRef = useRef<HTMLDivElement>(null);
  const installationLocationButtonRef = useRef<HTMLButtonElement>(null);
  const installationLocationCustomInputRef = useRef<HTMLInputElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const timeButtonRef = useRef<HTMLButtonElement>(null);
  const [robotMessage, setRobotMessage] = useState("");
  const [robotVisible, setRobotVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const hasUserInteractedRef = useRef(false);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [robotAnimationState, setRobotAnimationState] = useState<
    "idle" | "speaking" | "waving" | "blinking"
  >("idle");
  const hasWavedRef = useRef(false);
  const [previousPackage, setPreviousPackage] = useState<string | null>(null);
  const [robotBottom, setRobotBottom] = useState("1rem");
  const [robotTop, setRobotTop] = useState<string | null>(null);
  const [viewportScrollOffset, setViewportScrollOffset] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [howToOrderSlide, setHowToOrderSlide] = useState(0);
  const howToOrderSliderRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    state: "idle" | "success" | "error";
    message: string;
  }>({ state: "idle", message: "" });

  const isNameValid = customerName.trim().length >= 2;
  const isPhoneValid = /^[0-9]{10,12}$/.test(customerPhone.replace(/\s/g, ""));
  const isAlternativeValid = /^[0-9]{10,12}$/.test(
    customerAlternativeNumber.replace(/\s/g, "")
  );
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim());
  const isTownValid = installationTown.trim().length > 0;
  const isDeliveryLocationValid = deliveryLocation.trim().length >= 5;
  const isInstallationLocationValid =
    (installationLocation.trim().length > 0 &&
      installationLocation !== "Other") ||
    (isInstallationLocationOther && installationLocation.trim().length > 0);
  const isPreferredDateValid = preferredDate.trim().length > 0;
  const isPreferredTimeValid = preferredTime.trim().length > 0;

  // Locations data structure from locations.md
  const locationsData: Record<string, string[]> = {
    BOMET: [
      "CBD",
      "Longisa",
      "Ndanai",
      "Silibwet",
      "Siongiroi",
      "Sotik",
      "University",
    ],
    BUSIA: [
      "Alupe",
      "Bumala",
      "BurumbaAngoromMayenje",
      "Butula",
      "CBD",
      "Nambale",
    ],
    BUNGOMA: ["CBD", "Chwele", "Kamukuywa", "Kanduyi", "Kimilili", "Sirisia"],
    Eldoret: [
      "Annex",
      "Bahati",
      "Munyaka",
      "Pioneer",
      "Sisibo",
      "Upper Eldoville",
      "Hillside",
      "Kapsoya",
    ],
    EMBU: [
      "Blue Valley",
      "Itabua",
      "Kamiu",
      "Kangaru",
      "Majengo",
      "Matakari",
      "Njukiri",
    ],
    GARISSA: ["CBD", "Galbet", "Iftin", "Township", "Waberi"],
    HOMABAY: [
      "CBD",
      "Kendu Bay",
      "Mbita",
      "Ndhiwa",
      "Gwasi",
      "Kaspul",
      "Rangwe",
      "Karachuonyo",
    ],
    ISIOLO: ["CBD", "Merti", "Oldonyiro"],
    ITEN: [
      "Arror",
      "Chebiemit",
      "Chepkorio",
      "Chesoi",
      "Flax",
      "Iten CBD",
      "Kapsowar",
      "Kaptarakwa",
      "Kapyego",
      "Nyaru",
      "Tambach",
      "Tot",
    ],
    KABARNET: ["CBD", "Eldama ravine", "Marigat", "Mogotio"],
    KAKAMEGA: [
      "CBD",
      "Butere",
      "Ikolomani",
      "Khwisero",
      "Lugari",
      "Lukuyani",
      "Malava",
      "Matungu",
      "Mumias",
      "Navakholo",
      "Shinyalu",
    ],
    KAPENGURIA: ["CBD", "Chepkram", "Kitalakape", "Kongelai", "Kanyarkwat"],
    KAPSABET: ["CBD", "Mosoriot", "Kabiyet", "Nandi Hills", "Kaiboi"],
    KERICHO: ["CBD", "Kapsaos", "Kipkelion", "Ainamoi"],
    KERUGOYA: ["CBD", "Sagana", "Wanguru", "Kagumo", "Kagio"],
    KILIFI: [
      "CBD",
      "Kaloleni",
      "Magarini",
      "Malindi",
      "Mariakani",
      "Mazeras",
      "Mtwapa",
      "Rabai",
      "Watamu",
    ],
    KISII: [
      "CBD",
      "Kenyeya",
      "Keroka",
      "Marani",
      "Masimba",
      "Nyacheki",
      "Nyamache",
      "Nyamarambe",
      "Ogembo",
      "Suneka",
      "Nyamataro",
      "Nyanchwa",
      "Jogoo",
      "Mwembe",
      "Nyakoe",
      "Mosocho",
      "Nyatieko",
      "Bigege",
      "Keumbu",
      "Omogonchoro",
      "Manga",
    ],
    KISUMU: [
      "Kondele",
      "Lolwe Estate",
      "Manyatta",
      "Milimani Estate",
      "Mountain View Estate",
      "Nyalenda",
      "Okore Estate",
      "Polyview Estate",
      "Tom Mboya Estate",
      "Translakes Estate (Kibos Road)",
    ],
    KITALE: [
      "Kitale CBD",
      "Milimani",
      "Kiminini",
      "Saboti",
      "Kongelai",
      "Kwanza",
      "Endebess",
      "Section 6",
    ],
    KITENGELA: [
      "CBD",
      "Kitengela Plains",
      "Boston",
      "Chuna",
      "Muigai Prestige",
      "Milimani",
      "Kitengela Breeze",
      "The Riverine",
    ],
    KITUI: [
      "Township",
      "Kwa Ngendu Estate",
      "Kalawa Road Estate",
      "Kyangwithya East & West",
      "Kwa Vonza/Yatta",
      "Kauwi",
      "Mutomo",
      "Kyuso",
      "Zombe",
      "Itoleka",
      "Tulia",
      "Kyanika",
    ],
    LODWAR: [
      "Lodwar CBD",
      "Loima",
      "Lokichar",
      "Kalokol",
      "Kakuma",
      "Lokichogio",
    ],
    LUANDA: [
      "Vihiga Municipality",
      "Chavagali",
      "Mbale CBD",
      "Serem",
      "Kaimosi",
      "Hamisi",
      "Sabatia",
      "Majengo-Vihiga",
    ],
    MACHAKOS: [
      "Mulolongo",
      "Athi River",
      "Konza City",
      "Joska",
      "Kangundo Road",
      "Mua Hills",
      "Central",
      "South Park Estate",
      "Encasa Apartments",
      "Summit Urban Estates",
      "Lukenya Hills Estate",
      "Kyumvi",
      "Kenya Israel",
      "Greenpark Estate",
      "Katani",
      "Syokimau",
      "Gateway Mall Gated Estate",
      "Gratewall",
    ],
    MALINDI: ["Township"],
    MANDERA: ["CBD", "Rhamu", "El Wak", "Takaba"],
    MARALAL: ["CBD", "Wamba", "Kisima", "Baragoi", "Lodosoit", "Archers Post"],
    MARSABIT: ["CBD", "Moyale", "Ileret", "Laisamis", "Loiyangalani"],
    MAUA: ["Maili Tatu", "Mutuati", "Kimongoro", "Athiru", "Kithetu", "Kiegoi"],
    MERU: ["Laare", "Nkubu", "Timau"],
    MIGORI: [
      "Migori CBD",
      "Rongo",
      "Uriri",
      "Awendo",
      "Muhuru Bay",
      "Isbania",
      "Nyatike",
    ],
    MOMBASA: [
      "Kongowea",
      "KWALE",
      "Ukunda",
      "Watamu",
      "Bamburi",
      "Changamwe",
      "Jomvu",
      "Kisauni",
      "Kizingo",
      "Likoni",
      "Magongo",
      "Mikindani",
      "Miritini",
      "Nyali",
      "Shanzu",
      "Tudor",
    ],
    "MURANG'A": [
      "CBD",
      "Kangema",
      "Kiharu",
      "Kabati",
      "Kandara",
      "Maragua",
      "Makuyu",
      "Kiriani",
      "Gatura",
    ],
    NAIROBI: [
      "Athiriver",
      "Babadogo",
      "Bellevue",
      "Buru Buru",
      "CBD",
      "Chokaa",
      "Chuka",
      "Dagoreti Market",
      "Dandora",
      "Donholm",
      "Eastleigh",
      "Embakasi",
      "Fedha",
      "Gachie",
      "Garden Estate",
      "Gigiri",
      "Githurai",
      "Imara Daima",
      "Industrial Area",
      "Joska Town",
      "Juja",
      "Kahawa Sukari",
      "Kahawa Wendani",
      "Kahawa West",
      "Kamulu",
      "Kangemi",
      "Karen",
      "Kariobangi",
      "Kasarani",
      "Kawangware",
      "Kayole",
      "Kiambu",
      "Kikuyu",
      "Kileleshwa",
      "Kilimani",
      "Kinoo",
      "Kiserian",
      "Kitusuru",
      "Komarock",
      "Langata",
      "Lavington",
      "Limuru",
      "Lower Kabete",
      "Lucky Summer",
      "Machakos",
      "Mlolongo",
      "Mombasa Road",
      "Mukuru",
      "Muthaiga",
      "Mwiki",
      "Ngara",
      "Ngong Road",
      "Njiru",
      "Nyari",
      "Pangani",
      "Pipeline",
      "Riverside",
      "Rongai",
      "Roysambu",
      "Ruai",
      "Ruaka",
      "Ruiru",
      "Runda",
      "Saika",
      "South B",
      "South C",
      "Spring Valley",
      "Syokimau",
      "Tassia",
      "Thome",
      "Umoja",
      "Utawala",
      "Uthiru",
      "Westlands & Parklands",
      "Zimmerman",
    ],
    NAIVASHA: [
      "Kabati",
      "Kayole Naivasha",
      "Kehoto",
      "Karagita",
      "Kamere",
      "Fly-Over",
      "Delamere",
      "Naivasha CBD",
      "Mirera",
      "Mai Mahiu",
    ],
    NAKURU: [
      "Barnabas",
      "Flamingo",
      "Mireri Estates",
      "Naka",
      "Section 58",
      "Upper Hill",
      "Milimani",
      "Nakuru Meadows",
    ],
    NANYUKI: [
      "Mount Kenya Wildlife Estate (MKWE)",
      "Mukima Ridge",
      "Muthaiga Estate, Nanyuki",
      "Sweetwaters / Baraka Estate",
      "Sarova Maiyan Villas",
      "Ol Saruni Gardens",
      "Beverly Acres",
      "Airstrip Gardens",
      "Fahari Ridge 2",
      "Nanyuki Town Centre",
      "Bargain Area",
      "Timau Belt",
      "Likii Estate",
      "Kwa Huku Estate",
      "Nkando Estate",
      "Snow View Estate",
      "Madison Lane",
      "Cedar Mall Estate",
      "Burguret Area",
      "Daiga & Ethi",
      "Jua Kali Zone",
    ],
    NAROK: [
      "Lenana Estate",
      "Olerai Estate",
      "Tumaini Estate",
      "Ilmashariani",
      "Leleshwa",
      "Maasai Mara",
      "Ololulunga",
      "Nkareta",
      "London Estate",
    ],
    NYAHURURU: [
      "CBD",
      "Gatundia Estate",
      "Igwamiti",
      "Madaraka Estate",
      "Mairo Inya",
      "Ndururumo Area",
      "Ngano Estate",
    ],
    NYAMIRA: ["CBD", "Ekerubo", "Kebirigo", "Kijauri", "Nyansiongo"],
    NYERI: [
      "CBD",
      "Chaka",
      "Endarasha",
      "Karatina",
      "Mukurwe ini",
      "Mweiga",
      "Naro Moru",
      "Othaya",
    ],
    RUIRU: [
      "Daykio Bustani Estate",
      "Easternville Estate",
      "Kamakis",
      "Kamiti",
      "Membley Estate",
      "Mhasibu Bustani Estate",
      "Mugutha",
      "Ruiru Town",
      "Tatu City",
    ],
    SIAYA: ["Bondo", "CBD", "Ugunja", "Ugenya", "Yala", "Gem", "Sega"],
    THIKA: ["Ngoingwa", "CBD", "Makongeni", "Kiahuria"],
    VOI: ["CBD", "Kasigau", "Marungu", "Mbololo", "Ngolia", "Sagalla"],
    WAJIR: ["Habaswein", "CBD", "Hadado", "Tarbaj", "Diff", "Eldas", "Bute"],
    WEBUYE: [
      "CBD",
      "Bokoli",
      "Cheptulu",
      "Maraka",
      "Matulo",
      "Mihuu",
      "Misikhu",
      "Ndivisi",
      "Sitikho",
    ],
    WOTE: ["CBD", "Kaiti", "Makueni"],
    OLKALOU: ["Gichungo", "Kaimbaga", "Rurii"],
    MAGUMU: ["CBD", "Forest", "Njabini", "Kibiru", "Mukera", "Kinangop"],
    MWEA: ["CBD", "Kimbimbi", "Kutus"],
  };

  // Town options for dropdown (matching locations.md, removed Lamu)
  const townOptions = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Thika",
    "Malindi",
    "Kitale",
    "Garissa",
    "Kakamega",
    "Nyeri",
    "Meru",
    "Machakos",
    "Embu",
    "Kericho",
    "Bungoma",
    "Busia",
    "Homa Bay",
    "Kisii",
  ];

  // Helper function to get installation location options based on selected town
  const getInstallationLocationOptions = (): string[] => {
    if (!installationTown) {
      return [];
    }
    // Normalize town name to match locationsData keys
    const normalizedTown = installationTown.toUpperCase();
    const townKey = Object.keys(locationsData).find(
      (key) => key.toUpperCase() === normalizedTown
    );
    if (townKey && locationsData[townKey]) {
      return [...locationsData[townKey], "Other"];
    }
    return ["Other"];
  };

  const installationLocationOptions = getInstallationLocationOptions();

  // Auto-scroll How to Order slider
  useEffect(() => {
    const interval = setInterval(() => {
      setHowToOrderSlide((prev) => (prev + 1) % 3);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll to the active slide
  useEffect(() => {
    if (howToOrderSliderRef.current) {
      const slideWidth = howToOrderSliderRef.current.offsetWidth;
      howToOrderSliderRef.current.scrollTo({
        left: slideWidth * howToOrderSlide,
        behavior: "smooth",
      });
    }
  }, [howToOrderSlide]);

  // Track user interaction for audio autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      hasUserInteractedRef.current = true;
      setHasUserInteracted(true);
    };

    // Listen for any user interaction (click, touch, keyboard, scroll)
    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    });
    document.addEventListener("keydown", handleUserInteraction, { once: true });
    // Add scroll events to detect user interaction
    document.addEventListener("wheel", handleUserInteraction, { once: true });
    document.addEventListener("touchmove", handleUserInteraction, {
      once: true,
    });
    window.addEventListener("scroll", handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("wheel", handleUserInteraction);
      document.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  // Function to strip emojis from text for TTS
  const stripEmojis = (text: string): string => {
    // Remove emojis using regex pattern
    // This pattern matches most emoji ranges including:
    // - Emoticons, Miscellaneous Symbols, Dingbats
    // - Supplemental Symbols and Pictographs
    // - Transport and Map Symbols
    // - Enclosed characters
    // - Flags
    return text
      .replace(
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2190}-\u{21FF}]/gu,
        ""
      )
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim();
  };

  // Function to speak text using Google Cloud TTS
  const speakText = async (text: string) => {
    if (!text || isMuted) return;

    // Strip emojis from text before TTS
    const cleanText = stripEmojis(text);
    if (!cleanText) return; // If text is only emojis, don't speak

    // Only play audio if user has interacted with the page
    if (!hasUserInteracted) {
      // Wait for user interaction before playing audio
      return;
    }

    try {
      // Check if audio is currently playing
      const isAudioPlaying =
        audioRef.current &&
        !audioRef.current.paused &&
        audioRef.current.currentTime > 0 &&
        !audioRef.current.ended;

      // If audio is playing and almost done (within 0.5 seconds), wait for it to finish
      if (isAudioPlaying && audioRef.current) {
        const timeRemaining =
          audioRef.current.duration - audioRef.current.currentTime;
        if (timeRemaining <= 0.5) {
          // Wait for current audio to finish, then play new one
          audioRef.current.addEventListener(
            "ended",
            async () => {
              // Now play the new audio
              await playNewAudio(cleanText);
            },
            { once: true }
          );
          return;
        }
      }

      // Stop any currently playing audio (if it's not almost done)
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Play new audio
      await playNewAudio(cleanText);
    } catch (error) {
      console.error("TTS Error:", error);
      // Only use Google Cloud TTS - no fallback
      // Return to idle if error
      setRobotAnimationState("idle");
    }
  };

  // Helper function to play new audio
  const playNewAudio = async (cleanText: string) => {
    try {
      console.log(
        "🎙️ Frontend: Calling TTS API for text:",
        cleanText.substring(0, 50) + "..."
      );

      // Call TTS API
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: cleanText }),
      });

      console.log(
        "📡 Frontend: TTS API response status:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("❌ Frontend: TTS API Error:", {
          status: response.status,
          statusText: response.statusText,
          error: error,
        });
        // Only use Google Cloud TTS - no fallback
        setRobotAnimationState("idle");
        return;
      }

      const data = await response.json();
      console.log(
        "✅ Frontend: TTS API success, audio format:",
        data.format,
        "size:",
        data.audio?.length || 0
      );

      if (!data.audio) {
        console.error("❌ Frontend: No audio data in response");
        setRobotAnimationState("idle");
        return;
      }

      // Create audio element and play
      const audio = new Audio(`data:audio/${data.format};base64,${data.audio}`);
      audioRef.current = audio;

      // Return to idle when audio ends
      audio.addEventListener("ended", () => {
        setRobotAnimationState("idle");
      });

      // Return to idle if audio is paused and at the beginning
      audio.addEventListener("pause", () => {
        if (audio.currentTime === 0) {
          setRobotAnimationState("idle");
        }
      });

      console.log("🔊 Frontend: Attempting to play audio...");
      audio
        .play()
        .then(() => {
          console.log("✅ Frontend: Audio playing successfully");
          // Set to speaking when audio successfully starts
          setRobotAnimationState("speaking");
        })
        .catch((error) => {
          console.error("❌ Frontend: Audio play error:", error);
          // Return to idle on error
          setRobotAnimationState("idle");
          // Only use Google Cloud TTS - no fallback
        });
    } catch (error) {
      console.error("❌ Frontend: TTS Error:", error);
      // Only use Google Cloud TTS - no fallback
      setRobotAnimationState("idle");
    }
  };

  // Check if user is currently typing in any input field
  useEffect(() => {
    const checkTyping = () => {
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.getAttribute("contenteditable") === "true";

      isTypingRef.current = isInputFocused || false;
    };

    // Check on focus/blur events
    document.addEventListener("focusin", checkTyping);
    document.addEventListener("focusout", checkTyping);

    // Also check periodically
    const interval = setInterval(checkTyping, 100);

    return () => {
      document.removeEventListener("focusin", checkTyping);
      document.removeEventListener("focusout", checkTyping);
      clearInterval(interval);
    };
  }, []);

  // Speak robot messages with delay when user is typing
  useEffect(() => {
    if (robotMessage && !isMuted) {
      // Clear any existing timeout
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }

      // Don't stop audio here - let speakText handle it
      // This allows current audio to finish playing before starting new one

      // Determine delay based on whether user is typing
      const delay = isTypingRef.current ? 2000 : 500; // 2 seconds if typing, 0.5 seconds otherwise

      // Set timeout to speak after delay
      speechTimeoutRef.current = setTimeout(() => {
        if (!isMuted && robotMessage) {
          // Use Google Cloud TTS (it will handle stopping current audio if needed)
          speakText(robotMessage);
        }
      }, delay);

      // Cleanup on unmount or when message changes
      return () => {
        if (speechTimeoutRef.current) {
          clearTimeout(speechTimeoutRef.current);
        }
      };
    }
  }, [robotMessage, isMuted]);

  // Detect autofill and mark fields as blurred if they have valid values
  useEffect(() => {
    const checkAutofill = () => {
      // Check name field
      if (
        nameInputRef.current &&
        customerName.trim().length >= 2 &&
        !nameBlurred
      ) {
        setNameBlurred(true);
      }
      // Check phone field
      if (phoneInputRef.current && isPhoneValid && !phoneBlurred) {
        setPhoneBlurred(true);
      }
      // Check alternative field
      if (
        alternativeInputRef.current &&
        isAlternativeValid &&
        !alternativeBlurred
      ) {
        setAlternativeBlurred(true);
      }
      // Check email field
      if (emailInputRef.current && isEmailValid && !emailBlurred) {
        setEmailBlurred(true);
      }
      // Check delivery location field
      if (
        deliveryLocationInputRef.current &&
        isDeliveryLocationValid &&
        !deliveryLocationBlurred
      ) {
        setDeliveryLocationBlurred(true);
      }
      // Check date field
      if (
        dateInputRef.current &&
        isPreferredDateValid &&
        !preferredDateBlurred
      ) {
        setPreferredDateBlurred(true);
      }
    };

    // Check immediately
    checkAutofill();

    // Check periodically to catch autofill that happens after initial render
    const interval = setInterval(checkAutofill, 500);

    // Also check on window focus (autofill often happens when window regains focus)
    window.addEventListener("focus", checkAutofill);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", checkAutofill);
    };
  }, [
    customerName,
    isPhoneValid,
    isAlternativeValid,
    isEmailValid,
    isDeliveryLocationValid,
    isPreferredDateValid,
    nameBlurred,
    phoneBlurred,
    alternativeBlurred,
    emailBlurred,
    deliveryLocationBlurred,
    preferredDateBlurred,
  ]);

  // Time options for dropdown (1 hour apart)
  const timeOptions = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  // Trigger waving animation when robot first appears (only once)
  useEffect(() => {
    if (robotVisible && !hasWavedRef.current) {
      // Trigger waving animation when robot first appears
      hasWavedRef.current = true;
      setRobotAnimationState("waving");
      // Return to idle after waving
      setTimeout(() => {
        setRobotAnimationState("idle");
      }, 2000); // Wave for 2 seconds
    }
  }, [robotVisible]);

  // Sync animation state with actual audio playback - only reset "speaking" to "idle" if audio isn't playing
  useEffect(() => {
    const checkAudioState = () => {
      // Only check if we're in "speaking" state
      if (robotAnimationState === "speaking") {
        if (audioRef.current) {
          const isPlaying =
            !audioRef.current.paused &&
            !audioRef.current.ended &&
            audioRef.current.currentTime > 0;

          // If we're in speaking state but audio isn't playing, reset to idle
          if (!isPlaying) {
            setRobotAnimationState("idle");
          }
        } else {
          // No audio ref but state is speaking - reset to idle
          setRobotAnimationState("idle");
        }
      }
    };

    // Check periodically to sync state
    const interval = setInterval(checkAudioState, 500);

    return () => clearInterval(interval);
  }, [robotAnimationState]);

  // Detect scroll to show robot
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // Mark user interaction on any scroll (for TTS autoplay)
      if (!hasUserInteractedRef.current && scrollY > 0) {
        hasUserInteractedRef.current = true;
        setHasUserInteracted(true);
      }

      if (scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);
        setRobotVisible(true);
        // Show sweet welcome message when first scrolling
        const sweetMessages = [
          "Hey there! 👋 Let me help you get connected!",
          "Welcome! I'm here to make this easy for you! ✨",
          "Hi! Ready to find your perfect plan? 🚀",
          "Hello! Let's get you set up together! 💫",
        ];
        const randomMessage =
          sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
        setRobotMessage(randomMessage);

        // Clear any existing timeout before setting a new one
        if (messageTimeoutRef.current) {
          clearTimeout(messageTimeoutRef.current);
        }

        // Hide message after 4 seconds
        messageTimeoutRef.current = setTimeout(() => {
          setRobotMessage("");
          messageTimeoutRef.current = null;
        }, 4000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  // Detect package selection and show message
  useEffect(() => {
    // Only show message if package actually changed (not initial load)
    if (selectedPackage !== previousPackage && previousPackage !== null) {
      // Make robot visible if not already
      if (!robotVisible) {
        setRobotVisible(true);
      }

      // Show sweet message based on selected package
      const packageMessages = {
        standard: [
          "Great choice! The Standard plan is perfect for everyday use! 📡",
          "Excellent! You'll love the reliable Standard connection! ✨",
          "Smart pick! Standard plan gives you great value! 💪",
        ],
        premium: [
          "Awesome! Premium plan for the best experience! 🚀",
          "Perfect choice! Premium gives you maximum speed! ⚡",
          "Excellent! You're going to love the Premium connection! 🌟",
        ],
      };

      const messages =
        packageMessages[selectedPackage as keyof typeof packageMessages] ||
        packageMessages.premium;
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setRobotMessage(randomMessage);

      // Clear any existing timeout before setting a new one
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }

      // Hide message after 4 seconds
      messageTimeoutRef.current = setTimeout(() => {
        setRobotMessage("");
        messageTimeoutRef.current = null;
      }, 4000);
    }
    setPreviousPackage(selectedPackage);
  }, [selectedPackage, previousPackage, robotVisible]);

  // Handle viewport changes (keyboard appearing/disappearing)
  useEffect(() => {
    const updateRobotPosition = () => {
      // Use visual viewport if available (for mobile keyboards)
      if (window.visualViewport) {
        const viewport = window.visualViewport;
        const viewportHeight = viewport.height;
        const windowHeight = window.innerHeight;
        const heightDiff = windowHeight - viewportHeight;

        // If keyboard is open (viewport is smaller), position robot at top-right
        if (heightDiff > 150) {
          // Keyboard is open - position robot at top-right of visible viewport
          setIsKeyboardOpen(true);
          // Calculate top position: visual viewport offset + 1rem (16px)
          const visualViewportTop = viewport.offsetTop || 0;
          setRobotTop(`${visualViewportTop + 16}px`);
          setRobotBottom("");
          // Track visual viewport scroll offset for reference
          setViewportScrollOffset(visualViewportTop);
        } else {
          // Keyboard is closed, use normal bottom position
          setIsKeyboardOpen(false);
          setRobotTop(null);
          setRobotBottom("1rem");
          setViewportScrollOffset(0);
        }
      } else {
        // Fallback for browsers without visual viewport API
        setIsKeyboardOpen(false);
        setRobotTop(null);
        setRobotBottom("1rem");
        setViewportScrollOffset(0);
      }
    };

    const handleViewportScroll = () => {
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        if (window.visualViewport) {
          const viewport = window.visualViewport;
          const viewportHeight = viewport.height;
          const windowHeight = window.innerHeight;
          const heightDiff = windowHeight - viewportHeight;

          // Only update position when keyboard is open
          if (heightDiff > 150) {
            // Update robot position to stay at top of visual viewport
            // Calculate top position: visual viewport offset + 1rem (16px)
            const visualViewportTop = viewport.offsetTop || 0;
            setRobotTop(`${visualViewportTop + 16}px`);
            setViewportScrollOffset(visualViewportTop);
          } else {
            setRobotTop(null);
            setViewportScrollOffset(0);
          }
        }
      });
    };

    // Initial position
    updateRobotPosition();

    // Listen for viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateRobotPosition);
      window.visualViewport.addEventListener("scroll", handleViewportScroll);
    } else {
      // Fallback to window resize
      window.addEventListener("resize", updateRobotPosition);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          updateRobotPosition
        );
        window.visualViewport.removeEventListener(
          "scroll",
          handleViewportScroll
        );
      } else {
        window.removeEventListener("resize", updateRobotPosition);
      }
    };
  }, []);

  // Show robot when user starts typing or when there are errors
  useEffect(() => {
    const hasContent =
      customerName.trim().length > 0 ||
      customerPhone.trim().length > 0 ||
      customerAlternativeNumber.trim().length > 0 ||
      deliveryLocation.trim().length > 0 ||
      preferredDate.trim().length > 0 ||
      preferredTime.trim().length > 0;

    if (hasContent && !robotVisible) {
      setRobotVisible(true);
      // Show welcome message when robot first appears from typing
      const welcomeMessages = [
        "Hi! I'm here to help you fill this out! 👋",
        "Great! Let's get you connected! 🚀",
        "Awesome! I'll guide you through this! ✨",
      ];
      const randomMessage =
        welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      setRobotMessage(randomMessage);

      // Clear any existing timeout before setting a new one
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }

      // Clear welcome message after 3 seconds to show typing messages
      messageTimeoutRef.current = setTimeout(() => {
        if (!nameBlurred && !phoneBlurred) {
          setRobotMessage("");
        }
        messageTimeoutRef.current = null;
      }, 3000);
    }
  }, [
    customerName,
    customerPhone,
    customerAlternativeNumber,
    deliveryLocation,
    preferredDate,
    preferredTime,
    robotVisible,
    nameBlurred,
    phoneBlurred,
    alternativeBlurred,
    deliveryLocationBlurred,
    preferredDateBlurred,
    preferredTimeBlurred,
  ]);

  // Show typing encouragement messages (only when actively typing, not blurred)
  useEffect(() => {
    if (!robotVisible) return;

    // Priority: Don't override blur messages (errors/success)
    // Only show typing messages when user is actively typing (not blurred)
    const isTyping =
      (customerName.trim().length > 0 && !nameBlurred) ||
      (customerPhone.trim().length > 0 && !phoneBlurred) ||
      (customerAlternativeNumber.trim().length > 0 && !alternativeBlurred) ||
      (deliveryLocation.trim().length > 0 && !deliveryLocationBlurred) ||
      (preferredDate.trim().length > 0 && !preferredDateBlurred) ||
      (preferredTime.trim().length > 0 && !preferredTimeBlurred);

    if (!isTyping) return;

    // Show message when user is typing name
    if (customerName.trim().length > 0 && !nameBlurred) {
      if (customerName.trim().length < 2) {
        const typingMessages = [
          "Keep typing! I'm here to help! ✨",
          "You're doing great! Keep going! 💪",
          "Almost there! Just a bit more! 🚀",
        ];
        const randomMessage =
          typingMessages[Math.floor(Math.random() * typingMessages.length)];
        setRobotMessage(randomMessage);
      } else if (customerName.trim().length >= 2) {
        // Name is valid while typing
        const firstName = customerName.trim().split(" ")[0];
        setRobotMessage(`Looking good ${firstName}! 👍`);
      }
    } else if (customerPhone.trim().length > 0 && !phoneBlurred) {
      if (!isPhoneValid) {
        const phoneTypingMessages = [
          "Enter your Airtel number (10-12 digits) 📱",
          "Keep typing your phone number! 🔢",
          "Almost there! Make sure it's 10-12 digits! 📞",
        ];
        const randomMessage =
          phoneTypingMessages[
            Math.floor(Math.random() * phoneTypingMessages.length)
          ];
        setRobotMessage(randomMessage);
      } else {
        setRobotMessage("Perfect! That looks right! ✅");
      }
    } else if (
      customerAlternativeNumber.trim().length > 0 &&
      !alternativeBlurred
    ) {
      if (!isAlternativeValid) {
        const alternativeTypingMessages = [
          "Enter your alternative number (10-12 digits) 📱",
          "Keep typing your alternative phone number! 🔢",
          "Almost there! Make sure it's 10-12 digits! 📞",
        ];
        const randomMessage =
          alternativeTypingMessages[
            Math.floor(Math.random() * alternativeTypingMessages.length)
          ];
        setRobotMessage(randomMessage);
      } else {
        setRobotMessage("Perfect! That looks right! ✅");
      }
    } else if (
      isInstallationLocationOther &&
      installationLocation.trim().length > 0 &&
      !installationLocationBlurred
    ) {
      if (!isInstallationLocationValid) {
        const installationLocationTypingMessages = [
          "Keep typing! Tell us your location! 📍",
          "Almost there! Add more details about your location! 🗺️",
          "Great! Keep going with your location! 🏠",
        ];
        const randomMessage =
          installationLocationTypingMessages[
            Math.floor(
              Math.random() * installationLocationTypingMessages.length
            )
          ];
        setRobotMessage(randomMessage);
      } else {
        setRobotMessage("Perfect! Your location is clear! ✅");
      }
    } else if (deliveryLocation.trim().length > 0 && !deliveryLocationBlurred) {
      if (!isDeliveryLocationValid) {
        const locationTypingMessages = [
          "Tell me about a nearby landmark! 🗺️",
          "Keep typing! Describe the landmark! 📍",
          "Almost there! Add more details about the landmark! 🏠",
        ];
        const randomMessage =
          locationTypingMessages[
            Math.floor(Math.random() * locationTypingMessages.length)
          ];
        setRobotMessage(randomMessage);
      } else {
        setRobotMessage("Perfect! That landmark sounds clear! ✅");
      }
    } else if (preferredDate.trim().length > 0 && !preferredDateBlurred) {
      setRobotMessage("Great! Pick a date that works for you! 📅");
    } else if (preferredTime.trim().length > 0 && !preferredTimeBlurred) {
      setRobotMessage("Perfect time slot! ⏰");
    }
  }, [
    customerName,
    customerPhone,
    customerAlternativeNumber,
    installationLocation,
    isInstallationLocationOther,
    installationLocationBlurred,
    isInstallationLocationValid,
    deliveryLocation,
    preferredDate,
    preferredTime,
    robotVisible,
    nameBlurred,
    phoneBlurred,
    alternativeBlurred,
    deliveryLocationBlurred,
    preferredDateBlurred,
    preferredTimeBlurred,
    isPhoneValid,
    isAlternativeValid,
    isDeliveryLocationValid,
  ]);

  // Check form completion when last question (time) is answered
  useEffect(() => {
    if (!robotVisible) return;
    if (!preferredTimeBlurred || !isPreferredTimeValid) return;

    // When last question is completed, check all fields for errors
    const errors: string[] = [];

    if (!isNameValid || !nameBlurred) {
      errors.push("name");
    }
    if (!isPhoneValid || !phoneBlurred) {
      errors.push("phone number");
    }
    if (!isAlternativeValid || !alternativeBlurred) {
      errors.push("alternative number");
    }
    if (!isEmailValid || !emailBlurred) {
      errors.push("email address");
    }
    if (!isTownValid || !townBlurred) {
      errors.push("installation town");
    }
    if (!isDeliveryLocationValid || !deliveryLocationBlurred) {
      errors.push("delivery location");
    }
    if (!isInstallationLocationValid || !installationLocationBlurred) {
      errors.push("installation location");
    }
    if (!isPreferredDateValid || !preferredDateBlurred) {
      errors.push("preferred date");
    }
    // Time is already validated since we're in this block

    // Clear any existing timeout before setting a new one
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    if (errors.length > 0) {
      // There are errors - mention them
      const errorMessages = [
        `Almost there! But I noticed some issues: ${errors.join(
          ", "
        )}. Please check and fix them! 🔍`,
        `You're so close! However, there are a few fields that need attention: ${errors.join(
          ", "
        )}. Let's fix them together! ✨`,
        `Great progress! But we need to fix: ${errors.join(
          ", "
        )}. Once done, you're all set! 🚀`,
      ];
      const randomMessage =
        errorMessages[Math.floor(Math.random() * errorMessages.length)];
      setRobotMessage(randomMessage);
    } else {
      // All fields are valid - congratulate!
      const firstName = customerName.trim().split(" ")[0] || "there";
      const congratulations = [
        `🎉 Amazing ${firstName}! All done! Your form is perfect and ready to submit! Now click the Submit button! 🎉`,
        `✨ Fantastic ${firstName}! Everything looks great! You've completed the form successfully! Go ahead and submit it! ✨`,
        `🚀 Excellent work ${firstName}! All your information is correct. You're all set! Now submit it! 🚀`,
        `💫 Perfect ${firstName}! The form is complete and ready. Great job! Click Submit to finish! 💫`,
      ];
      const randomMessage =
        congratulations[Math.floor(Math.random() * congratulations.length)];
      setRobotMessage(randomMessage);
    }
  }, [
    preferredTimeBlurred,
    isPreferredTimeValid,
    robotVisible,
    isNameValid,
    nameBlurred,
    isPhoneValid,
    phoneBlurred,
    isAlternativeValid,
    alternativeBlurred,
    isEmailValid,
    emailBlurred,
    isTownValid,
    townBlurred,
    isDeliveryLocationValid,
    deliveryLocationBlurred,
    isInstallationLocationValid,
    installationLocationBlurred,
    isPreferredDateValid,
    preferredDateBlurred,
    customerName,
  ]);

  // Update robot message based on form state (only if robot is visible)
  useEffect(() => {
    if (!robotVisible) return;

    // Priority 1: If last question (time) is completed, skip other messages
    // (The form completion check useEffect will handle this)
    if (preferredTimeBlurred && isPreferredTimeValid) {
      return;
    }

    // Check if we're on the last 3 questions - show encouragement
    const completedFields = [
      isNameValid && nameBlurred,
      isPhoneValid && phoneBlurred,
      isAlternativeValid && alternativeBlurred,
    ].filter(Boolean).length;

    const isOnLastThreeQuestions =
      (deliveryLocation.trim().length > 0 && !deliveryLocationBlurred) ||
      (preferredDate.trim().length > 0 && !preferredDateBlurred) ||
      (preferredTime.trim().length > 0 && !preferredTimeBlurred);

    // Show "only 3 questions to go" message when starting the last 3 questions
    // Show it when user starts typing in any of the last 3 questions and has completed at least 2 previous fields
    if (
      isOnLastThreeQuestions &&
      !deliveryLocationBlurred &&
      !preferredDateBlurred &&
      !preferredTimeBlurred &&
      completedFields >= 2
    ) {
      const encouragementMessages = [
        "Wow! Only 2 questions to go! You're almost done! 🎉",
        "Amazing progress! Just 3 more questions and you're all set! ✨",
        "You're doing fantastic! Only 3 questions left! 🚀",
        "Almost there! Just 3 more questions to complete! 💫",
      ];
      const randomMessage =
        encouragementMessages[
          Math.floor(Math.random() * encouragementMessages.length)
        ];
      setRobotMessage(randomMessage);
      return;
    }

    // Priority: Show errors first, then success messages
    if (preferredTimeBlurred && !isPreferredTimeValid) {
      const timeErrors = [
        "Please select a preferred time for your visit! ⏰",
        "We need to know when you'd like us to visit! 📅",
        "Please choose a time slot that works for you! 🕐",
      ];
      const randomMessage =
        timeErrors[Math.floor(Math.random() * timeErrors.length)];
      setRobotMessage(randomMessage);
    } else if (preferredDateBlurred && !isPreferredDateValid) {
      const dateErrors = [
        "Please select a preferred date for your visit! 📅",
        "We need to know when you'd like us to visit! 📆",
        "Please choose a date that works for you! 🗓️",
      ];
      const randomMessage =
        dateErrors[Math.floor(Math.random() * dateErrors.length)];
      setRobotMessage(randomMessage);
    } else if (deliveryLocationBlurred && !isDeliveryLocationValid) {
      const locationErrors = [
        "Please provide a more detailed landmark (at least 5 characters)! 🗺️",
        "We need a clearer landmark description. Add more details! 📍",
        "The landmark seems too short. Please add more information! 🏠",
      ];
      const randomMessage =
        locationErrors[Math.floor(Math.random() * locationErrors.length)];
      setRobotMessage(randomMessage);
    } else if (installationLocationBlurred && !isInstallationLocationValid) {
      // If "Other" is selected and custom input is focused, don't show error (user is typing)
      if (isInstallationLocationOther && installationLocationFocused) {
        return; // Don't show error while user is typing in custom input
      }

      // If "Other" is selected, show a different message
      if (isInstallationLocationOther) {
        const otherLocationErrors = [
          "Please tell us where you are from! 📍",
          "We need your location. Please enter it! 🗺️",
          "Please provide your installation location! 🏠",
        ];
        const randomMessage =
          otherLocationErrors[
            Math.floor(Math.random() * otherLocationErrors.length)
          ];
        setRobotMessage(randomMessage);
      } else {
        const installationLocationErrors = [
          "Please select an installation location! 🏠",
          "We need to know where to install. Please choose a location! 📍",
          "Please select a location from the dropdown! 🗺️",
        ];
        const randomMessage =
          installationLocationErrors[
            Math.floor(Math.random() * installationLocationErrors.length)
          ];
        setRobotMessage(randomMessage);
      }
    } else if (alternativeBlurred && !isAlternativeValid) {
      // Alternative number error - most recent field
      const alternativeErrors = [
        "Oops! Please enter a valid alternative phone number (10-12 digits) 📱",
        "The alternative number needs to be 10-12 digits. Try again! 🔢",
        "Hmm, that alternative number doesn't look right. Check and try again! 📞",
      ];
      const randomMessage =
        alternativeErrors[Math.floor(Math.random() * alternativeErrors.length)];
      setRobotMessage(randomMessage);
    } else if (phoneBlurred && !isPhoneValid) {
      // Phone error
      const phoneErrors = [
        "Oops! Please enter a valid Airtel phone number (10-12 digits) 📱",
        "The phone number needs to be 10-12 digits. Try again! 🔢",
        "Hmm, that phone number doesn't look right. Check and try again! 📞",
      ];
      const randomMessage =
        phoneErrors[Math.floor(Math.random() * phoneErrors.length)];
      setRobotMessage(randomMessage);
    } else if (nameBlurred && !isNameValid) {
      // Name error
      const nameErrors = [
        "Your name needs to be at least 2 characters long. Keep typing! ✍️",
        "Please enter your full name (at least 2 characters) 📝",
        "The name seems too short. Let's add a bit more! 👤",
      ];
      const randomMessage =
        nameErrors[Math.floor(Math.random() * nameErrors.length)];
      setRobotMessage(randomMessage);
    } else if (nameBlurred && isNameValid) {
      // Get first name from full name
      const firstName = customerName.trim().split(" ")[0];
      const congratulations = [
        `Hi ${firstName}! You're doing great! Keep it up! 🎉`,
        `Awesome ${firstName}! You're making excellent progress! ✨`,
        `Way to go ${firstName}! You're almost there! 🚀`,
        `Fantastic ${firstName}! Keep going, you're doing amazing! 💫`,
      ];
      const randomMessage =
        congratulations[Math.floor(Math.random() * congratulations.length)];
      setRobotMessage(randomMessage);
    } else if (phoneBlurred && isPhoneValid) {
      const firstName = customerName.trim().split(" ")[0] || "there";
      const finalMessages = [
        `Perfect ${firstName}! Almost there! 🎯`,
        `Excellent ${firstName}! Just a bit more! ⚡`,
        `Amazing ${firstName}! You're so close! 🌟`,
      ];
      const randomMessage =
        finalMessages[Math.floor(Math.random() * finalMessages.length)];
      setRobotMessage(randomMessage);
    } else if (alternativeBlurred && isAlternativeValid) {
      const firstName = customerName.trim().split(" ")[0] || "there";
      const alternativeSuccess = [
        `Great ${firstName}! Alternative number saved! 📱`,
        `Perfect ${firstName}! We've got your backup number! ✅`,
        `Excellent ${firstName}! Your alternative number is set! 🎉`,
      ];
      const randomMessage =
        alternativeSuccess[
          Math.floor(Math.random() * alternativeSuccess.length)
        ];
      setRobotMessage(randomMessage);
    } else if (deliveryLocationBlurred && isDeliveryLocationValid) {
      const firstName = customerName.trim().split(" ")[0] || "there";
      const locationSuccess = [
        `Perfect ${firstName}! We've got your location! 📍`,
        `Excellent ${firstName}! Location saved! 🗺️`,
        `Great ${firstName}! We know where to find you! 🏠`,
      ];
      const randomMessage =
        locationSuccess[Math.floor(Math.random() * locationSuccess.length)];
      setRobotMessage(randomMessage);
    } else if (preferredDateBlurred && isPreferredDateValid) {
      const firstName = customerName.trim().split(" ")[0] || "there";
      const dateSuccess = [
        `Perfect ${firstName}! Date saved! 📅`,
        `Great ${firstName}! We've noted your preferred date! 📆`,
        `Excellent ${firstName}! Date confirmed! 🗓️`,
      ];
      const randomMessage =
        dateSuccess[Math.floor(Math.random() * dateSuccess.length)];
      setRobotMessage(randomMessage);
    } else if (preferredTimeBlurred && isPreferredTimeValid) {
      // Don't show individual success message here - let the form completion check handle it
      // This prevents duplicate messages
      return;
    }
  }, [
    nameBlurred,
    isNameValid,
    phoneBlurred,
    isPhoneValid,
    alternativeBlurred,
    isAlternativeValid,
    emailBlurred,
    isEmailValid,
    townBlurred,
    isTownValid,
    deliveryLocationBlurred,
    isDeliveryLocationValid,
    installationLocationBlurred,
    isInstallationLocationValid,
    isInstallationLocationOther,
    installationLocationFocused,
    preferredDateBlurred,
    isPreferredDateValid,
    preferredTimeBlurred,
    isPreferredTimeValid,
    robotVisible,
    customerName,
    deliveryLocation,
    preferredDate,
    preferredTime,
  ]);

  const scrollToStep2 = () => {
    const scroll = () => {
      if (step2Ref.current) {
        const rect = step2Ref.current.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    };

    // Immediate scroll
    scroll();

    // Retry after delays to handle keyboard
    setTimeout(scroll, 200);
    setTimeout(scroll, 600);

    // Also handle when keyboard closes
    const handleResize = () => {
      scroll();
    };
    window.addEventListener("resize", handleResize, { once: true });
  };

  const showNameCheck = nameBlurred && isNameValid;
  const showPhoneCheck = phoneBlurred && isPhoneValid;
  const showAlternativeCheck = alternativeBlurred && isAlternativeValid;
  const showEmailCheck = emailBlurred && isEmailValid;
  const showTownCheck = townBlurred && isTownValid;
  const showDeliveryLocationCheck =
    deliveryLocationBlurred && isDeliveryLocationValid;
  const showInstallationLocationCheck =
    installationLocationBlurred && isInstallationLocationValid;
  const showPreferredDateCheck = preferredDateBlurred && isPreferredDateValid;
  const showPreferredTimeCheck = preferredTimeBlurred && isPreferredTimeValid;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .installation-location-dropdown-opaque {
          background-color: rgb(23, 23, 23) !important;
          opacity: 1 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .installation-location-dropdown-opaque > div {
          background-color: rgb(23, 23, 23) !important;
          opacity: 1 !important;
        }
        .installation-location-dropdown-opaque button {
          background-color: rgb(23, 23, 23) !important;
          opacity: 1 !important;
        }
        .installation-location-dropdown-opaque button:hover {
          background-color: rgb(38, 38, 38) !important;
          opacity: 1 !important;
        }
      `,
        }}
      />
      <motion.div
        className="min-h-screen bg-neutral-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating Robot Guide - Appears on scroll */}
        {robotVisible && (
          <motion.div
            className="fixed right-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            style={{
              bottom: robotTop ? undefined : robotBottom,
              top: robotTop || undefined,
              position: "fixed",
              zIndex: 2147483647, // Maximum z-index value
              isolation: "isolate", // Create new stacking context
              overflow: "visible",
            }}
          >
            <div
              className="relative"
              style={{ overflow: "visible", minHeight: "fit-content" }}
            >
              {/* Speech bubble - positioned to the left of robot */}
              {robotMessage && (
                <div
                  className={`absolute right-full bg-neutral-900/95 backdrop-blur-sm border-2 border-yellow-400/60 rounded-lg px-3 animate-fade-in shadow-lg ${poppins.variable}`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    boxShadow:
                      "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(251, 191, 36, 0.2)",
                    maxWidth: "min(calc(100vw - 10px), 440px)",
                    minWidth: "240px",
                    zIndex: 2147483647,
                    marginRight: "4px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    overflow: "visible",
                    left: "auto",
                    right: "100%",
                    maxHeight: "none",
                  }}
                >
                  <span
                    className="text-xs text-white"
                    style={{
                      display: "block",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      wordSpacing: "normal",
                      lineHeight: "1.5",
                      width: "100%",
                      maxWidth: "100%",
                      margin: 0,
                      padding: 0,
                      writingMode: "horizontal-tb",
                      textOrientation: "mixed",
                      overflow: "visible",
                    }}
                  >
                    {robotMessage}
                  </span>
                  {/* Speech bubble tail - pointing right to robot */}
                  <div
                    className="absolute right-0 top-1/2 mr-[-6px] w-0 h-0"
                    style={{
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      borderLeft: "6px solid rgb(38, 38, 38)",
                      transform: "translateY(-50%)",
                    }}
                  ></div>
                  <div
                    className="absolute right-0 top-1/2 mr-[-7px] w-0 h-0"
                    style={{
                      borderTop: "7px solid transparent",
                      borderBottom: "7px solid transparent",
                      borderLeft: "7px solid rgba(251, 191, 36, 0.6)",
                      transform: "translateY(-50%)",
                      zIndex: -1,
                    }}
                  ></div>
                </div>
              )}
              {/* Robot Lottie Animation */}
              <div
                className="relative"
                style={{
                  width: "60px",
                  height: "60px",
                  minWidth: "60px",
                  minHeight: "60px",
                }}
              >
                <img
                  src={
                    robotAnimationState === "speaking"
                      ? "/robot-speaking.png"
                      : robotAnimationState === "waving"
                      ? "/robot-waving.png"
                      : "/robot-idle.png"
                  }
                  alt="Guide Robot"
                  className="w-full h-full object-contain"
                  style={{
                    width: "70px",
                    height: "70px",
                    display: "block",
                    filter:
                      robotAnimationState === "speaking"
                        ? "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))"
                        : "drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))",
                    transform:
                      robotAnimationState === "speaking"
                        ? "scale(1.05)"
                        : "scale(1)",
                    opacity: robotAnimationState === "speaking" ? 1 : 0.85,
                    transition:
                      "transform 0.6s ease, filter 0.6s ease, opacity 0.6s ease",
                  }}
                  onError={(e) => {
                    // Fallback to default robot image if specific state image doesn't exist
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "/robot.png") {
                      target.src = "/robot.png";
                    }
                  }}
                />

                {/* Mute/Unmute Toggle Button */}
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    // Stop audio if muting
                    if (!isMuted && audioRef.current) {
                      audioRef.current.pause();
                      audioRef.current.currentTime = 0;
                    }
                    // Also cancel browser TTS if it's being used as fallback
                    if (
                      !isMuted &&
                      typeof window !== "undefined" &&
                      "speechSynthesis" in window
                    ) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-neutral-900/90 border-2 border-yellow-400/60 flex items-center justify-center hover:bg-neutral-800/90 transition-colors pointer-events-auto z-50"
                  style={{
                    boxShadow:
                      "0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px rgba(251, 191, 36, 0.2)",
                  }}
                  aria-label={isMuted ? "Unmute robot" : "Mute robot"}
                >
                  {isMuted ? (
                    <svg
                      className="w-3 h-3 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Model3DWithText />
        </motion.div>

        {/* How to Order Section - Below Carousel with border cut effect */}
        <motion.div
          className="relative px-3 pt-4 pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 border-yellow-400/60 p-4">
            {/* Title with border cut effect */}
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "0px",
                  background: "rgb(38, 38, 38)",
                  height: "2px",
                  width: "calc(100% + 8px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Title text */}
              <div
                className="px-1.5 relative"
                style={{ top: "-50%", transform: "translateY(-50%)" }}
              >
                <h2
                  className={`text-sm font-semibold ${poppins.variable}`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  How to Order
                </h2>
              </div>
            </div>

            {/* Compact Slider */}
            <div className="relative overflow-hidden mt-2">
              <div
                ref={howToOrderSliderRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Step 1 */}
                <div className="shrink-0 w-full snap-center">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 relative">
                      <span className="absolute top-0 left-0 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center text-yellow-400 text-xs font-bold z-20 border border-yellow-400/50">
                        1
                      </span>
                      <img
                        src="/package.png"
                        alt="Package"
                        className="w-12 h-12 object-contain relative z-10"
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        Choose your preferred package below
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="shrink-0 w-full snap-center">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 relative">
                      <span className="absolute top-0 left-0 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center text-yellow-400 text-xs font-bold z-20 border border-yellow-400/50">
                        2
                      </span>
                      <img
                        src="/form.png"
                        alt="Form"
                        className="w-12 h-12 object-contain relative z-10"
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        Fill in your details and installation preferences
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="shrink-0 w-full snap-center">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 relative">
                      <span className="absolute top-0 left-0 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center text-yellow-400 text-xs font-bold z-20 border border-yellow-400/50">
                        3
                      </span>
                      <img
                        src="/submit.png"
                        alt="Submit"
                        className="w-12 h-12 object-contain relative z-10"
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        Submit your request and our qualified technician will
                        contact you
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    howToOrderSlide === 0
                      ? "bg-yellow-400 w-6"
                      : "bg-yellow-400/30"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    howToOrderSlide === 1
                      ? "bg-yellow-400 w-6"
                      : "bg-yellow-400/30"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    howToOrderSlide === 2
                      ? "bg-yellow-400 w-6"
                      : "bg-yellow-400/30"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Choose Your Package */}
        <motion.section
          className="px-3 py-2"
          style={{ marginTop: "0" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-full">
            <div className="text-center mb-6">
              <h2
                className={`text-lg font-semibold text-white mb-2 ${poppins.variable}`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Step 1: Choose Your Package
              </h2>
            </div>
            <PricingCards />
          </div>
        </motion.section>

        {/* Step 2: Almost There */}
        <motion.section
          id="step-2"
          ref={step2Ref}
          className="px-3 py-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-full">
            <div className="text-center mb-6">
              <h2
                className={`text-lg font-semibold text-white mb-2 ${poppins.variable}`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Step 2: Almost There
              </h2>
            </div>

            {/* Sample Form Field - Customer Name */}
            <div className="mb-6 relative">
              {/* Floating Label */}
              <div
                className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                  nameFocused || customerName
                    ? "top-0 transform -translate-y-1/2"
                    : "top-1/2 transform -translate-y-1/2"
                }`}
                style={{ zIndex: 30 }}
              >
                {/* Border cut background */}
                {(nameFocused || customerName) && (
                  <div
                    className="absolute left-0"
                    style={{
                      top: "50%",
                      background: "rgb(38, 38, 38)",
                      height: "2px",
                      width: "calc(100% + 4px)",
                      marginLeft: "-4px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                )}
                {/* Label text */}
                <div className="px-1.5 relative">
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      nameFocused || customerName
                        ? "text-white/90"
                        : "text-neutral-400"
                    } ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {nameFocused || customerName ? (
                      <>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          1
                        </span>
                        Full Name <span className="text-yellow-400">*</span>
                      </>
                    ) : (
                      "Enter your Full Name"
                    )}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  ref={nameInputRef}
                  type="text"
                  placeholder=""
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  onFocus={() => {
                    setNameFocused(true);
                    scrollToStep2();
                  }}
                  onBlur={() => {
                    setNameFocused(false);
                    setNameBlurred(true);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    nameFocused || customerName ? "pt-5" : "pt-3.5"
                  } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    showNameCheck
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                    poppins.variable
                  }`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                  onClick={scrollToStep2}
                />
                {showNameCheck && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Phone (Airtel) */}
            <div className="mb-6 relative">
              {/* Floating Label */}
              <div
                className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                  phoneFocused || customerPhone
                    ? "top-0 transform -translate-y-1/2"
                    : "top-1/2 transform -translate-y-1/2"
                }`}
                style={{ zIndex: 30 }}
              >
                {/* Border cut background */}
                {(phoneFocused || customerPhone) && (
                  <div
                    className="absolute left-0"
                    style={{
                      top: "50%",
                      background: "rgb(38, 38, 38)",
                      height: "2px",
                      width: "calc(100% + 4px)",
                      marginLeft: "-4px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                )}
                {/* Label text */}
                <div className="px-1.5 relative">
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      phoneFocused || customerPhone
                        ? "text-white/90"
                        : "text-neutral-400"
                    } ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {phoneFocused || customerPhone ? (
                      <>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          2
                        </span>
                        Airtel Number <span className="text-yellow-400">*</span>
                      </>
                    ) : (
                      "Enter your Airtel Number"
                    )}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  ref={phoneInputRef}
                  type="tel"
                  placeholder=""
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  onFocus={() => {
                    setPhoneFocused(true);
                    scrollToStep2();
                  }}
                  onBlur={() => {
                    setPhoneFocused(false);
                    setPhoneBlurred(true);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    phoneFocused || customerPhone ? "pt-5" : "pt-3.5"
                  } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    showPhoneCheck
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                    poppins.variable
                  }`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                  onClick={scrollToStep2}
                />
                {showPhoneCheck && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Alternative Number */}
            <div className="mb-6 relative">
              {/* Floating Label */}
              <div
                className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                  alternativeFocused || customerAlternativeNumber
                    ? "top-0 transform -translate-y-1/2"
                    : "top-1/2 transform -translate-y-1/2"
                }`}
                style={{ zIndex: 30 }}
              >
                {/* Border cut background */}
                {(alternativeFocused || customerAlternativeNumber) && (
                  <div
                    className="absolute left-0"
                    style={{
                      top: "50%",
                      background: "rgb(38, 38, 38)",
                      height: "2px",
                      width: "calc(100% + 4px)",
                      marginLeft: "-4px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                )}
                {/* Label text */}
                <div className="px-1.5 relative">
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      alternativeFocused || customerAlternativeNumber
                        ? "text-white/90"
                        : "text-neutral-400"
                    } ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {alternativeFocused || customerAlternativeNumber ? (
                      <>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          3
                        </span>
                        Alternative Number{" "}
                        <span className="text-yellow-400">*</span>
                      </>
                    ) : (
                      "Enter your Alternative Number"
                    )}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  ref={alternativeInputRef}
                  type="tel"
                  placeholder=""
                  value={customerAlternativeNumber}
                  onChange={(e) => setCustomerAlternativeNumber(e.target.value)}
                  onFocus={() => {
                    setAlternativeFocused(true);
                    scrollToStep2();
                  }}
                  onBlur={() => {
                    setAlternativeFocused(false);
                    setAlternativeBlurred(true);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    alternativeFocused || customerAlternativeNumber
                      ? "pt-5"
                      : "pt-3.5"
                  } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    showAlternativeCheck
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                    poppins.variable
                  }`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                  onClick={scrollToStep2}
                />
                {showAlternativeCheck && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Email Address */}
            <div className="mb-6 relative">
              {/* Floating Label */}
              <div
                className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                  emailFocused || customerEmail
                    ? "top-0 transform -translate-y-1/2"
                    : "top-1/2 transform -translate-y-1/2"
                }`}
                style={{ zIndex: 30 }}
              >
                {/* Border cut background */}
                {(emailFocused || customerEmail) && (
                  <div
                    className="absolute left-0"
                    style={{
                      top: "50%",
                      background: "rgb(38, 38, 38)",
                      height: "2px",
                      width: "calc(100% + 4px)",
                      marginLeft: "-4px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                )}
                {/* Label text */}
                <div className="px-1.5 relative">
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      emailFocused || customerEmail
                        ? "text-white/90"
                        : "text-neutral-400"
                    } ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {emailFocused || customerEmail ? (
                      <>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          4
                        </span>
                        Email Address <span className="text-yellow-400">*</span>
                      </>
                    ) : (
                      "Enter your Email Address"
                    )}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  ref={emailInputRef}
                  type="email"
                  placeholder=""
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  onFocus={() => {
                    setEmailFocused(true);
                    scrollToStep2();
                  }}
                  onBlur={() => {
                    setEmailFocused(false);
                    setEmailBlurred(true);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    emailFocused || customerEmail ? "pt-5" : "pt-3.5"
                  } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    emailBlurred && isEmailValid
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                    poppins.variable
                  }`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    WebkitBoxShadow: "0 0 0 1000px rgb(38, 38, 38) inset",
                    WebkitTextFillColor: "#ffffff",
                    caretColor: "#ffffff",
                  }}
                  onClick={scrollToStep2}
                  spellCheck={false}
                  autoComplete="email"
                />
                {emailBlurred && isEmailValid && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Installation Town */}
            <div className="mb-6 relative">
              {/* Floating Label */}
              <div
                className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                  townFocused || showTownDropdown || installationTown
                    ? "top-0 transform -translate-y-1/2"
                    : "top-1/2 transform -translate-y-1/2"
                }`}
                style={{ zIndex: 30 }}
              >
                {/* Border cut background */}
                {(townFocused || showTownDropdown || installationTown) && (
                  <div
                    className="absolute left-0"
                    style={{
                      top: "50%",
                      background: "rgb(38, 38, 38)",
                      height: "2px",
                      width: "calc(100% + 4px)",
                      marginLeft: "-4px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                )}
                {/* Label text */}
                <div className="px-1.5 relative">
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      townFocused || showTownDropdown || installationTown
                        ? "text-white/90"
                        : "text-neutral-400"
                    } ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {townFocused || showTownDropdown || installationTown ? (
                      <>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          5
                        </span>
                        Installation Town{" "}
                        <span className="text-yellow-400">*</span>
                      </>
                    ) : (
                      "Enter your Installation Town"
                    )}
                  </span>
                </div>
              </div>
              <div className="relative">
                <button
                  ref={townButtonRef}
                  type="button"
                  onClick={() => {
                    setShowTownDropdown(!showTownDropdown);
                    setTownFocused(true);
                    scrollToStep2();
                  }}
                  onFocus={() => {
                    setTownFocused(true);
                  }}
                  onBlur={() => {
                    setTownFocused(false);
                    setTimeout(() => setTownBlurred(true), 200);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    townFocused || showTownDropdown || installationTown
                      ? "pt-5"
                      : "pt-3.5"
                  } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    townBlurred && isTownValid
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-left text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                    poppins.variable
                  } ${!installationTown ? "text-neutral-300" : ""}`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    minHeight:
                      townFocused || showTownDropdown || installationTown
                        ? "56px"
                        : "48px",
                  }}
                >
                  <span className="block truncate">
                    {installationTown || ""}
                  </span>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {townBlurred && isTownValid ? (
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-neutral-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                </button>
                {showTownDropdown && (
                  <div
                    ref={townDropdownRef}
                    className="absolute z-50 w-full bottom-full mb-1 bg-neutral-900/95 backdrop-blur-sm border-2 border-neutral-800/50 rounded-lg shadow-lg max-h-60 overflow-auto"
                    style={{
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {townOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setInstallationTown(option);
                          setInstallationLocation(""); // Reset installation location when town changes
                          setIsInstallationLocationOther(false);
                          setShowTownDropdown(false);
                          setTownBlurred(true);
                        }}
                        className={`w-full px-4 py-3 text-left text-white hover:bg-neutral-800/50 transition-colors ${
                          poppins.variable
                        } ${
                          installationTown === option
                            ? "bg-neutral-800/70 text-yellow-400"
                            : ""
                        }`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {installationTown === option && (
                            <svg
                              className="w-5 h-5 text-yellow-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Installation Location - Only show after town is selected */}
            {installationTown && (
              <div className="mb-6 relative">
                {/* Connecting line from Installation Town */}
                <div
                  className="absolute left-3 top-0 w-0.5 bg-yellow-400/60"
                  style={{
                    height: "20px",
                    transform: "translateY(-20px)",
                    zIndex: 0,
                  }}
                />
                {/* Floating Label */}
                <div
                  className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                    installationLocationFocused ||
                    showInstallationLocationDropdown ||
                    installationLocation
                      ? "top-0 transform -translate-y-1/2"
                      : "top-1/2 transform -translate-y-1/2"
                  }`}
                  style={{ zIndex: 30 }}
                >
                  {/* Border cut background */}
                  {(installationLocationFocused ||
                    showInstallationLocationDropdown ||
                    installationLocation) && (
                    <div
                      className="absolute left-0"
                      style={{
                        top: "50%",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                  )}
                  {/* Label text */}
                  <div className="px-1.5 relative">
                    <span
                      className={`text-xs font-medium transition-all duration-300 ${
                        installationLocationFocused ||
                        showInstallationLocationDropdown ||
                        installationLocation
                          ? "text-white/90"
                          : "text-neutral-400"
                      } ${poppins.variable}`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                    >
                      {installationLocationFocused ||
                      showInstallationLocationDropdown ||
                      installationLocation ? (
                        <>
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                            6
                          </span>
                          Installation Location{" "}
                          <span className="text-yellow-400">*</span>
                        </>
                      ) : (
                        "Select Installation Location"
                      )}
                    </span>
                  </div>
                </div>
                <div
                  className="relative"
                  style={{
                    zIndex: showInstallationLocationDropdown ? 1000 : 1,
                  }}
                >
                  <button
                    ref={installationLocationButtonRef}
                    type="button"
                    onClick={() => {
                      setShowInstallationLocationDropdown(
                        !showInstallationLocationDropdown
                      );
                      setInstallationLocationFocused(true);
                      scrollToStep2();
                    }}
                    onFocus={() => {
                      setInstallationLocationFocused(true);
                    }}
                    onBlur={() => {
                      setInstallationLocationFocused(false);
                      setTimeout(
                        () => setInstallationLocationBlurred(true),
                        200
                      );
                    }}
                    className={`w-full px-3 py-3.5 ${
                      installationLocationFocused ||
                      showInstallationLocationDropdown ||
                      installationLocation
                        ? "pt-5"
                        : "pt-3.5"
                    } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                      installationLocationBlurred && isInstallationLocationValid
                        ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                        : "border-neutral-800/50"
                    } text-left text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                      poppins.variable
                    } ${!installationLocation ? "text-neutral-300" : ""}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                      minHeight:
                        installationLocationFocused ||
                        showInstallationLocationDropdown ||
                        installationLocation
                          ? "56px"
                          : "48px",
                    }}
                  >
                    <span className="block truncate">
                      {installationLocationFocused ||
                      showInstallationLocationDropdown ||
                      installationLocation
                        ? installationLocation || ""
                        : ""}
                    </span>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {installationLocationBlurred &&
                      isInstallationLocationValid ? (
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-neutral-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                  {showInstallationLocationDropdown &&
                    installationLocationOptions.length > 0 && (
                      <div
                        ref={installationLocationDropdownRef}
                        className="installation-location-dropdown-opaque absolute w-full bottom-full mb-1 rounded-lg max-h-60 overflow-hidden"
                        style={{
                          backgroundColor: "rgb(23, 23, 23)",
                          opacity: 1,
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 1)",
                          backdropFilter: "none",
                          WebkitBackdropFilter: "none",
                          border: "2px solid rgb(64, 64, 64)",
                          isolation: "isolate",
                          position: "absolute",
                          willChange: "transform",
                          zIndex: 1001,
                        }}
                      >
                        <div
                          className="overflow-auto max-h-60"
                          style={{
                            backgroundColor: "rgb(23, 23, 23)",
                          }}
                        >
                          {installationLocationOptions.map((option, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                if (option === "Other") {
                                  setInstallationLocation("");
                                  setIsInstallationLocationOther(true);
                                  setInstallationLocationBlurred(false);
                                  setShowInstallationLocationDropdown(false);
                                  // Set robot message
                                  setRobotMessage(
                                    "We apologise, your location was not listed. Please tell us where you are from. 📍"
                                  );
                                  // Auto-focus the custom input after a delay to open keyboard
                                  // Delay ensures the input is rendered and robot message is set
                                  setTimeout(() => {
                                    installationLocationCustomInputRef.current?.focus();
                                  }, 300);
                                } else {
                                  setInstallationLocation(option);
                                  setIsInstallationLocationOther(false);
                                  setInstallationLocationBlurred(true);
                                  setShowInstallationLocationDropdown(false);
                                }
                              }}
                              className={`w-full px-4 py-3 text-left text-white transition-colors ${
                                poppins.variable
                              } ${
                                installationLocation === option
                                  ? "text-yellow-400"
                                  : ""
                              }`}
                              style={{
                                fontFamily: "var(--font-poppins), sans-serif",
                                backgroundColor:
                                  installationLocation === option
                                    ? "rgb(38, 38, 38)"
                                    : "rgb(23, 23, 23)",
                                opacity: "1",
                              }}
                              onMouseEnter={(e) => {
                                if (installationLocation !== option) {
                                  e.currentTarget.style.backgroundColor =
                                    "rgb(38, 38, 38)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (installationLocation !== option) {
                                  e.currentTarget.style.backgroundColor =
                                    "rgb(23, 23, 23)";
                                  e.currentTarget.style.opacity = "1";
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {installationLocation === option && (
                                  <svg
                                    className="w-5 h-5 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* Installation Location Custom Input - Show when "Other" is selected */}
            {isInstallationLocationOther && (
              <div className="mb-6 relative">
                {/* Connecting line from Installation Location dropdown */}
                <div
                  className="absolute left-3 top-0 w-0.5 bg-yellow-400/60"
                  style={{
                    height: "20px",
                    transform: "translateY(-20px)",
                    zIndex: 0,
                  }}
                />
                {/* Floating Label */}
                <div
                  className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                    installationLocationFocused || installationLocation
                      ? "top-0 transform -translate-y-1/2"
                      : "top-1/2 transform -translate-y-1/2"
                  }`}
                  style={{ zIndex: 30 }}
                >
                  {/* Border cut background */}
                  {(installationLocationFocused || installationLocation) && (
                    <div
                      className="absolute left-0"
                      style={{
                        top: "50%",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                  )}
                  {/* Label text */}
                  <div className="px-1.5 relative">
                    <span
                      className={`text-xs font-medium transition-all duration-300 ${
                        installationLocationFocused || installationLocation
                          ? "text-white/90"
                          : "text-neutral-400"
                      } ${poppins.variable}`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                    >
                      {installationLocationFocused || installationLocation ? (
                        <>
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                            6
                          </span>
                          Installation Location (Custom){" "}
                          <span className="text-yellow-400">*</span>
                        </>
                      ) : (
                        "Enter Installation Location"
                      )}
                    </span>
                  </div>
                </div>
                <input
                  ref={installationLocationCustomInputRef}
                  type="text"
                  placeholder=""
                  value={installationLocation}
                  onChange={(e) => {
                    setInstallationLocation(e.target.value);
                  }}
                  onFocus={() => {
                    setInstallationLocationFocused(true);
                    setInstallationLocationBlurred(false);
                    scrollToStep2();
                  }}
                  onBlur={() => {
                    setInstallationLocationFocused(false);
                    setTimeout(() => setInstallationLocationBlurred(true), 200);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    installationLocationFocused ||
                    (installationLocation && installationLocation !== "Other")
                      ? "pt-5"
                      : "pt-3.5"
                  } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    installationLocationBlurred && isInstallationLocationValid
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-left text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                    poppins.variable
                  } ${
                    !installationLocation || installationLocation === "Other"
                      ? "text-neutral-300"
                      : ""
                  }`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    minHeight:
                      installationLocationFocused ||
                      (installationLocation && installationLocation !== "Other")
                        ? "56px"
                        : "48px",
                    WebkitBoxShadow: "0 0 0 1000px rgb(38, 38, 38) inset",
                    WebkitTextFillColor: "#ffffff",
                    caretColor: "#ffffff",
                  }}
                  spellCheck={false}
                  autoComplete="off"
                />
                {installationLocationBlurred && isInstallationLocationValid && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}

            {/* Specific Delivery Location (Nearest Landmark) */}
            <div className="mb-6 relative">
              {/* Floating Label */}
              <div
                className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                  deliveryLocationFocused || deliveryLocation
                    ? "top-0 transform -translate-y-1/2"
                    : "top-1/2 transform -translate-y-1/2"
                }`}
                style={{ zIndex: 30 }}
              >
                {/* Border cut background */}
                {(deliveryLocationFocused || deliveryLocation) && (
                  <div
                    className="absolute left-0"
                    style={{
                      top: "50%",
                      background: "rgb(38, 38, 38)",
                      height: "2px",
                      width: "calc(100% + 4px)",
                      marginLeft: "-4px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                )}
                {/* Label text */}
                <div className="px-1.5 relative">
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      deliveryLocationFocused || deliveryLocation
                        ? "text-white/90"
                        : "text-neutral-400"
                    } ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {deliveryLocationFocused || deliveryLocation ? (
                      <>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          7
                        </span>
                        Delivery Location (Nearest Landmark){" "}
                        <span className="text-yellow-400">*</span>
                      </>
                    ) : (
                      "Enter your Nearest landmark"
                    )}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  ref={deliveryLocationInputRef}
                  type="text"
                  placeholder=""
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  onFocus={() => {
                    setDeliveryLocationFocused(true);
                    scrollToStep2();
                  }}
                  onBlur={() => {
                    setDeliveryLocationFocused(false);
                    setDeliveryLocationBlurred(true);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    deliveryLocationFocused || deliveryLocation
                      ? "pt-5"
                      : "pt-3.5"
                  } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    showDeliveryLocationCheck
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                    poppins.variable
                  }`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    WebkitBoxShadow: "0 0 0 1000px rgb(38, 38, 38) inset",
                    WebkitTextFillColor: "#ffffff",
                    caretColor: "#ffffff",
                  }}
                  onClick={scrollToStep2}
                  spellCheck={false}
                  autoComplete="off"
                />
                {showDeliveryLocationCheck && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Preferred Date of Visit/Installation */}
            <div className="mb-6 relative">
              {/* Floating Label */}
              <div
                className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                  dateFocused || preferredDate
                    ? "top-0 transform -translate-y-1/2"
                    : "top-1/2 transform -translate-y-1/2"
                }`}
                style={{ zIndex: 30 }}
              >
                {/* Border cut background */}
                {(dateFocused || preferredDate) && (
                  <div
                    className="absolute left-0"
                    style={{
                      top: "50%",
                      background: "rgb(38, 38, 38)",
                      height: "2px",
                      width: "calc(100% + 4px)",
                      marginLeft: "-4px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                )}
                {/* Label text */}
                <div className="px-1.5 relative">
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      dateFocused || preferredDate
                        ? "text-white/90"
                        : "text-neutral-400"
                    } ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {dateFocused || preferredDate ? (
                      <>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          7
                        </span>
                        Preferred Date{" "}
                        <span className="text-yellow-400">*</span>
                      </>
                    ) : (
                      "Enter your Preferred Date"
                    )}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  ref={dateInputRef}
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  onFocus={() => {
                    setDateFocused(true);
                    scrollToStep2();
                  }}
                  onBlur={() => {
                    setDateFocused(false);
                    setPreferredDateBlurred(true);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    dateFocused || preferredDate ? "pt-5" : "pt-3.5"
                  } pr-12 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    showPreferredDateCheck
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 date-input-custom ${
                    poppins.variable
                  } ${!preferredDate ? "date-placeholder" : ""}`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    WebkitBoxShadow: "0 0 0 1000px rgb(38, 38, 38) inset",
                    WebkitTextFillColor: preferredDate
                      ? "#ffffff"
                      : "transparent",
                    caretColor: "#ffffff",
                    colorScheme: "dark",
                  }}
                  onClick={scrollToStep2}
                />
                {/* Calendar icon indicator - shown when no date is selected */}
                {!preferredDate && !showPreferredDateCheck && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-yellow-400/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                {showPreferredDateCheck && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Preferred Time of Visit/Installation */}
            <div className="mb-6 relative">
              {/* Floating Label */}
              <div
                className={`absolute left-3 pointer-events-none transition-all duration-300 ${
                  timeFocused || showTimeDropdown || preferredTime
                    ? "top-0 transform -translate-y-1/2"
                    : "top-1/2 transform -translate-y-1/2"
                }`}
                style={{ zIndex: 30 }}
              >
                {/* Border cut background */}
                {(timeFocused || showTimeDropdown || preferredTime) && (
                  <div
                    className="absolute left-0"
                    style={{
                      top: "50%",
                      background: "rgb(38, 38, 38)",
                      height: "2px",
                      width: "calc(100% + 4px)",
                      marginLeft: "-4px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                )}
                {/* Label text */}
                <div className="px-1.5 relative">
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      timeFocused || showTimeDropdown || preferredTime
                        ? "text-white/90"
                        : "text-neutral-400"
                    } ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {timeFocused || showTimeDropdown || preferredTime ? (
                      <>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          9
                        </span>
                        Preferred Time{" "}
                        <span className="text-yellow-400">*</span>
                      </>
                    ) : (
                      "Enter your Preferred Time"
                    )}
                  </span>
                </div>
              </div>
              <div className="relative">
                <button
                  ref={timeButtonRef}
                  type="button"
                  onClick={() => {
                    setShowTimeDropdown(!showTimeDropdown);
                    setTimeFocused(true);
                    scrollToStep2();
                  }}
                  onFocus={() => {
                    setTimeFocused(true);
                  }}
                  onBlur={() => {
                    setTimeFocused(false);
                    // Delay to allow option click
                    setTimeout(() => setPreferredTimeBlurred(true), 200);
                  }}
                  className={`w-full px-3 py-3.5 ${
                    timeFocused || showTimeDropdown || preferredTime
                      ? "pt-5"
                      : "pt-3.5"
                  } pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                    showPreferredTimeCheck
                      ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "border-neutral-800/50"
                  } text-left text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                    poppins.variable
                  } ${!preferredTime ? "text-neutral-300" : ""}`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    minHeight:
                      timeFocused || showTimeDropdown || preferredTime
                        ? "56px"
                        : "48px",
                  }}
                >
                  <span className="block truncate">{preferredTime || ""}</span>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {showPreferredTimeCheck ? (
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-neutral-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                </button>
                {showTimeDropdown && (
                  <div
                    ref={timeDropdownRef}
                    className="absolute z-50 w-full bottom-full mb-1 bg-neutral-900/95 backdrop-blur-sm border-2 border-neutral-800/50 rounded-lg shadow-lg max-h-60 overflow-auto"
                    style={{
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {timeOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setPreferredTime(option);
                          setShowTimeDropdown(false);
                          setPreferredTimeBlurred(true);
                        }}
                        className={`w-full px-4 py-3 text-left text-white hover:bg-neutral-800/50 transition-colors ${
                          poppins.variable
                        } ${
                          preferredTime === option
                            ? "bg-neutral-800/70 text-yellow-400"
                            : ""
                        }`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {preferredTime === option && (
                            <svg
                              className="w-5 h-5 text-yellow-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mb-4 mt-6">
              {submitStatus.state === "error" && (
                <div className="mb-4 rounded-lg bg-rose-900/50 border border-rose-500/50 p-3">
                  <p className="text-sm font-medium text-rose-200">
                    {submitStatus.message}
                  </p>
                </div>
              )}
              {submitStatus.state === "success" && (
                <div className="mb-4 rounded-lg bg-emerald-900/50 border border-emerald-500/50 p-3">
                  <p className="text-sm font-medium text-emerald-200">
                    ✓ {submitStatus.message}
                  </p>
                </div>
              )}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                onClick={async () => {
                  if (
                    !(nameBlurred && isNameValid) ||
                    !(phoneBlurred && isPhoneValid) ||
                    !(alternativeBlurred && isAlternativeValid) ||
                    !(emailBlurred && isEmailValid) ||
                    !(townBlurred && isTownValid) ||
                    !(deliveryLocationBlurred && isDeliveryLocationValid) ||
                    !(preferredDateBlurred && isPreferredDateValid) ||
                    !(preferredTimeBlurred && isPreferredTimeValid) ||
                    !selectedPackage
                  ) {
                    return;
                  }

                  setIsSubmitting(true);
                  setSubmitStatus({ state: "idle", message: "" });

                  try {
                    const response = await fetch("/api/submit", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        customerName: customerName.trim(),
                        airtelNumber: customerPhone,
                        alternateNumber: customerAlternativeNumber,
                        email: customerEmail.trim(),
                        preferredPackage: selectedPackage,
                        installationTown: installationTown,
                        deliveryLandmark: deliveryLocation.trim(),
                        installationLocation: installationLocation,
                        visitDate: preferredDate,
                        visitTime: preferredTime,
                      }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                      // If data was saved to database but Microsoft Forms failed
                      if (data.savedToDatabase) {
                        const errorMsg = `Your information was saved, but there was an issue submitting to our system. Our team will process it manually. Reference: ${
                          data.leadId || "saved"
                        }`;
                        setSubmitStatus({
                          state: "error",
                          message: errorMsg,
                        });
                        setRobotMessage(
                          "✅ Your info was saved! Our team will process it manually."
                        );
                        // Reset form since data is saved
                        setCustomerName("");
                        setCustomerPhone("");
                        setCustomerAlternativeNumber("");
                        setCustomerEmail("");
                        setInstallationTown("");
                        setDeliveryLocation("");
                        setInstallationLocation("");
                        setIsInstallationLocationOther(false);
                        setPreferredDate("");
                        setPreferredTime("");
                        setNameBlurred(false);
                        setPhoneBlurred(false);
                        setAlternativeBlurred(false);
                        setEmailBlurred(false);
                        setTownBlurred(false);
                        setDeliveryLocationBlurred(false);
                        setPreferredDateBlurred(false);
                        setPreferredTimeBlurred(false);
                        setIsSubmitting(false);
                        return;
                      }
                      // Otherwise, throw the error
                      throw new Error(
                        data.error || data.details || "Failed to submit form"
                      );
                    }

                    setSubmitStatus({
                      state: "success",
                      message:
                        "Form submitted successfully! We'll contact you soon.",
                    });
                    setRobotMessage(
                      "🎉 Success! Your request has been submitted! We'll contact you soon!"
                    );

                    // Track Google Ads conversion
                    if (typeof window !== "undefined" && (window as any).gtag) {
                      (window as any).gtag(
                        "event",
                        "ads_conversion_Contact_1",
                        {
                          event_category: "conversion",
                          event_label: "Form Submission",
                        }
                      );
                    }

                    // Reset form after successful submission
                    setCustomerName("");
                    setCustomerPhone("");
                    setCustomerAlternativeNumber("");
                    setCustomerEmail("");
                    setInstallationTown("");
                    setDeliveryLocation("");
                    setPreferredDate("");
                    setPreferredTime("");
                    setNameBlurred(false);
                    setPhoneBlurred(false);
                    setAlternativeBlurred(false);
                    setEmailBlurred(false);
                    setTownBlurred(false);
                    setDeliveryLocationBlurred(false);
                    setPreferredDateBlurred(false);
                    setPreferredTimeBlurred(false);
                  } catch (error) {
                    const errorMessage =
                      error instanceof Error
                        ? error.message
                        : "An error occurred. Please try again.";
                    setSubmitStatus({
                      state: "error",
                      message: errorMessage,
                    });
                    setRobotMessage(
                      "❌ Something went wrong. Please try again."
                    );
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={
                  isSubmitting ||
                  !(nameBlurred && isNameValid) ||
                  !(phoneBlurred && isPhoneValid) ||
                  !(alternativeBlurred && isAlternativeValid) ||
                  !(emailBlurred && isEmailValid) ||
                  !(townBlurred && isTownValid) ||
                  !(deliveryLocationBlurred && isDeliveryLocationValid) ||
                  !(preferredDateBlurred && isPreferredDateValid) ||
                  !(preferredTimeBlurred && isPreferredTimeValid) ||
                  !selectedPackage
                }
                className={`w-full py-4 px-6 rounded-lg font-semibold text-base transition-all duration-300 ${
                  poppins.variable
                } ${
                  !isSubmitting &&
                  nameBlurred &&
                  isNameValid &&
                  phoneBlurred &&
                  isPhoneValid &&
                  alternativeBlurred &&
                  isAlternativeValid &&
                  emailBlurred &&
                  isEmailValid &&
                  townBlurred &&
                  isTownValid &&
                  deliveryLocationBlurred &&
                  isDeliveryLocationValid &&
                  installationLocationBlurred &&
                  isInstallationLocationValid &&
                  preferredDateBlurred &&
                  isPreferredDateValid &&
                  preferredTimeBlurred &&
                  isPreferredTimeValid &&
                  selectedPackage
                    ? "bg-yellow-400 hover:bg-yellow-500 text-neutral-50 shadow-[0_0_20px_rgba(251,191,36,0.4)] active:scale-95"
                    : "bg-neutral-800 text-neutral-300 cursor-not-allowed opacity-50"
                }`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Spacer to ensure enough content for scrolling */}
        <div style={{ minHeight: "10vh" }}></div>
      </motion.div>
    </>
  );
}
