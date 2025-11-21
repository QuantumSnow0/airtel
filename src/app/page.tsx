"use client";

import { useMemo, useState, useRef, useEffect } from "react";

type CustomerFormState = {
  customerName: string;
  airtelNumber: string;
  alternateNumber: string;
  email: string;
  preferredPackage: string;
  installationTown: string;
  deliveryLandmark: string;
  visitDate: string;
  visitTime: string;
};

const initialCustomerState: CustomerFormState = {
  customerName: "",
  airtelNumber: "",
  alternateNumber: "",
  email: "",
  preferredPackage: "",
  installationTown: "",
  deliveryLandmark: "",
  visitDate: "",
  visitTime: "",
};

const internalDefaults = {
  agentType: "Enterprise",
  enterpriseCP: "WAM APPLICATIONS",
  agentName: "samson karau maingi",
  agentMobile: "0789457580",
  leadType: "Confirmed",
  connectionType: "SmartConnect (5G ODU)",
};

const packageOptions = [
  "5G_15Mbps_30days at Ksh.2999",
  "5G_30Mbps_30days at Ksh.3999",
];

const townOptions = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

const visitSlots = Array.from({ length: 11 }, (_, i) => {
  const hour = 8 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

type SubmitStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

type Toast = {
  id: string;
  message: string;
  type: "error" | "success" | "info";
};

export default function Home() {
  const [formState, setFormState] =
    useState<CustomerFormState>(initialCustomerState);
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [townSearch, setTownSearch] = useState("");
  const [showTownDropdown, setShowTownDropdown] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const townInputRef = useRef<HTMLInputElement>(null);
  const townDropdownRef = useRef<HTMLDivElement>(null);

  const showToast = (
    message: string,
    type: "error" | "success" | "info" = "error"
  ) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const filteredTowns = useMemo(() => {
    if (!townSearch.trim()) return townOptions;
    return townOptions.filter((town) =>
      town.toLowerCase().includes(townSearch.toLowerCase())
    );
  }, [townSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        townDropdownRef.current &&
        !townDropdownRef.current.contains(event.target as Node) &&
        townInputRef.current &&
        !townInputRef.current.contains(event.target as Node)
      ) {
        setShowTownDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to normalize phone number input (accepts 07XXXXXXXX or 2547XXXXXXXX)
  const normalizePhoneInput = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    // If starts with 254, remove it (user might paste full number)
    if (digits.startsWith("254") && digits.length > 3) {
      return digits.substring(3);
    }
    // If starts with 0, remove it (user enters 07XXXXXXXX)
    if (digits.startsWith("0") && digits.length > 1) {
      return digits.substring(1);
    }
    // Return as is (user enters 7XXXXXXXX)
    return digits;
  };

  // Helper function to convert phone to required format (2547XXXXXXXX)
  const formatPhoneForSubmission = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    // If already in 254 format, return as is
    if (digits.startsWith("254") && digits.length >= 12) {
      return digits;
    }
    // If starts with 0, remove it and add 254
    if (digits.startsWith("0")) {
      return `254${digits.substring(1)}`;
    }
    // If just digits (7XXXXXXXX), add 254
    if (digits.length >= 9) {
      return `254${digits}`;
    }
    return digits;
  };

  const isFormValid = useMemo(() => {
    const airtelDigits = formState.airtelNumber.replace(/\D/g, "");
    const altDigits = formState.alternateNumber.replace(/\D/g, "");

    const isValidPhone = (digits: string): boolean => {
      if (!digits || digits.length === 0) return false;
      if (digits.startsWith("254")) {
        return digits.length >= 12 && digits.length <= 13;
      }
      // Must be 9-10 digits and start with 7
      return (
        digits.length >= 9 && digits.length <= 10 && digits.startsWith("7")
      );
    };

    const isValidEmail = (email: string): boolean => {
      if (!email || email.trim() === "") return false;

      const trimmedEmail = email.trim();

      // Check if email contains @ symbol
      if (!trimmedEmail.includes("@")) return false;

      // Check if email has domain after @
      const parts = trimmedEmail.split("@");
      if (parts.length !== 2 || !parts[1] || parts[1].trim() === "")
        return false;

      // Check if domain has a dot (TLD)
      if (!parts[1].includes(".")) return false;

      // More strict email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) return false;

      // Check for common typos
      if (
        trimmedEmail.includes("..") ||
        trimmedEmail.startsWith(".") ||
        trimmedEmail.endsWith(".") ||
        trimmedEmail.startsWith("@") ||
        trimmedEmail.endsWith("@")
      ) {
        return false;
      }

      // Check if domain part is valid
      const domainParts = parts[1].split(".");
      if (
        domainParts.length < 2 ||
        domainParts[0] === "" ||
        domainParts[domainParts.length - 1] === ""
      ) {
        return false;
      }

      // Check if TLD (top-level domain) is at least 3 characters (rejects incomplete domains like .co)
      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 3) {
        return false;
      }

      return true;
    };

    return (
      formState.customerName.trim() !== "" &&
      isValidPhone(airtelDigits) &&
      isValidPhone(altDigits) &&
      isValidEmail(formState.email) &&
      formState.preferredPackage !== "" &&
      formState.installationTown !== "" &&
      formState.deliveryLandmark.trim() !== "" &&
      formState.visitDate !== "" &&
      formState.visitTime !== ""
    );
  }, [formState]);

  const handleChange = (field: keyof CustomerFormState) => {
    return (value: string) =>
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
  };

  const getValidationErrors = (): string[] => {
    const errors: string[] = [];
    const airtelDigits = formState.airtelNumber.replace(/\D/g, "");
    const altDigits = formState.alternateNumber.replace(/\D/g, "");

    const isValidPhone = (digits: string, fieldName: string): boolean => {
      // Empty check
      if (!digits || digits.length === 0) {
        errors.push(`${fieldName} is required`);
        return false;
      }
      // If starts with 254, should be 12-13 digits
      if (digits.startsWith("254")) {
        if (digits.length < 12 || digits.length > 13) {
          errors.push(
            `${fieldName} must be 12-13 digits when including country code`
          );
          return false;
        }
        return true;
      }
      // Should be 9-10 digits (7XXXXXXXX or 07XXXXXXXX format, but 0 is stripped)
      if (digits.length < 9 || digits.length > 10) {
        errors.push(`${fieldName} must be 9-10 digits (e.g., 712345678)`);
        return false;
      }
      // Check if it starts with 7 (Kenyan mobile numbers)
      if (!digits.startsWith("7")) {
        errors.push(`${fieldName} must start with 7 (e.g., 712345678)`);
        return false;
      }
      return true;
    };

    const isValidEmail = (email: string): boolean => {
      if (!email || email.trim() === "") {
        errors.push("Email address is required");
        return false;
      }

      const trimmedEmail = email.trim();

      // Check if email contains @ symbol
      if (!trimmedEmail.includes("@")) {
        errors.push("Email must contain @ symbol (e.g., name@gmail.com)");
        return false;
      }

      // Check if email has domain after @
      const parts = trimmedEmail.split("@");
      if (parts.length !== 2 || !parts[1] || parts[1].trim() === "") {
        errors.push("Email must have a domain after @ (e.g., name@gmail.com)");
        return false;
      }

      // Check if domain has a dot (TLD)
      if (!parts[1].includes(".")) {
        errors.push("Email domain must include a dot (e.g., name@gmail.com)");
        return false;
      }

      // More strict email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.push(
          "Please enter a valid email address (e.g., name@example.com)"
        );
        return false;
      }

      // Check for common typos
      if (
        trimmedEmail.includes("..") ||
        trimmedEmail.startsWith(".") ||
        trimmedEmail.endsWith(".") ||
        trimmedEmail.startsWith("@") ||
        trimmedEmail.endsWith("@")
      ) {
        errors.push("Email address contains invalid characters");
        return false;
      }

      // Check if domain part is valid (has at least one character before and after dot)
      const domainParts = parts[1].split(".");
      if (
        domainParts.length < 2 ||
        domainParts[0] === "" ||
        domainParts[domainParts.length - 1] === ""
      ) {
        errors.push("Email domain is invalid (e.g., name@gmail.com)");
        return false;
      }

      // Check if TLD (top-level domain) is at least 3 characters (rejects incomplete domains like .co)
      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 3) {
        errors.push(
          "Email domain must have a complete extension (e.g., .com, .org, .co.ke)"
        );
        return false;
      }

      return true;
    };

    if (!formState.customerName.trim()) {
      errors.push("Full name is required");
    }
    isValidPhone(airtelDigits, "Airtel number");
    isValidPhone(altDigits, "Alternative number");
    isValidEmail(formState.email);
    if (!formState.preferredPackage) {
      errors.push("Please select a package");
    }
    if (!formState.installationTown) {
      errors.push("Please select an installation town");
    } else {
      // Normalize and verify the town is in the valid list
      const normalizedTown = formState.installationTown
        .trim()
        .replace(/[.,;]+$/, "");
      const isValidTown = townOptions.some(
        (town) => town.toLowerCase() === normalizedTown.toLowerCase()
      );
      if (!isValidTown) {
        errors.push("Please select a valid installation town from the list");
      }
    }
    if (!formState.deliveryLandmark.trim()) {
      errors.push("Installation location is required");
    }
    if (!formState.visitDate) {
      errors.push("Please select a visit date");
    }
    if (!formState.visitTime) {
      errors.push("Please select a visit time");
    }
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = getValidationErrors();
    if (validationErrors.length > 0) {
      showToast(validationErrors[0], "error");
      setStatus({
        state: "error",
        message: validationErrors[0],
      });
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formState.customerName,
          airtelNumber: formState.airtelNumber,
          alternateNumber: formState.alternateNumber,
          email: formState.email,
          preferredPackage: formState.preferredPackage,
          installationTown: formState.installationTown,
          deliveryLandmark: formState.deliveryLandmark,
          visitDate: formState.visitDate,
          visitTime: formState.visitTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If data was saved to database but Microsoft Forms failed
        if (data.savedToDatabase) {
          const errorMsg = `Your information was saved, but there was an issue submitting to our system. Our team will process it manually. Reference: ${
            data.leadId || "saved"
          }`;
          setStatus({
            state: "error",
            message: errorMsg,
          });
          showToast(errorMsg, "error");
          // Still reset form since data is saved
          setFormState(initialCustomerState);
          return;
        }
        // Otherwise, throw the error
        throw new Error(data.error || data.details || "Failed to submit form");
      }

      setStatus({
        state: "success",
        message: "Form submitted successfully! We'll contact you soon.",
      });
      showToast(
        "Form submitted successfully! We'll contact you soon.",
        "success"
      );

      // Reset form after successful submission
      setFormState(initialCustomerState);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      setStatus({
        state: "error",
        message: errorMessage,
      });
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-slate-200 py-4 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-600 mb-1">
            Airtel Kenya
          </p>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            SmartConnect Installation Request
          </h1>
        </div>
      </header>

      {/* Toast Notifications */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg border p-4 shadow-lg animate-in slide-in-from-top-5 ${
              toast.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-800"
                : toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                {toast.type === "error" ? (
                  <svg
                    className="h-5 w-5 text-rose-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : toast.type === "success" ? (
                  <svg
                    className="h-5 w-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="shrink-0 text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content with padding for fixed header */}
      <main className="mx-auto max-w-2xl pt-24 pb-24 sm:pb-8 px-3 sm:px-4">
        <form
          className="px-4 sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-8 sm:shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="space-y-0">
            <div className="pb-5 border-b border-slate-300 sm:border-0 sm:pb-0">
              <FormGroup label="1. Full Name" required>
                <input
                  type="text"
                  className="input"
                  value={formState.customerName}
                  onChange={(event) =>
                    handleChange("customerName")(event.target.value)
                  }
                  placeholder="Enter your full name"
                />
              </FormGroup>
            </div>

            <div className="py-5 border-b border-slate-300 sm:border-0 sm:py-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormGroup label="2. Airtel Number" required>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-600 pointer-events-none">
                      +254
                    </div>
                    <input
                      type="tel"
                      className="input pl-14"
                      inputMode="numeric"
                      value={formState.airtelNumber}
                      onChange={(event) => {
                        const normalized = normalizePhoneInput(
                          event.target.value
                        );
                        handleChange("airtelNumber")(normalized);
                      }}
                      placeholder="712345678"
                    />
                  </div>
                </FormGroup>

                <FormGroup label="3. Alternative Number" required>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-600 pointer-events-none">
                      +254
                    </div>
                    <input
                      type="tel"
                      className="input pl-14"
                      inputMode="numeric"
                      value={formState.alternateNumber}
                      onChange={(event) => {
                        const normalized = normalizePhoneInput(
                          event.target.value
                        );
                        handleChange("alternateNumber")(normalized);
                      }}
                      placeholder="712345678"
                    />
                  </div>
                </FormGroup>
              </div>
            </div>

            <div className="py-5 border-b border-slate-300 sm:border-0 sm:py-0">
              <FormGroup label="4. Email Address" required>
                <input
                  type="email"
                  className="input"
                  value={formState.email}
                  onChange={(event) =>
                    handleChange("email")(event.target.value)
                  }
                  placeholder="your.email@example.com"
                />
              </FormGroup>
            </div>

            <div className="py-5 border-b border-slate-300 sm:border-0 sm:py-0">
              <FormGroup label="5. Select Package" required>
                <div className="space-y-2">
                  {packageOptions.map((option) => {
                    const isSelected = formState.preferredPackage === option;
                    const [speedPart, price] = option.split(" at ");
                    const parts = speedPart.split("_");
                    const type = parts[0];
                    const speed = parts[1];
                    const duration = parts[2];

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("preferredPackage")(option)}
                        className={`w-full flex items-center justify-between rounded-lg border-2 px-3 py-2.5 transition-all ${
                          isSelected
                            ? "border-rose-500 bg-rose-50"
                            : "border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className={`flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? "border-rose-500 bg-rose-500"
                                : "border-slate-300"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="h-3 w-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-500 uppercase">
                                {type}
                              </span>
                              <span className="text-sm font-bold text-slate-900">
                                {speed}
                              </span>
                              <span className="text-xs text-slate-400">
                                • {duration.replace("days", " days")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-3 flex-shrink-0">
                          <span className="text-sm font-semibold text-rose-600">
                            {price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </FormGroup>
            </div>

            <div className="py-5 border-b border-slate-300 sm:border-0 sm:py-0">
              <FormGroup label="6. Installation Town" required>
                <div className="relative">
                  <input
                    ref={townInputRef}
                    type="text"
                    className="input"
                    value={townSearch || formState.installationTown}
                    onChange={(event) => {
                      const value = event.target.value;
                      setTownSearch(value);
                      setShowTownDropdown(true);

                      // Normalize the input: trim whitespace and remove trailing dots/commas
                      const normalized = value.trim().replace(/[.,;]+$/, "");

                      // Check if normalized value matches any town (case-insensitive)
                      const matchedTown = townOptions.find(
                        (town) =>
                          town.toLowerCase() === normalized.toLowerCase()
                      );

                      if (matchedTown) {
                        // Use the exact town name from the array (not the autofilled one)
                        handleChange("installationTown")(matchedTown);
                        setTownSearch("");
                        setShowTownDropdown(false);
                        townInputRef.current?.blur();
                      } else {
                        handleChange("installationTown")("");
                      }
                    }}
                    onFocus={() => {
                      if (formState.installationTown) {
                        handleChange("installationTown")("");
                        setTownSearch("");
                      }
                      setShowTownDropdown(true);
                    }}
                    onBlur={() => {
                      // Normalize on blur in case autofill or paste added extra characters
                      const currentValue =
                        townSearch || formState.installationTown;
                      if (currentValue) {
                        const normalized = currentValue
                          .trim()
                          .replace(/[.,;]+$/, "");
                        const matchedTown = townOptions.find(
                          (town) =>
                            town.toLowerCase() === normalized.toLowerCase()
                        );
                        if (
                          matchedTown &&
                          matchedTown !== formState.installationTown
                        ) {
                          handleChange("installationTown")(matchedTown);
                          setTownSearch("");
                        }
                      }
                    }}
                    placeholder="Search or select a county..."
                  />
                  {showTownDropdown &&
                    !formState.installationTown &&
                    filteredTowns.length > 0 && (
                      <div
                        ref={townDropdownRef}
                        className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
                      >
                        {filteredTowns.map((town) => (
                          <button
                            key={town}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleChange("installationTown")(town);
                              setTownSearch("");
                              setShowTownDropdown(false);
                              setTimeout(() => {
                                townInputRef.current?.blur();
                              }, 0);
                            }}
                            className="w-full px-4 py-3 text-left text-sm text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-900"
                          >
                            {town}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </FormGroup>
            </div>

            <div className="py-5 border-b border-slate-300 sm:border-0 sm:py-0">
              <FormGroup label="7. Installation Location" required>
                <textarea
                  rows={3}
                  className="input"
                  value={formState.deliveryLandmark}
                  onChange={(event) =>
                    handleChange("deliveryLandmark")(event.target.value)
                  }
                  placeholder="Enter your address, estate, or nearest landmark"
                />
              </FormGroup>
            </div>

            <div className="py-5 border-b border-slate-300 sm:border-0 sm:py-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormGroup label="8. Preferred Date" required>
                  <input
                    type="date"
                    className="input"
                    value={formState.visitDate}
                    onChange={(event) =>
                      handleChange("visitDate")(event.target.value)
                    }
                  />
                </FormGroup>

                <FormGroup label="9. Preferred Time" required>
                  <button
                    type="button"
                    onClick={() => setShowTimeModal(true)}
                    className={`input flex items-center justify-between text-left ${
                      formState.visitTime ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    <span>{formState.visitTime || "Choose a time slot"}</span>
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </FormGroup>
              </div>
            </div>
          </div>

          {/* Sticky Submit Button Area - Mobile only */}
          <div className="sticky bottom-0 bg-white sm:static sm:bg-transparent pt-4 pb-2 sm:pt-6 -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-slate-200 sm:border-0 mt-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:shadow-none">
            {status.state === "error" && (
              <div className="mb-4 rounded-lg bg-rose-50 border border-rose-200 p-3">
                <p className="text-sm font-medium text-rose-700">
                  {status.message}
                </p>
              </div>
            )}
            {status.state === "success" && (
              <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                <p className="text-sm font-medium text-emerald-700">
                  ✓ {status.message}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-rose-600 px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              disabled={status.state === "submitting"}
            >
              {status.state === "submitting" ? (
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
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Time Picker Modal */}
      {showTimeModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/40 p-0 sm:p-4"
          onClick={() => setShowTimeModal(false)}
        >
          <div
            className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-top"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-semibold text-slate-900">
                Select Visit Time
              </h3>
              <button
                type="button"
                onClick={() => setShowTimeModal(false)}
                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Time Slots */}
            <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
              <div className="space-y-1">
                {visitSlots.map((slot) => {
                  const isSelected = formState.visitTime === slot;
                  const [hours, minutes] = slot.split(":");
                  const hour = parseInt(hours);
                  const time12h =
                    hour > 12
                      ? `${hour - 12}:${minutes} PM`
                      : hour === 12
                      ? `12:${minutes} PM`
                      : `${hour}:${minutes} AM`;

                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        handleChange("visitTime")(slot);
                        setShowTimeModal(false);
                      }}
                      className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                        isSelected
                          ? "border-rose-500 bg-rose-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-rose-500 bg-rose-500"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="text-base font-semibold text-slate-900">
                            {time12h}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {slot}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <svg
                          className="h-5 w-5 text-rose-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type FormGroupProps = {
  label: string;
  helper?: string;
  required?: boolean;
  children: React.ReactNode;
};

function FormGroup({ label, helper, required, children }: FormGroupProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </span>
      {helper && (
        <span className="text-xs text-slate-500 -mt-0.5">{helper}</span>
      )}
      {children}
    </label>
  );
}
