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
  const { selectedPackage } = usePackage();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAlternativeNumber, setCustomerAlternativeNumber] =
    useState("");
  const [nameBlurred, setNameBlurred] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  const [alternativeBlurred, setAlternativeBlurred] = useState(false);
  const [robotMessage, setRobotMessage] = useState("");
  const [robotVisible, setRobotVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [previousPackage, setPreviousPackage] = useState<string | null>(null);
  const [robotBottom, setRobotBottom] = useState("1rem");
  const [robotTop, setRobotTop] = useState<string | null>(null);

  const isNameValid = customerName.trim().length >= 2;
  const isPhoneValid = /^[0-9]{10,12}$/.test(customerPhone.replace(/\s/g, ""));
  const isAlternativeValid = /^[0-9]{10,12}$/.test(
    customerAlternativeNumber.replace(/\s/g, "")
  );

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

        // If keyboard is open (viewport is smaller), keep robot visible above keyboard
        if (heightDiff > 150) {
          // Keyboard is open - position robot from top of visual viewport
          // This ensures it stays visible above the keyboard
          const padding = 20;
          const robotHeight = 80; // Approximate height
          // Position from top of visible viewport, leaving space for robot
          const topPosition = viewportHeight - robotHeight - padding;
          setRobotTop(`${topPosition}px`);
          setRobotBottom("");
        } else {
          // Keyboard is closed, use normal bottom position
          setRobotTop(null);
          setRobotBottom("1rem");
        }
      } else {
        // Fallback for browsers without visual viewport API
        setRobotTop(null);
        setRobotBottom("1rem");
      }
    };

    // Initial position
    updateRobotPosition();

    // Listen for viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateRobotPosition);
      window.visualViewport.addEventListener("scroll", updateRobotPosition);
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
          updateRobotPosition
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
      customerAlternativeNumber.trim().length > 0;

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
    robotVisible,
    nameBlurred,
    phoneBlurred,
    alternativeBlurred,
  ]);

  // Show typing encouragement messages (only when actively typing, not blurred)
  useEffect(() => {
    if (!robotVisible) return;

    // Priority: Don't override blur messages (errors/success)
    // Only show typing messages when user is actively typing (not blurred)
    const isTyping =
      (customerName.trim().length > 0 && !nameBlurred) ||
      (customerPhone.trim().length > 0 && !phoneBlurred) ||
      (customerAlternativeNumber.trim().length > 0 && !alternativeBlurred);

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
    }
  }, [
    customerName,
    customerPhone,
    customerAlternativeNumber,
    robotVisible,
    nameBlurred,
    phoneBlurred,
    alternativeBlurred,
    isPhoneValid,
    isAlternativeValid,
  ]);

  // Update robot message based on form state (only if robot is visible)
  useEffect(() => {
    if (!robotVisible) return;

    // Priority: Show errors first, then success messages
    if (alternativeBlurred && !isAlternativeValid) {
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
    }
  }, [
    nameBlurred,
    isNameValid,
    phoneBlurred,
    isPhoneValid,
    alternativeBlurred,
    isAlternativeValid,
    robotVisible,
    customerName,
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
          }}
        >
          <div className="relative" style={{ overflow: "visible" }}>
            {/* Speech bubble - positioned to the left of robot */}
            {robotMessage && (
              <div
                className={`absolute right-full mr-2 bg-slate-800/95 backdrop-blur-sm border-2 border-yellow-400/60 rounded-lg px-3 animate-fade-in shadow-lg ${poppins.variable}`}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  boxShadow:
                    "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(251, 191, 36, 0.2)",
                  maxWidth: "320px",
                  minWidth: "140px",
                  zIndex: 2147483647,
                  marginRight: "8px",
                  top: "50%",
                  transform: "translateY(calc(-50% - 4px))",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  overflow: "visible",
                }}
              >
                <span
                  className="text-xs text-white"
                  style={{
                    display: "block",
                    whiteSpace: "normal",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    wordSpacing: "normal",
                    lineHeight: "1.5",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    writingMode: "horizontal-tb",
                    textOrientation: "mixed",
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

      {/* Step 1: Choose Your Package */}
      <section className="px-3 py-2" style={{ marginTop: "0" }}>
        <div className="w-full">
          <div className="text-center mb-6">
            <h2
              className={`text-xl font-bold text-white mb-2 ${poppins.variable}`}
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
            <p
              className={`text-sm text-white/70 ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Select the perfect plan for your needs
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* Step 2: Almost There */}
      <section id="step-2" ref={step2Ref} className="px-3 py-2">
        <div className="w-full">
          <div className="text-center mb-6">
            <h2
              className={`text-xl font-bold text-white mb-2 ${poppins.variable}`}
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
            <p
              className={`text-sm text-white/70 ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Just a few details and our certified technician will schedule your
              installation
            </p>
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
                  className={`text-sm font-medium text-white/90 ${poppins.variable}`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                >
                  Customer Name <span className="text-yellow-400">*</span>
                </span>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={`w-full px-4 py-3 pt-5 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 ${
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
                  className={`text-sm font-medium text-white/90 ${poppins.variable}`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                >
                  Customer Phone (Airtel){" "}
                  <span className="text-yellow-400">*</span>
                </span>
              </div>
            </div>
            <div className="relative">
              <input
                type="tel"
                placeholder="Enter your Airtel phone number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className={`w-full px-4 py-3 pt-5 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 ${
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
                  className={`text-sm font-medium text-white/90 ${poppins.variable}`}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                >
                  Customer Alternative Number{" "}
                  <span className="text-yellow-400">*</span>
                </span>
              </div>
            </div>
            <div className="relative">
              <input
                type="tel"
                placeholder="Enter your alternative phone number"
                value={customerAlternativeNumber}
                onChange={(e) => setCustomerAlternativeNumber(e.target.value)}
                className={`w-full px-4 py-3 pt-5 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 ${
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
        </div>
      </section>

      {/* Spacer to ensure enough content for scrolling */}
      <div style={{ minHeight: "100vh" }}></div>
    </div>
  );
}
