"use client";

import { useState, useRef, useEffect } from "react";
import ProductCarousel from "../test-mobile/ProductCarousel";
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

  // Detect autofill and mark fields as blurred if they have valid values
  useEffect(() => {
    const checkAutofill = () => {
      if (nameInputRef.current && customerName && isNameValid && !nameBlurred) {
        setNameBlurred(true);
      }
      if (phoneInputRef.current && customerPhone && isPhoneValid && !phoneBlurred) {
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
  const showPreferredDateCheck =
    preferredDateBlurred && isPreferredDateValid;
  const showPreferredTimeCheck =
    preferredTimeBlurred && isPreferredTimeValid;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Desktop Layout: Carousel Left, Form Right */}
      <div className="grid grid-cols-2 gap-0">
        {/* Left Side - Carousel (50% width) */}
        <div className="col-span-1">
          <ProductCarousel />
        </div>

        {/* Right Side - Form Sections (50% width) */}
        <div className="col-span-1 overflow-y-auto h-screen">
          {/* How to Order Section - One Line */}
          <section className="px-6 py-6">
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
                {/* All 3 steps in one line */}
                <div className="flex gap-4 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-yellow-400/30 p-4">
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
          <section className="px-6 py-4" style={{ marginTop: "0" }}>
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
          <section id="step-2" ref={step2Ref} className="px-6 py-4">
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

              {/* Form Fields - Desktop: 2 columns */}
              <div className="grid grid-cols-2 gap-6">
                {/* Full Name - Full Width */}
                <div className="mb-6 relative col-span-2">
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
                        showEmailCheck
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
                      className={`w-full px-3 py-2.5 pt-4 pr-10 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 text-sm ${
                        showTownCheck
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

                {/* Delivery Location - Full Width */}
                <div className="mb-6 relative col-span-2">
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
                        <span className="text-xs text-slate-400">
                          Select date
                        </span>
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
                      }}
                      onBlur={() => {
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
        </div>
      </div>
    </div>
  );
}

