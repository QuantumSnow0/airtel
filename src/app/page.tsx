"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-white">
        {/* Desktop: Background */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-8 pt-8 pb-32 md:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Mobile: Zigzag Layout */}
            <div className="md:hidden space-y-6">
              {/* Title */}
              <motion.h1
                className="text-2xl sm:text-5xl font-extrabold leading-tight text-center mb-3"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #991b1b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Airtel Smart Connect 5G
              </motion.h1>

              {/* Section 1: Feature on top, Image below */}
              <motion.div
                className="space-y-2"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-rose-600 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-rose-600 mb-1 leading-tight">
                      Weather-Resistant Design
                    </p>
                    <p className="text-slate-700">
                      Built to perform reliably in all conditions.
                    </p>
                  </div>
                </div>
                <img
                  src="/airtel.png"
                  alt="5G Smart Connect Router"
                  className="w-full rounded-lg shadow-md"
                />
              </motion.div>

              {/* Section 2: Feature on top, Image below */}
              <motion.div
                className="space-y-4"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-rose-600 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-rose-600 mb-1 leading-tight">
                      High-Gain Antenna
                    </p>
                    <p className="text-slate-700">
                      Offers strong and consistent indoor coverage.
                    </p>
                  </div>
                </div>
                <img
                  src="/airtel1.jpeg"
                  alt="5G Smart Connect Router"
                  className="w-full rounded-lg shadow-md"
                />
              </motion.div>

              {/* Section 3: Feature on top, Image below */}
              <motion.div
                className="space-y-4"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-rose-600 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-rose-600 mb-1 leading-tight">
                      Signal Amplification
                    </p>
                    <p className="text-slate-700">
                      Enhances signal strength for stable, uninterrupted
                      connectivity.
                    </p>
                  </div>
                </div>
                <img
                  src="/airtel2.jpeg"
                  alt="5G Smart Connect Router Installation"
                  className="w-full rounded-lg shadow-md"
                />
              </motion.div>

              {/* Section 4: Feature only (no image) */}
              <motion.div
                className="space-y-4"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-rose-600 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-rose-600 mb-1 leading-tight">
                      Flexible Mounting Options
                    </p>
                    <p className="text-slate-700">
                      Easily install on walls, poles, or rooftops.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop: Full Layout */}
            <div className="hidden md:block">
              {/* Hero Section */}
              <motion.div
                className="text-center mb-16"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                <h1
                  className="text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #dc2626, #991b1b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  5G Smart Connect
                </h1>
                <p className="text-xl lg:text-2xl text-slate-600 font-medium">
                  Outdoor Unit - High-Speed Internet for Kenya
                </p>
              </motion.div>

              {/* Product Images Grid */}
              <motion.div
                className="grid grid-cols-3 gap-6 mb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="overflow-hidden rounded-xl shadow-lg"
                  variants={featureVariants}
                >
                  <img
                    src="/airtel.png"
                    alt="5G Smart Connect Router"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
                <motion.div
                  className="overflow-hidden rounded-xl shadow-lg"
                  variants={featureVariants}
                >
                  <img
                    src="/airtel1.jpeg"
                    alt="5G Smart Connect Router"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
                <motion.div
                  className="overflow-hidden rounded-xl shadow-lg"
                  variants={featureVariants}
                >
                  <img
                    src="/airtel2.jpeg"
                    alt="5G Smart Connect Router Installation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                className="grid grid-cols-2 gap-8 mb-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="flex items-start gap-4 p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  variants={featureVariants}
                >
                  <svg
                    className="h-6 w-6 text-rose-600 shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Weather-Resistant Design
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Built to perform reliably in all conditions.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  variants={featureVariants}
                >
                  <svg
                    className="h-6 w-6 text-rose-600 shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      High-Gain Antenna
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Offers strong and consistent indoor coverage.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  variants={featureVariants}
                >
                  <svg
                    className="h-6 w-6 text-rose-600 shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Signal Amplification
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Enhances signal strength for stable, uninterrupted
                      connectivity.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  variants={featureVariants}
                >
                  <svg
                    className="h-6 w-6 text-rose-600 shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Flexible Mounting Options
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Easily install on walls, poles, or rooftops.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="text-center"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/request-installation"
                  className="inline-block rounded-xl px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-rose-500/50 transition hover:shadow-xl hover:shadow-rose-500/60"
                  style={{
                    background: "linear-gradient(135deg, #ff0033, #b80000)",
                  }}
                >
                  Get Connected
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Button for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-lg">
        <Link
          href="/request-installation"
          className="block w-full text-center rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition active:scale-95"
          style={{
            background: "linear-gradient(135deg, #ff0033, #b80000)",
          }}
        >
          Get Connected
        </Link>
      </div>
    </div>
  );
}
