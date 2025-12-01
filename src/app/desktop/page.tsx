"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCarousel from "../mobile/ProductCarousel";
import PricingCards from "../components/PricingCards";
import { usePackage } from "../contexts/PackageContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function TestDesktopPage() {
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
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [nameBlurred, setNameBlurred] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  const [alternativeBlurred, setAlternativeBlurred] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [townBlurred, setTownBlurred] = useState(false);
  const [deliveryLocationBlurred, setDeliveryLocationBlurred] = useState(false);
  const [preferredDateBlurred, setPreferredDateBlurred] = useState(false);
  const [preferredTimeBlurred, setPreferredTimeBlurred] = useState(false);
  const [showTownDropdown, setShowTownDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const townDropdownRef = useRef<HTMLDivElement>(null);
  const townButtonRef = useRef<HTMLButtonElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const timeButtonRef = useRef<HTMLButtonElement>(null);
  const [robotMessage, setRobotMessage] = useState("");
  const [robotVisible, setRobotVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [previousPackage, setPreviousPackage] = useState<string | null>(null);
  const [robotBottom, setRobotBottom] = useState("1rem");
  const [robotTop, setRobotTop] = useState<string | null>(null);
  const [viewportScrollOffset, setViewportScrollOffset] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
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
  const isPreferredDateValid = preferredDate.trim().length > 0;
  const isPreferredTimeValid = preferredTime.trim().length > 0;

  // Town options for dropdown (Kenyan towns)
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
    "Lamu",
    "Other",
  ];

  // Time options (1 hour apart)
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

  // Track user interaction for audio autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
    };

    // Listen for any user interaction
    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    });
    document.addEventListener("keydown", handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
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
    }
  };

  // Helper function to play new audio
  const playNewAudio = async (cleanText: string) => {
    try {
      // Call TTS API
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: cleanText }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("TTS API Error:", error);
        // Only use Google Cloud TTS - no fallback
        return;
      }

      const data = await response.json();

      // Create audio element and play
      const audio = new Audio(`data:audio/${data.format};base64,${data.audio}`);
      audioRef.current = audio;

      audio.play().catch((error) => {
        console.error("Audio play error:", error);
        // Only use Google Cloud TTS - no fallback
      });
    } catch (error) {
      console.error("TTS Error:", error);
      // Only use Google Cloud TTS - no fallback
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
      if (nameInputRef.current && customerName && isNameValid && !nameBlurred) {
        setNameBlurred(true);
      }
      if (
        phoneInputRef.current &&
        customerPhone &&
        isPhoneValid &&
        !phoneBlurred
      ) {
        setPhoneBlurred(true);
      }
      if (
        alternativeInputRef.current &&
        customerAlternativeNumber &&
        isAlternativeValid &&
        !alternativeBlurred
      ) {
        setAlternativeBlurred(true);
      }
      if (
        emailInputRef.current &&
        customerEmail &&
        isEmailValid &&
        !emailBlurred
      ) {
        setEmailBlurred(true);
      }
      if (
        deliveryLocationInputRef.current &&
        deliveryLocation &&
        isDeliveryLocationValid &&
        !deliveryLocationBlurred
      ) {
        setDeliveryLocationBlurred(true);
      }
      if (
        dateInputRef.current &&
        preferredDate &&
        isPreferredDateValid &&
        !preferredDateBlurred
      ) {
        setPreferredDateBlurred(true);
      }
    };

    const interval = setInterval(checkAutofill, 100);
    window.addEventListener("focus", checkAutofill);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", checkAutofill);
    };
  }, [
    customerName,
    customerPhone,
    customerAlternativeNumber,
    customerEmail,
    deliveryLocation,
    preferredDate,
    isNameValid,
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

  const showNameCheck = nameBlurred && isNameValid;
  const showPhoneCheck = phoneBlurred && isPhoneValid;
  const showAlternativeCheck = alternativeBlurred && isAlternativeValid;
  const showEmailCheck = emailBlurred && isEmailValid;
  const showTownCheck = townBlurred && isTownValid;
  const showDeliveryLocationCheck =
    deliveryLocationBlurred && isDeliveryLocationValid;
  const showPreferredDateCheck = preferredDateBlurred && isPreferredDateValid;
  const showPreferredTimeCheck = preferredTimeBlurred && isPreferredTimeValid;

  return (
    <motion.div
      className="min-h-screen bg-neutral-950 overflow-y-auto h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop Layout: Product Left, Form Right */}
      <div className="grid grid-cols-2 gap-0  min-h-full">
        {/* Left Side - Product Display */}
        <div className="col-span-1 flex justify-center pt-1 px-8 pb-8 bg-neutral-900/50">
          <div className="w-full max-w-lg">
            {/* Product Image */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src="/desktopimg.png"
                alt="Airtel 5G Smart Connect - Outdoor Unit"
                className="w-full h-auto object-contain rounded-lg"
                style={{ maxHeight: "40vh" }}
              />
            </div>

            {/* Product Title */}
            <h2
              className={`text-2xl font-bold mb-6 text-center ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              5G Smart Connect - Outdoor Unit
            </h2>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/60 border border-yellow-400/20">
                <svg
                  className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p
                    className={`text-white font-semibold ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    Weather-Resistant Design
                  </p>
                  <p
                    className={`text-sm text-neutral-200 mt-1 ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    Built to perform reliably in all conditions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/60 border border-yellow-400/20">
                <svg
                  className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p
                    className={`text-white font-semibold ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    High-Gain Antenna
                  </p>
                  <p
                    className={`text-sm text-neutral-200 mt-1 ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    Offers strong and consistent indoor coverage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/60 border border-yellow-400/20">
                <svg
                  className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p
                    className={`text-white font-semibold ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    Signal Amplification
                  </p>
                  <p
                    className={`text-sm text-neutral-200 mt-1 ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    Enhances signal strength to ensure stable and uninterrupted
                    connectivity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/60 border border-yellow-400/20">
                <svg
                  className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p
                    className={`text-white font-semibold ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    Flexible Mounting Options
                  </p>
                  <p
                    className={`text-sm text-neutral-200 mt-1 ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    Easily install on walls, poles, or rooftops to suit your
                    setup and location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Sections */}
        <div className="col-span-1">
          {/* Header - Desktop Only */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/50">
            {/* Title on the left */}
            <div className="flex items-center gap-2">
              <span
                className="text-base font-bold"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
                }}
              >
                Airtel
              </span>
              <div className="h-4 w-px bg-neutral-700 mx-1" />
              <span
                className="text-sm font-bold tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.05em",
                  textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
                }}
              >
                SmartConnect
              </span>
            </div>

            {/* Phone number on the right */}
            <a
              href="tel:0789457580"
              className="flex items-center gap-1.5 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))",
                }}
              >
                <defs>
                  <linearGradient
                    id="phoneGradientDesktop"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <path
                  stroke="url(#phoneGradientDesktop)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span
                className="text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
                }}
              >
                0789457580
              </span>
            </a>
          </div>

          {/* How to Order Section - One Line */}
          <section className="px-6 py-3">
            <div className="w-full">
              <div className="text-center mb-3">
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
                  How to Order
                </h2>
                {/* All 3 steps in one line */}
                <div className="flex gap-4 rounded-lg bg-neutral-900/60 backdrop-blur-sm border border-yellow-400/30 p-4">
                  {/* Step 1 */}
                  <div className="flex-1 flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <span className="text-yellow-400 text-sm font-bold">
                        1
                      </span>
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

                  {/* Step 2 */}
                  <div className="flex-1 flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <span className="text-yellow-400 text-sm font-bold">
                        2
                      </span>
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

                  {/* Step 3 */}
                  <div className="flex-1 flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <span className="text-yellow-400 text-sm font-bold">
                        3
                      </span>
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
            </div>
          </section>

          {/* Step 1: Choose Your Package */}
          <section className="px-6 py-3" style={{ marginTop: "0" }}>
            <div className="w-full">
              <div className="text-center mb-3">
                <h2
                  className={`text-lg font-semibold text-white mb-1 ${poppins.variable}`}
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
          </section>

          {/* Step 2: Almost There */}
          <section id="step-2" ref={step2Ref} className="px-6 py-3">
            <div className="w-full">
              <div className="text-center mb-3">
                <h2
                  className={`text-lg font-semibold text-white mb-1 ${poppins.variable}`}
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

              {/* Form Fields - Desktop: 2 columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Full Name - Full Width */}
                <div className="mb-4 relative col-span-2">
                  <div
                    className="absolute left-3 pointer-events-none"
                    style={{ zIndex: 30, top: "-2px" }}
                  >
                    <div
                      className="absolute left-0"
                      style={{
                        top: "2px",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                    <div
                      className="px-1.5 relative"
                      style={{ top: "-50%", transform: "translateY(-50%)" }}
                    >
                      <span
                        className={`text-xs font-medium text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          1
                        </span>
                        Full Name <span className="text-yellow-400">*</span>
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
                      className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                        showNameCheck
                          ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                          : "border-neutral-800/50"
                      } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                        poppins.variable
                      }`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                      onBlur={() => setNameBlurred(true)}
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

                {/* Airtel Number */}
                <div className="mb-4 relative">
                  <div
                    className="absolute left-3 pointer-events-none"
                    style={{ zIndex: 30, top: "-2px" }}
                  >
                    <div
                      className="absolute left-0"
                      style={{
                        top: "2px",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                    <div
                      className="px-1.5 relative"
                      style={{ top: "-50%", transform: "translateY(-50%)" }}
                    >
                      <span
                        className={`text-xs font-medium text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          2
                        </span>
                        Airtel Number <span className="text-yellow-400">*</span>
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
                      className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                        showPhoneCheck
                          ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                          : "border-neutral-800/50"
                      } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                        poppins.variable
                      }`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                      onBlur={() => setPhoneBlurred(true)}
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

                {/* Alternative Number */}
                <div className="mb-4 relative">
                  <div
                    className="absolute left-3 pointer-events-none"
                    style={{ zIndex: 30, top: "-2px" }}
                  >
                    <div
                      className="absolute left-0"
                      style={{
                        top: "2px",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                    <div
                      className="px-1.5 relative"
                      style={{ top: "-50%", transform: "translateY(-50%)" }}
                    >
                      <span
                        className={`text-xs font-medium text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          3
                        </span>
                        Alternative Number{" "}
                        <span className="text-yellow-400">*</span>
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder=""
                      value={customerAlternativeNumber}
                      onChange={(e) =>
                        setCustomerAlternativeNumber(e.target.value)
                      }
                      className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                        showAlternativeCheck
                          ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                          : "border-neutral-800/50"
                      } text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                        poppins.variable
                      }`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                      onBlur={() => setAlternativeBlurred(true)}
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

                {/* Email Address */}
                <div className="mb-4 relative">
                  <div
                    className="absolute left-3 pointer-events-none"
                    style={{ zIndex: 30, top: "-2px" }}
                  >
                    <div
                      className="absolute left-0"
                      style={{
                        top: "2px",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                    <div
                      className="px-1.5 relative"
                      style={{ top: "-50%", transform: "translateY(-50%)" }}
                    >
                      <span
                        className={`text-xs font-medium text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          4
                        </span>
                        Email Address <span className="text-yellow-400">*</span>
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
                      className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                        showEmailCheck
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
                      onBlur={() => setEmailBlurred(true)}
                      spellCheck={false}
                      autoComplete="email"
                    />
                    {showEmailCheck && (
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

                {/* Installation Town */}
                <div className="mb-4 relative">
                  <div
                    className="absolute left-3 pointer-events-none"
                    style={{ zIndex: 30, top: "-2px" }}
                  >
                    <div
                      className="absolute left-0"
                      style={{
                        top: "2px",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                    <div
                      className="px-1.5 relative"
                      style={{ top: "-50%", transform: "translateY(-50%)" }}
                    >
                      <span
                        className={`text-xs font-medium text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          5
                        </span>
                        Installation Town{" "}
                        <span className="text-yellow-400">*</span>
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      ref={townButtonRef}
                      type="button"
                      onClick={() => {
                        setShowTownDropdown(!showTownDropdown);
                      }}
                      onBlur={() => {
                        setTimeout(() => setTownBlurred(true), 200);
                      }}
                      className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                        showTownCheck
                          ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                          : "border-neutral-800/50"
                      } text-left text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                        poppins.variable
                      } ${!installationTown ? "text-neutral-300" : ""}`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                    >
                      <span className="block truncate">
                        {installationTown || "Select installation town"}
                      </span>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        {showTownCheck ? (
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

                {/* Delivery Location - Full Width */}
                <div className="mb-4 relative col-span-2">
                  <div
                    className="absolute left-3 pointer-events-none"
                    style={{ zIndex: 30, top: "-2px" }}
                  >
                    <div
                      className="absolute left-0"
                      style={{
                        top: "2px",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                    <div
                      className="px-1.5 relative"
                      style={{ top: "-50%", transform: "translateY(-50%)" }}
                    >
                      <span
                        className={`text-xs font-medium text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          6
                        </span>
                        Delivery Location (Nearest Landmark){" "}
                        <span className="text-yellow-400">*</span>
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
                      className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
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
                      onBlur={() => setDeliveryLocationBlurred(true)}
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

                {/* Preferred Date */}
                <div className="mb-4 relative">
                  <div
                    className="absolute left-3 pointer-events-none"
                    style={{ zIndex: 30, top: "-2px" }}
                  >
                    <div
                      className="absolute left-0"
                      style={{
                        top: "2px",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                    <div
                      className="px-1.5 relative"
                      style={{ top: "-50%", transform: "translateY(-50%)" }}
                    >
                      <span
                        className={`text-xs font-medium text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          7
                        </span>
                        Preferred Date{" "}
                        <span className="text-yellow-400">*</span>
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
                      className={`w-full px-3 py-2.5 pt-4 pr-12 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
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
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 1,
                      }}
                      onClick={(e) => {
                        // Ensure the date picker opens
                        if (e.currentTarget.showPicker) {
                          e.currentTarget.showPicker();
                        }
                      }}
                      onBlur={() => setPreferredDateBlurred(true)}
                    />
                    {!preferredDate && (
                      <div
                        className="absolute left-4 pointer-events-none flex items-center"
                        style={{
                          top: "50%",
                          transform: "translateY(-50%)",
                          height: "100%",
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="text-xs text-neutral-300">
                          Select date
                        </span>
                      </div>
                    )}
                    {/* Calendar icon indicator - clickable to open date picker */}
                    {!preferredDate && !showPreferredDateCheck && (
                      <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          dateInputRef.current?.showPicker?.() ||
                          dateInputRef.current?.click()
                        }
                        style={{ zIndex: 20 }}
                      >
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

                {/* Preferred Time */}
                <div className="mb-4 relative">
                  <div
                    className="absolute left-3 pointer-events-none"
                    style={{ zIndex: 30, top: "-2px" }}
                  >
                    <div
                      className="absolute left-0"
                      style={{
                        top: "2px",
                        background: "rgb(38, 38, 38)",
                        height: "2px",
                        width: "calc(100% + 4px)",
                        marginLeft: "-4px",
                        borderTopLeftRadius: "8px",
                      }}
                    />
                    <div
                      className="px-1.5 relative"
                      style={{ top: "-50%", transform: "translateY(-50%)" }}
                    >
                      <span
                        className={`text-xs font-medium text-white/90 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mr-2">
                          8
                        </span>
                        Preferred Time{" "}
                        <span className="text-yellow-400">*</span>
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      ref={timeButtonRef}
                      type="button"
                      onClick={() => {
                        setShowTimeDropdown(!showTimeDropdown);
                      }}
                      onBlur={() => {
                        setTimeout(() => setPreferredTimeBlurred(true), 200);
                      }}
                      className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 text-sm ${
                        showPreferredTimeCheck
                          ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                          : "border-neutral-800/50"
                      } text-left text-white placeholder:text-neutral-300 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                        poppins.variable
                      } ${!preferredTime ? "text-neutral-300" : ""}`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                    >
                      <span className="block truncate">
                        {preferredTime || "Select preferred time"}
                      </span>
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
              </div>
              {/* End of Form Fields Grid */}

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
                <button
                  type="button"
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
                          visitDate: preferredDate,
                          visitTime: preferredTime,
                        }),
                      });

                      const data = await response.json();

                      if (!response.ok) {
                        if (data.savedToDatabase) {
                          const errorMsg = `Your information was saved, but there was an issue submitting to our system. Our team will process it manually. Reference: ${
                            data.leadId || "saved"
                          }`;
                          setSubmitStatus({
                            state: "error",
                            message: errorMsg,
                          });
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
                          setIsSubmitting(false);
                          return;
                        }
                        throw new Error(
                          data.error || data.details || "Failed to submit form"
                        );
                      }

                      setSubmitStatus({
                        state: "success",
                        message:
                          "Form submitted successfully! We'll contact you soon.",
                      });

                      // Track Google Ads conversion
                      if (
                        typeof window !== "undefined" &&
                        (window as any).gtag
                      ) {
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
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
