"use client";

import { useState } from "react";
import ProductCarousel from "./ProductCarousel";
import PricingCards from "../components/PricingCards";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function TestMobilePage() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [nameBlurred, setNameBlurred] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);

  const isNameValid = customerName.trim().length >= 2;
  const isPhoneValid = /^[0-9]{10,12}$/.test(customerPhone.replace(/\s/g, ""));

  const showNameCheck = nameBlurred && isNameValid;
  const showPhoneCheck = phoneBlurred && isPhoneValid;

  return (
    <div className="min-h-screen bg-slate-900">
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
      <section className="px-3 py-2">
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
        </div>
      </section>
    </div>
  );
}
