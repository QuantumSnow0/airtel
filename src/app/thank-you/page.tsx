"use client";
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

import { Poppins } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function ThankYouPage() {
  const [mounted, setMounted] = useState(false);
  const [customerName, setCustomerName] = useState("there");
  const [robotAnimationState, setRobotAnimationState] = useState<
    "idle" | "speaking" | "waving"
  >("waving");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Get customer name from localStorage
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("customerName");
      if (savedName) {
        setCustomerName(savedName);
        // Clear it after reading
        localStorage.removeItem("customerName");
      }
    }
  }, []);
// 🔥 Track Meta conversion
useEffect(() => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration");
  }
}, []);

  // Speak thank you message
  useEffect(() => {
    if (!mounted || isMuted) return;

    const thankYouMessage = `Thank you ${customerName}! Your request has been submitted successfully. Our qualified technician will call you from 0733 100 000 within 24 to 48 hours to confirm your installation details. Please answer the call! If you miss it or want to call back, please call 0733 100 500.`;

    const speakText = async (text: string) => {
      try {
        setRobotAnimationState("speaking");

        const response = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        if (response.ok) {
          const data = await response.json();

          // Check if we got audio data
          if (data.audio) {
            // Convert base64 to blob
            const audioBytes = Uint8Array.from(atob(data.audio), (c) =>
              c.charCodeAt(0)
            );
            const audioBlob = new Blob([audioBytes], {
              type: `audio/${data.format || "mp3"}`,
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            audio.onended = () => {
              setRobotAnimationState("idle");
              URL.revokeObjectURL(audioUrl);
            };

            audio.onerror = (e) => {
              console.error("Audio playback error:", e);
              setRobotAnimationState("idle");
              URL.revokeObjectURL(audioUrl);
              // Fallback to browser TTS
              if ("speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice =
                  window.speechSynthesis
                    .getVoices()
                    .find((v) => v.name.includes("Google")) ||
                  window.speechSynthesis.getVoices()[0];
                window.speechSynthesis.speak(utterance);
                utterance.onend = () => setRobotAnimationState("idle");
              }
            };

            try {
              await audio.play();
            } catch (playError) {
              console.error("Audio play error:", playError);
              setRobotAnimationState("idle");
              URL.revokeObjectURL(audioUrl);
              // Fallback to browser TTS
              if ("speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice =
                  window.speechSynthesis
                    .getVoices()
                    .find((v) => v.name.includes("Google")) ||
                  window.speechSynthesis.getVoices()[0];
                window.speechSynthesis.speak(utterance);
                utterance.onend = () => setRobotAnimationState("idle");
              }
            }
          } else {
            // No audio data, fallback to browser TTS
            throw new Error("No audio data in response");
          }
        } else {
          // API error, fallback to browser TTS
          const errorData = await response.json().catch(() => ({}));
          console.error("TTS API error:", errorData);
          throw new Error(errorData.error || "TTS API failed");
        }
      } catch (error) {
        console.error("TTS error:", error);
        setRobotAnimationState("idle");
        // Fallback to browser TTS
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.voice =
            window.speechSynthesis
              .getVoices()
              .find((v) => v.name.includes("Google")) ||
            window.speechSynthesis.getVoices()[0];
          window.speechSynthesis.speak(utterance);
          utterance.onend = () => setRobotAnimationState("idle");
        }
      }
    };

    // Delay speaking slightly after page loads
    const timer = setTimeout(() => {
      speakText(thankYouMessage);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [mounted, customerName, isMuted]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 text-white ${poppins.variable}`}
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-6 left-4 md:top-8 md:left-8 z-50"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-neutral-800/80 backdrop-blur-md border border-yellow-400/30 hover:bg-neutral-800/90 hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm md:text-base font-medium text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
            Back
          </span>
        </Link>
      </motion.div>

      <div className="px-4 py-8 md:py-12">
        {mounted && (
          <>
            {/* Top Section - Centered */}
            <div className="max-w-2xl mx-auto">
              {/* Robot with Thank You Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center mb-6"
              >
                {/* Robot */}
                <div
                  className="relative mb-4"
                  style={{
                    width: "60px",
                    height: "60px",
                    minWidth: "60px",
                    minHeight: "60px",
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
                      width: "70px",
                      height: "70px",
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
                  />

                  {/* Mute/Unmute Toggle Button */}
                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (!isMuted && audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                      }
                      if (
                        !isMuted &&
                        typeof window !== "undefined" &&
                        "speechSynthesis" in window
                      ) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-neutral-900/90 border-2 border-yellow-400/60 flex items-center justify-center hover:bg-neutral-800/90 transition-colors pointer-events-auto z-50"
                    style={{
                      boxShadow:
                        "0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px rgba(251, 191, 36, 0.2)",
                    }}
                    aria-label={isMuted ? "Unmute robot" : "Mute robot"}
                  >
                    {isMuted ? (
                      <svg
                        className="w-3 h-3 text-yellow-400"
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
                        className="w-3 h-3 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Thank You Message */}
                <h1
                  className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent text-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Thank You,{" "}
                  {customerName.charAt(0).toUpperCase() + customerName.slice(1)}
                  !
                </h1>
                <p className="text-lg md:text-xl text-neutral-300 mb-4 text-center">
                  Your request has been submitted successfully
                </p>
              </motion.div>

              {/* What Happens Next Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8 max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border border-blue-400/30 rounded-xl p-5 md:p-6">
                  <h3 className="text-blue-400 font-bold text-lg md:text-xl mb-4 text-center flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    What Happens Next?
                  </h3>
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed text-center">
                    Our qualified technician will contact you within{" "}
                    <span className="font-semibold text-blue-400">
                      24-48 hours
                    </span>{" "}
                    to confirm your installation details and schedule a convenient
                    time for setup.
                  </p>
                </div>
              </motion.div>

              {/* Contact Information - Prominent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8 max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-400/20 border-2 border-yellow-400/50 rounded-xl p-5 md:p-6">
                  <h3 className="text-yellow-400 font-bold text-lg md:text-xl mb-4 text-center flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    {/* Incoming Call Number */}
                    <div className="bg-neutral-900/50 rounded-lg p-4 border border-yellow-400/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-yellow-400/20 rounded-full p-2">
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
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs md:text-sm text-neutral-400 mb-1">
                            We'll call you from:
                          </p>
                          <p className="text-xl md:text-2xl font-bold text-yellow-400">
                            0733 100 000
                          </p>
                          <p className="text-xs md:text-sm text-yellow-400/80 mt-1">
                            ⚠️ One-way number (you can't call this back)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Call Back Number */}
                    <div className="bg-neutral-900/50 rounded-lg p-4 border border-yellow-400/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-yellow-400/20 rounded-full p-2">
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
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs md:text-sm text-neutral-400 mb-1">
                            If you miss our call or want to call back:
                          </p>
                          <a
                            href="tel:+254733100500"
                            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-all group"
                          >
                            <span className="text-xl md:text-2xl font-bold">
                              0733 100 500
                            </span>
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </a>
                          <p className="text-xs md:text-sm text-green-400 mt-1">
                            ✅ Tap to call us back
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/30">
                    <p className="text-yellow-400 text-xs md:text-sm text-center font-medium">
                      ⚠️ Please answer calls from 0733 100 000 to secure your
                      installation slot!
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Why Answer the Call - Urgency & Benefits Combined */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8 max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent border border-yellow-400/30 rounded-xl p-5 md:p-6">
                  <h3 className="text-yellow-400 font-bold text-lg md:text-xl mb-4 text-center">
                    🚀 Why Answer Our Call? Limited Availability!
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base text-neutral-300">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 text-xl">⚡</span>
                      <p>
                        <span className="font-semibold text-yellow-400">
                          Ultra-fast 5G speeds
                        </span>{" "}
                        - Stream, work, and game without lag
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 text-xl">🏠</span>
                      <p>
                        <span className="font-semibold text-yellow-400">
                          Professional installation
                        </span>{" "}
                        - Expert technicians set everything up
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 text-xl">📦</span>
                      <p>
                        <span className="font-semibold text-yellow-400">
                          Complete kit included
                        </span>{" "}
                        - Everything you need in one package
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 text-xl">⏰</span>
                      <p>
                        <span className="font-semibold text-yellow-400">
                          First-come, first-served
                        </span>{" "}
                        - Answer quickly to secure your slot!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* What You're Getting - Gadget Details Section */}
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    What You're Getting
                  </h2>
                  <p className="text-neutral-400 text-sm md:text-base">
                    Complete 5G SmartConnect Kit - Everything included
                  </p>
                </div>

                {/* Grid Layout for Gadgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {/* Antenna Card */}
                  <div className="relative bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-yellow-400/20 shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:border-yellow-400/40 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 mb-3">
                        <img
                          src="/antenna.png"
                          alt="5G Antenna"
                          className="w-full h-full object-contain drop-shadow-lg"
                        />
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                        5G Antenna
                      </h3>
                      <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                        High-gain directional antenna for optimal 5G signal
                        capture and coverage.
                      </p>
                    </div>
                  </div>

                  {/* Router Card */}
                  <div className="relative bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-yellow-400/20 shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:border-yellow-400/40 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 mb-3">
                        <img
                          src="/5grouter.png"
                          alt="5G Router"
                          className="w-full h-full object-contain drop-shadow-lg"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect fill='%23fbbf24' width='120' height='120'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23000' font-size='12'%3ERouter%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                        5G Router
                      </h3>
                      <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                        Advanced router with dual-band WiFi and intelligent signal
                        management.
                      </p>
                    </div>
                  </div>

                  {/* White Ethernet Cable Card */}
                  <div className="relative bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-yellow-400/20 shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:border-yellow-400/40 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 mb-3">
                        <img
                          src="/ethernet-white.png"
                          alt="Outdoor White Ethernet Cable"
                          className="w-full h-full object-contain drop-shadow-lg"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect fill='%23fbbf24' width='120' height='120'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23000' font-size='10'%3EEthernet%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                        Outdoor White Ethernet Cable
                      </h3>
                      <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                        Weather-resistant cable connecting router to antenna for
                        reliable signal transmission.
                      </p>
                    </div>
                  </div>

                  {/* Power Bank Card */}
                  <div className="relative bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-yellow-400/20 shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:border-yellow-400/40 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 mb-3">
                        <img
                          src="/powerbank.png"
                          alt="Power Bank"
                          className="w-full h-full object-cover drop-shadow-lg rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect fill='%23fbbf24' width='120' height='120'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23000' font-size='10'%3EPower Bank%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                        Power Bank
                      </h3>
                      <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                        High-capacity backup power to keep you connected 24/7,
                        even during outages.
                      </p>
                    </div>
                  </div>

                  {/* Yellow Ethernet Cable Card */}
                  <div className="relative bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-yellow-400/20 shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:border-yellow-400/40 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 mb-3">
                        <img
                          src="/ethernet-yellow.png"
                          alt="Yellow Ethernet Cable"
                          className="w-full h-full object-contain drop-shadow-lg"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect fill='%23fbbf24' width='120' height='120'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23000' font-size='10'%3EEthernet%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                        Yellow Ethernet Cable
                      </h3>
                      <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                        High-quality cable with RJ45 connectors for reliable wired
                        connections to your devices.
                      </p>
                    </div>
                  </div>

                  {/* Power Supply/Charger Card */}
                  <div className="relative bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-yellow-400/20 shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:border-yellow-400/40 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 mb-3">
                        <img
                          src="/charger.png"
                          alt="Power Supply/Charger"
                          className="w-full h-full object-contain drop-shadow-lg"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect fill='%23fbbf24' width='120' height='120'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23000' font-size='10'%3ECharger%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                        Power Supply/Charger
                      </h3>
                      <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                        Universal power adapter with UK plug, providing reliable
                        12V DC power for your devices.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
