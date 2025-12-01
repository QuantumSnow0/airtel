"use client";

import { useState, useRef, useEffect } from "react";
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
  const [showTownDropdown, setShowTownDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const townDropdownRef = useRef<HTMLDivElement>(null);
  const townButtonRef = useRef<HTMLButtonElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const timeButtonRef = useRef<HTMLButtonElement>(null);
  const [robotMessage, setRobotMessage] = useState("");
  const [robotVisible, setRobotVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
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

  // Detect scroll to show robot
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

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
          setRobotTop("1rem");
          setRobotBottom("");
          // Track visual viewport scroll offset
          setViewportScrollOffset(viewport.offsetTop || 0);
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
      if (window.visualViewport) {
        const viewport = window.visualViewport;
        const viewportHeight = viewport.height;
        const windowHeight = window.innerHeight;
        const heightDiff = windowHeight - viewportHeight;

        // Only track scroll offset when keyboard is open
        if (heightDiff > 150) {
          // Update scroll offset when visual viewport scrolls
          setViewportScrollOffset(viewport.offsetTop || 0);
        }
      }
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
    <div className="min-h-screen bg-slate-900">
      {/* Floating Robot Guide - Appears on scroll */}
      {robotVisible && (
        <div
          className="fixed right-4 pointer-events-none animate-slide-up"
          style={{
            bottom: robotTop ? undefined : robotBottom,
            top: robotTop || undefined,
            position: "fixed",
            zIndex: 2147483647, // Maximum z-index value
            isolation: "isolate", // Create new stacking context
            transform:
              isKeyboardOpen && viewportScrollOffset > 0
                ? `translateY(${viewportScrollOffset}px)`
                : undefined,
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
                className={`absolute right-full mr-2 bg-slate-800/95 backdrop-blur-sm border-2 border-yellow-400/60 rounded-lg px-3 animate-fade-in shadow-lg ${poppins.variable}`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  boxShadow:
                    "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(251, 191, 36, 0.2)",
                  maxWidth: "min(calc(100vw - 10px), 440px)",
                  minWidth: "240px",
                  zIndex: 2147483647,
                  marginRight: "8px",
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
                    borderLeft: "6px solid rgb(30, 41, 59)",
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
            {/* Robot Image with multiple animations */}
            <div className="relative animate-robot-combo">
              <img
                src="/robot.png"
                alt="Guide Robot"
                className="w-16 h-16 object-contain drop-shadow-lg"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))",
                }}
              />
              {/* Blinking eyes overlay - adjust positions based on your robot image */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  top: "33%",
                  left: "63%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="w-2 h-2 bg-white rounded-full animate-blink absolute"
                  style={{ left: "-8px" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-blink absolute"
                  style={{ left: "8px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProductCarousel />

      {/* How to Order Section */}
      <section className="px-3 py-4">
        <div className="w-full">
          <div className="text-center mb-4">
            <h2
              className={`text-lg font-semibold text-white mb-3 ${poppins.variable}`}
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
            {/* Compact Slider */}
            <div className="relative overflow-hidden rounded-lg bg-slate-800/60 backdrop-blur-sm border border-yellow-400/30 p-4">
              <div
                ref={howToOrderSliderRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Step 1 */}
                <div className="shrink-0 w-full snap-center">
                  <div className="flex items-start gap-3">
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
                </div>

                {/* Step 2 */}
                <div className="shrink-0 w-full snap-center">
                  <div className="flex items-start gap-3">
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
                </div>

                {/* Step 3 */}
                <div className="shrink-0 w-full snap-center">
                  <div className="flex items-start gap-3">
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
        </div>
      </section>

      {/* Step 1: Choose Your Package */}
      <section className="px-3 py-2" style={{ marginTop: "0" }}>
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
      </section>

      {/* Step 2: Almost There */}
      <section id="step-2" ref={step2Ref} className="px-3 py-2">
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
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "2px",
                  background: "rgb(30, 41, 59)",
                  height: "2px",
                  width: "calc(100% + 4px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Label text */}
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
                className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                  showNameCheck
                    ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "border-slate-700/50"
                } text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                  poppins.variable
                }`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                }}
                onClick={scrollToStep2}
                onFocus={scrollToStep2}
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

          {/* Customer Phone (Airtel) */}
          <div className="mb-6 relative">
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "2px",
                  background: "rgb(30, 41, 59)",
                  height: "2px",
                  width: "calc(100% + 4px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Label text */}
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
                className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                  showPhoneCheck
                    ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "border-slate-700/50"
                } text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                  poppins.variable
                }`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                }}
                onClick={scrollToStep2}
                onFocus={scrollToStep2}
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

          {/* Customer Alternative Number */}
          <div className="mb-6 relative">
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "2px",
                  background: "rgb(30, 41, 59)",
                  height: "2px",
                  width: "calc(100% + 4px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Label text */}
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
                  Alternative Number <span className="text-yellow-400">*</span>
                </span>
              </div>
            </div>
            <div className="relative">
              <input
                type="tel"
                placeholder=""
                value={customerAlternativeNumber}
                onChange={(e) => setCustomerAlternativeNumber(e.target.value)}
                className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                  showAlternativeCheck
                    ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "border-slate-700/50"
                } text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                  poppins.variable
                }`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                }}
                onClick={scrollToStep2}
                onFocus={scrollToStep2}
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

          {/* Customer Email Address */}
          <div className="mb-6 relative">
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              <div
                className="absolute left-0"
                style={{
                  top: "2px",
                  background: "rgb(30, 41, 59)",
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
                className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                  emailBlurred && isEmailValid
                    ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "border-slate-700/50"
                } text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                  poppins.variable
                }`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  WebkitBoxShadow: "0 0 0 1000px rgb(30, 41, 59) inset",
                  WebkitTextFillColor: "#ffffff",
                  caretColor: "#ffffff",
                }}
                onClick={scrollToStep2}
                onFocus={scrollToStep2}
                onBlur={() => setEmailBlurred(true)}
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
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              <div
                className="absolute left-0"
                style={{
                  top: "2px",
                  background: "rgb(30, 41, 59)",
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
                  Installation Town <span className="text-yellow-400">*</span>
                </span>
              </div>
            </div>
            <div className="relative">
              <button
                ref={townButtonRef}
                type="button"
                onClick={() => {
                  setShowTownDropdown(!showTownDropdown);
                  scrollToStep2();
                }}
                onBlur={() => {
                  setTimeout(() => setTownBlurred(true), 200);
                }}
                className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                  townBlurred && isTownValid
                    ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "border-slate-700/50"
                } text-left text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                  poppins.variable
                } ${!installationTown ? "text-slate-400" : ""}`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                }}
              >
                <span className="block truncate">
                  {installationTown || "Select installation town"}
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
                      className="w-5 h-5 text-slate-400"
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
                  className="absolute z-50 w-full bottom-full mb-1 bg-slate-800/95 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg shadow-lg max-h-60 overflow-auto"
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
                      className={`w-full px-4 py-3 text-left text-white hover:bg-slate-700/50 transition-colors ${
                        poppins.variable
                      } ${
                        installationTown === option
                          ? "bg-slate-700/70 text-yellow-400"
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
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "2px",
                  background: "rgb(30, 41, 59)",
                  height: "2px",
                  width: "calc(100% + 4px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Label text */}
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
                className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                  showDeliveryLocationCheck
                    ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "border-slate-700/50"
                } text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                  poppins.variable
                }`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  WebkitBoxShadow: "0 0 0 1000px rgb(30, 41, 59) inset",
                  WebkitTextFillColor: "#ffffff",
                  caretColor: "#ffffff",
                }}
                onClick={scrollToStep2}
                onFocus={scrollToStep2}
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

          {/* Preferred Date of Visit/Installation */}
          <div className="mb-6 relative">
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "2px",
                  background: "rgb(30, 41, 59)",
                  height: "2px",
                  width: "calc(100% + 4px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Label text */}
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
                  Preferred Date <span className="text-yellow-400">*</span>
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
                className={`w-full px-3 py-2.5 pt-4 pr-12 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                  showPreferredDateCheck
                    ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "border-slate-700/50"
                } text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 date-input-custom ${
                  poppins.variable
                } ${!preferredDate ? "date-placeholder" : ""}`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  WebkitBoxShadow: "0 0 0 1000px rgb(30, 41, 59) inset",
                  WebkitTextFillColor: preferredDate
                    ? "#ffffff"
                    : "transparent",
                  caretColor: "#ffffff",
                  colorScheme: "dark",
                }}
                onClick={scrollToStep2}
                onFocus={scrollToStep2}
                onBlur={() => setPreferredDateBlurred(true)}
              />
              {/* Placeholder text when no date is selected */}
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
                  <span className="text-xs text-slate-400">Select date</span>
                </div>
              )}
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
            <div
              className="absolute left-3 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "2px",
                  background: "rgb(30, 41, 59)",
                  height: "2px",
                  width: "calc(100% + 4px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Label text */}
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
                  Preferred Time <span className="text-yellow-400">*</span>
                </span>
              </div>
            </div>
            <div className="relative">
              <button
                ref={timeButtonRef}
                type="button"
                onClick={() => {
                  setShowTimeDropdown(!showTimeDropdown);
                  scrollToStep2();
                }}
                onBlur={() => {
                  // Delay to allow option click
                  setTimeout(() => setPreferredTimeBlurred(true), 200);
                }}
                className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                  showPreferredTimeCheck
                    ? "border-yellow-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "border-slate-700/50"
                } text-left text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${
                  poppins.variable
                } ${!preferredTime ? "text-slate-400" : ""}`}
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
                      className="w-5 h-5 text-slate-400"
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
                  className="absolute z-50 w-full bottom-full mb-1 bg-slate-800/95 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg shadow-lg max-h-60 overflow-auto"
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
                      className={`w-full px-4 py-3 text-left text-white hover:bg-slate-700/50 transition-colors ${
                        poppins.variable
                      } ${
                        preferredTime === option
                          ? "bg-slate-700/70 text-yellow-400"
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
                  ? "bg-yellow-400 hover:bg-yellow-500 text-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.4)] active:scale-95"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed opacity-50"
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

      {/* Spacer to ensure enough content for scrolling */}
      <div style={{ minHeight: "10vh" }}></div>
    </div>
  );
}
