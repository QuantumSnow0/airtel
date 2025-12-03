"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCarousel from "./ProductCarousel";
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
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [alternativeFocused, setAlternativeFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [townFocused, setTownFocused] = useState(false);
  const [deliveryLocationFocused, setDeliveryLocationFocused] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [timeFocused, setTimeFocused] = useState(false);
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
  // Track all completed lines (permanent connections)
  const [completedLines, setCompletedLines] = useState<
    Array<{
      fromField: string;
      toField: string;
      fromPosition: { x: number; y: number };
      toPosition: { x: number; y: number };
    }>
  >([]);

  // Track current active animation (border effect)
  const [flowAnimation, setFlowAnimation] = useState<{
    active: boolean;
    toFieldRect: DOMRect | null;
  }>({
    active: false,
    toFieldRect: null,
  });

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

  // Function to get field ref by name
  const getFieldRef = (fieldName: string): HTMLElement | null => {
    switch (fieldName) {
      case "name":
        return nameInputRef.current;
      case "phone":
        return phoneInputRef.current;
      case "alternative":
        return alternativeInputRef.current;
      case "email":
        return emailInputRef.current;
      case "town":
        return townButtonRef.current;
      case "deliveryLocation":
        return deliveryLocationInputRef.current;
      case "date":
        return dateInputRef.current;
      case "time":
        return timeButtonRef.current;
      default:
        return null;
    }
  };

  // Function to recalculate all line positions (for scroll/resize)
  const recalculateLinePositions = () => {
    setCompletedLines((prevLines) => {
      return prevLines.map((line) => {
        const fromElement = getFieldRef(line.fromField);
        const toElement = getFieldRef(line.toField);

        if (fromElement && toElement) {
          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();

          return {
            ...line,
            fromPosition: {
              x: fromRect.left + fromRect.width / 2,
              y: fromRect.bottom,
            },
            toPosition: {
              x: toRect.left + toRect.width / 2,
              y: toRect.top,
            },
          };
        }
        return line;
      });
    });
  };

  // Update line positions on scroll and resize
  useEffect(() => {
    if (completedLines.length === 0) return;

    const handleScroll = () => {
      recalculateLinePositions();
    };

    const handleResize = () => {
      recalculateLinePositions();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [completedLines.length]); // Re-run when lines are added

  // Function to trigger flow animation from previous field to current field
  const triggerFlowAnimation = (currentField: string) => {
    const fieldOrder = [
      "name",
      "phone",
      "alternative",
      "email",
      "town",
      "deliveryLocation",
      "date",
      "time",
    ];
    const currentIndex = fieldOrder.indexOf(currentField);

    if (currentIndex > 0) {
      const previousField = fieldOrder[currentIndex - 1];
      let previousValid = false;

      switch (previousField) {
        case "name":
          previousValid = isNameValid && nameBlurred;
          break;
        case "phone":
          previousValid = isPhoneValid && phoneBlurred;
          break;
        case "alternative":
          previousValid = isAlternativeValid && alternativeBlurred;
          break;
        case "email":
          previousValid = isEmailValid && emailBlurred;
          break;
        case "town":
          previousValid = isTownValid && townBlurred;
          break;
        case "deliveryLocation":
          previousValid = isDeliveryLocationValid && deliveryLocationBlurred;
          break;
        case "date":
          previousValid = isPreferredDateValid && preferredDateBlurred;
          break;
      }

      if (previousValid) {
        const fromElement = getFieldRef(previousField);
        const toElement = getFieldRef(currentField);

        if (fromElement && toElement) {
          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();

          // Calculate positions: bottom center of previous, top center of next
          const fromPosition = {
            x: fromRect.left + fromRect.width / 2,
            y: fromRect.bottom,
          };
          const toPosition = {
            x: toRect.left + toRect.width / 2,
            y: toRect.top,
          };

          console.log("Flow animation triggered:", {
            from: previousField,
            to: currentField,
            fromPosition,
            toPosition,
          });

          // Check if this line already exists
          const lineExists = completedLines.some(
            (line) =>
              line.fromField === previousField && line.toField === currentField
          );

          // Add line to completed lines if it doesn't exist
          if (!lineExists) {
            setCompletedLines((prev) => [
              ...prev,
              {
                fromField: previousField,
                toField: currentField,
                fromPosition,
                toPosition,
              },
            ]);
          }

          // Trigger border animation
          setFlowAnimation({
            active: true,
            toFieldRect: toRect,
          });

          // Reset border animation after it completes
          setTimeout(() => {
            setFlowAnimation({
              active: false,
              toFieldRect: null,
            });
          }, 2000);
        }
      }
    }
  };

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
    } else if (deliveryLocation.trim().length > 0 && !deliveryLocationBlurred) {
      if (!isDeliveryLocationValid) {
        const locationTypingMessages = [
          "Tell me about a nearby landmark! 🗺️",
          "Keep typing! Describe the location! 📍",
          "Almost there! Add more details about the location! 🏠",
        ];
        const randomMessage =
          locationTypingMessages[
            Math.floor(Math.random() * locationTypingMessages.length)
          ];
        setRobotMessage(randomMessage);
      } else {
        setRobotMessage("Perfect! That location sounds clear! ✅");
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
        "Please provide a more detailed location (at least 5 characters)! 🗺️",
        "We need a clearer location description. Add more details! 📍",
        "The location seems too short. Please add more information! 🏠",
      ];
      const randomMessage =
        locationErrors[Math.floor(Math.random() * locationErrors.length)];
      setRobotMessage(randomMessage);
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
  const showPreferredDateCheck = preferredDateBlurred && isPreferredDateValid;
  const showPreferredTimeCheck = preferredTimeBlurred && isPreferredTimeValid;

  return (
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
                width: "86px",
                height: "86px",
                minWidth: "86px",
                minHeight: "86px",
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
                  width: "106px",
                  height: "106px",
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
                className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-neutral-900/90 border-2 border-yellow-400/60 flex items-center justify-center hover:bg-neutral-800/90 transition-colors pointer-events-auto z-50"
                style={{
                  boxShadow:
                    "0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px rgba(251, 191, 36, 0.2)",
                }}
                aria-label={isMuted ? "Unmute robot" : "Mute robot"}
              >
                {isMuted ? (
                  <svg
                    className="w-4 h-4 text-yellow-400"
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
                    className="w-4 h-4 text-yellow-400"
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
        <ProductCarousel />
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

          {/* Flow Animation - Golden water flowing effect */}
          {/* Show all completed lines */}
          {completedLines.length > 0 && (
            <svg
              className="fixed pointer-events-none"
              style={{
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
              }}
            >
              <defs>
                <linearGradient
                  id="goldenGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(251, 191, 36, 0)" />
                  <stop offset="50%" stopColor="rgba(251, 191, 36, 1)" />
                  <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
                </linearGradient>
              </defs>
              {completedLines.map((line, index) => {
                const isNewest = index === completedLines.length - 1;
                return (
                  <line
                    key={`${line.fromField}-${line.toField}-${index}`}
                    x1={line.fromPosition.x}
                    y1={line.fromPosition.y}
                    x2={line.toPosition.x}
                    y2={line.toPosition.y}
                    stroke="#fbbf24"
                    strokeWidth="4"
                    className={isNewest ? "flow-line" : "completed-line"}
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(251, 191, 36, 1))",
                      opacity: 0.9,
                    }}
                  />
                );
              })}
            </svg>
          )}

          {/* Border animation around target field - only when active */}
          {flowAnimation.active && flowAnimation.toFieldRect && (
            <div
              className="fixed pointer-events-none flow-border"
              style={{
                left: flowAnimation.toFieldRect.left - 2,
                top: flowAnimation.toFieldRect.top - 2,
                width: flowAnimation.toFieldRect.width + 4,
                height: flowAnimation.toFieldRect.height + 4,
                border: "3px solid transparent",
                borderRadius: "8px",
                boxSizing: "border-box",
                zIndex: 9998,
              }}
            />
          )}

          {/* Animation styles */}
          <style jsx global>{`
            @keyframes flowLine {
              0% {
                stroke-dasharray: 0, 2000;
                opacity: 0;
              }
              5% {
                opacity: 1;
              }
              70% {
                stroke-dasharray: 2000, 0;
                opacity: 1;
              }
              100% {
                stroke-dasharray: 2000, 0;
                opacity: 1;
              }
            }
            @keyframes flowBorder {
              0% {
                border-color: transparent;
                opacity: 0;
              }
              50% {
                border-color: transparent;
                opacity: 0;
              }
              55% {
                border-top-color: #fbbf24;
                opacity: 1;
                box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
              }
              70% {
                border-top-color: #fbbf24;
                border-right-color: #fbbf24;
              }
              85% {
                border-top-color: #fbbf24;
                border-right-color: #fbbf24;
                border-bottom-color: #fbbf24;
              }
              95% {
                border-color: #fbbf24;
                box-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
              }
              100% {
                border-color: transparent;
                opacity: 0;
              }
            }
            .flow-line {
              animation: flowLine 2s ease-in-out forwards;
              stroke-dasharray: 0, 2000;
            }
            .completed-line {
              stroke-dasharray: 2000, 0;
              opacity: 0.9;
            }
            .flow-border {
              animation: flowBorder 2s ease-in-out;
            }
          `}</style>

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
                  triggerFlowAnimation("name");
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
                  triggerFlowAnimation("phone");
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
                  triggerFlowAnimation("alternative");
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
                  triggerFlowAnimation("email");
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
                  triggerFlowAnimation("town");
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
                <span className="block truncate">{installationTown || ""}</span>
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
                        6
                      </span>
                      Delivery Location (Nearest Landmark){" "}
                      <span className="text-yellow-400">*</span>
                    </>
                  ) : (
                    "Enter your Delivery Location"
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
                  triggerFlowAnimation("deliveryLocation");
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
                      Preferred Date <span className="text-yellow-400">*</span>
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
                  triggerFlowAnimation("date");
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
                        8
                      </span>
                      Preferred Time <span className="text-yellow-400">*</span>
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
                  triggerFlowAnimation("time");
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
                    (window as any).gtag("event", "ads_conversion_Contact_1", {
                      event_category: "conversion",
                      event_label: "Form Submission",
                    });
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
                  setRobotMessage("❌ Something went wrong. Please try again.");
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
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Spacer to ensure enough content for scrolling */}
      <div style={{ minHeight: "10vh" }}></div>
    </motion.div>
  );
}
