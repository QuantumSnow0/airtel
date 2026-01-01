"use client";

import { useState, useEffect } from "react";

interface LeadData {
  customer_name: string;
  airtel_number: string;
  alternate_number: string;
  email: string;
  preferred_package: string;
  installation_town: string;
  delivery_landmark: string;
  visit_date: string;
  visit_time: string;
}

interface CustomerResubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillEmail?: string; // Optional: prefill email if coming from form detection
}

export default function CustomerResubmitModal({
  isOpen,
  onClose,
  prefillEmail,
}: CustomerResubmitModalProps) {
  const [step, setStep] = useState<"email" | "form">(prefillEmail ? "form" : "email");
  const [email, setEmail] = useState(prefillEmail || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dateError, setDateError] = useState("");

  // Form state
  const [formData, setFormData] = useState<LeadData>({
    customer_name: "",
    airtel_number: "",
    alternate_number: "",
    email: "",
    preferred_package: "standard",
    installation_town: "",
    delivery_landmark: "",
    visit_date: "",
    visit_time: "",
  });

  // Add/remove class to body when modal opens/closes (to hide robot)
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("customer-resubmit-modal-open");
    } else {
      document.body.classList.remove("customer-resubmit-modal-open");
    }
    
    return () => {
      document.body.classList.remove("customer-resubmit-modal-open");
    };
  }, [isOpen]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(prefillEmail ? "form" : "email");
      setEmail(prefillEmail || "");
      setError("");
      setLeadData(null);
      setSubmitSuccess(false);
      setDateError("");
      setFormData({
        customer_name: "",
        airtel_number: "",
        alternate_number: "",
        email: "",
        preferred_package: "standard",
        installation_town: "",
        delivery_landmark: "",
        visit_date: "",
        visit_time: "",
      });
    }
  }, [isOpen, prefillEmail]);

  // Auto-lookup if email is prefilled
  useEffect(() => {
    if (isOpen && prefillEmail && prefillEmail.trim() && step === "form" && !leadData && !loading) {
      const emailToUse = prefillEmail.trim();
      setEmail(emailToUse);
      // Trigger lookup after a brief delay to ensure state is set
      const timer = setTimeout(() => {
        handleEmailLookup(emailToUse);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, prefillEmail, step]);

  // Convert time from 12-hour format (e.g., "10:00 AM") to 24-hour format (e.g., "14:30")
  const convertTo24Hour = (time12h: string): string => {
    if (!time12h) return "";
    
    // If already in 24-hour format (HH:MM), return as-is
    const time24Match = time12h.match(/^(\d{1,2}):(\d{2})$/);
    if (time24Match && parseInt(time24Match[1]) < 24) {
      return time12h;
    }

    // Try 12-hour format (HH:MM AM/PM)
    const timeMatch = time12h.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!timeMatch) return time12h;

    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2];
    const period = timeMatch[3].toUpperCase();

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  // Update form data when lead data is loaded
  useEffect(() => {
    if (leadData) {
      setFormData({
        ...leadData,
        visit_time: convertTo24Hour(leadData.visit_time),
      });
    }
  }, [leadData]);

  const handleEmailLookup = async (emailToLookup?: string) => {
    const emailToUse = emailToLookup || email.trim();
    if (!emailToUse) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/customer-resubmit/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailToUse.toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok && data.lead) {
        setLeadData(data.lead);
        setStep("form");
      } else {
        setError(
          data.error ||
            "Email not found. Please contact us at 0789 457 580 for assistance."
        );
      }
    } catch (err) {
      setError(
        "Something went wrong. Please contact us at 0789 457 580 for assistance."
      );
    } finally {
      setLoading(false);
    }
  };

  // Validate date is not in the past
  const validateDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    
    if (selectedDate < today) {
      setDateError("Please select a date from today onwards. Past dates are not allowed.");
      return false;
    }
    setDateError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate date before submitting
    if (!validateDate(formData.visit_date)) {
      setError("Please select a valid visit date.");
      return;
    }
    
    setSubmitting(true);
    setError("");
    setDateError("");

    try {
      const response = await fetch("/api/customer-resubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          customerName: formData.customer_name,
          airtelNumber: formData.airtel_number,
          alternateNumber: formData.alternate_number,
          preferredPackage: formData.preferred_package,
          installationTown: formData.installation_town,
          deliveryLandmark: formData.delivery_landmark,
          visitDate: formData.visit_date,
          visitTime: formData.visit_time,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear form data immediately after successful submission
        setFormData({
          customer_name: "",
          airtel_number: "",
          alternate_number: "",
          email: "",
          preferred_package: "standard",
          installation_town: "",
          delivery_landmark: "",
          visit_date: "",
          visit_time: "",
        });
        setLeadData(null);
        setError("");
        setDateError("");
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError(data.error || "Failed to resubmit. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-neutral-900 rounded-lg shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col border border-neutral-700">
        {/* Header */}
        <div className="flex-shrink-0 bg-neutral-800 border-b border-neutral-700 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {step === "email" ? "Resubmit Request" : "Review & Update"}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {step === "email" ? (
            <div className="space-y-4">
              <p className="text-neutral-300">
                Enter your email address to retrieve your previous request and
                resubmit it.
              </p>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEmailLookup();
                    }
                  }}
                  className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-sm">
                  {error}
                  {error.includes("0789 457 580") && (
                    <div className="mt-2 pt-2 border-t border-red-700">
                      <p className="font-medium">Contact Agent:</p>
                      <a
                        href="tel:+254789457580"
                        className="text-yellow-400 hover:text-yellow-300 underline"
                      >
                        0789 457 580
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleEmailLookup()}
                  disabled={loading || !email.trim()}
                  className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Looking up..." : "Find My Request"}
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
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
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Successfully Resubmitted!
                  </h3>
                  <p className="text-neutral-300">
                    Your request has been resubmitted. We'll contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <p className="text-neutral-300 text-xs sm:text-sm mb-3 sm:mb-4">
                    Review your information below and make any necessary changes
                    before resubmitting.
                  </p>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  {/* Airtel Number */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Airtel Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.airtel_number}
                      onChange={(e) =>
                        setFormData({ ...formData, airtel_number: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="0712 345 678"
                    />
                  </div>

                  {/* Alternate Number */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Alternate Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.alternate_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          alternate_number: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="0712 345 678"
                    />
                  </div>

                  {/* Email (read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      readOnly
                      className="w-full px-4 py-2.5 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-400 cursor-not-allowed"
                    />
                  </div>

                  {/* Preferred Package */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Preferred Package *
                    </label>
                    <select
                      required
                      value={formData.preferred_package}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferred_package: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="standard">5G 15Mbps - Ksh. 2,999/month</option>
                      <option value="premium">5G 30Mbps - Ksh. 3,999/month</option>
                    </select>
                  </div>

                  {/* Installation Town */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Installation Town *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.installation_town}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          installation_town: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  {/* Delivery Landmark */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Delivery Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.delivery_landmark}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          delivery_landmark: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="e.g., Near main gate"
                    />
                  </div>

                  {/* Visit Date */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Preferred Visit Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.visit_date}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setFormData({ ...formData, visit_date: newDate });
                        validateDate(newDate);
                      }}
                      onBlur={(e) => validateDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full px-4 py-2.5 bg-neutral-800 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                        dateError
                          ? "border-red-500 focus:ring-red-500"
                          : "border-neutral-600 focus:ring-yellow-400"
                      }`}
                    />
                    {dateError && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {dateError}
                      </p>
                    )}
                  </div>

                  {/* Visit Time */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Preferred Visit Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.visit_time}
                      onChange={(e) =>
                        setFormData({ ...formData, visit_time: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  {error && (
                    <div className="p-3 sm:p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-xs sm:text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sticky bottom-0 bg-neutral-900 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 sm:pb-0 border-t border-neutral-700 sm:border-t-0 mt-4">
                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="w-full sm:w-auto px-4 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Resubmitting..." : "Resubmit Request"}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

