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
      <section className="relative min-h-screen flex items-center">
        {/* Mobile: Background Image */}
        <div className="md:hidden absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/airtel.png')" }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Desktop: Split Layout */}
        <div className="hidden md:grid md:grid-cols-2 absolute inset-0">
          {/* Left Side - Image */}
          <div className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/airtel.png')" }}
            />
          </div>
          {/* Right Side - Content Background */}
          <div className="bg-gradient-to-b from-slate-50 to-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-8 pt-0 pb-4 md:py-0">
          <div className="max-w-7xl mx-auto">
            <div className="md:grid md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
              {/* Mobile: Content on blurred card */}
              <div className="md:hidden space-y-6 pt-0 -mt-5">
                <motion.h1
                  className="text-3xl sm:text-5xl font-extrabold leading-tight whitespace-nowrap text-slate-900 text-center drop-shadow-lg"
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                >
                  5G Smart Connect
                </motion.h1>

                <div className="backdrop-blur-md bg-white/85 rounded-2xl p-6 sm:p-8 border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <motion.div
                    className="text-slate-900 space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      className="space-y-4 text-base sm:text-lg leading-relaxed"
                      variants={containerVariants}
                    >
                      <motion.div
                        className="flex items-start gap-3"
                        variants={featureVariants}
                      >
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
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-3"
                        variants={featureVariants}
                      >
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
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-3"
                        variants={featureVariants}
                      >
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
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-3"
                        variants={featureVariants}
                      >
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
                      </motion.div>
                    </motion.div>

                    <motion.div className="pt-4" variants={buttonVariants}>
                      <Link
                        href="/request-installation"
                        className="block w-full text-center rounded-xl px-8 py-5 text-lg font-semibold text-white shadow-lg shadow-rose-500/50 transition hover:shadow-xl hover:shadow-rose-500/60 active:scale-95"
                        style={{
                          background:
                            "linear-gradient(135deg, #ff0033, #b80000)",
                        }}
                      >
                        Get Connected
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Desktop: Content on right side */}
              <div className="hidden md:block text-slate-900 space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold">
                  5G Smart Connect - Outdoor Unit
                </h1>
                <div className="space-y-4 text-base lg:text-lg text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">
                      Weather-Resistant Design
                    </span>{" "}
                    - Built to perform reliably in all conditions.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      High-Gain Antenna
                    </span>{" "}
                    - Offers strong and consistent indoor coverage
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Signal Amplification
                    </span>{" "}
                    - Enhances signal strength to ensure stable and
                    uninterrupted connectivity.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Flexible Mounting Options
                    </span>{" "}
                    - Easily install on walls, poles, or rooftops to suit your
                    setup and location.
                  </p>
                </div>
                <Link
                  href="/request-installation"
                  className="inline-block mt-6 rounded-xl bg-rose-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-rose-500"
                >
                  Get Connected
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
