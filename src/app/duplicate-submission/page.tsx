"use client";

import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function DuplicateSubmissionPage() {
  const [mounted, setMounted] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [robotAnimationState, setRobotAnimationState] = useState<
    "idle" | "speaking" | "waving"
  >("waving");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Get submission data from localStorage if available
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("duplicateSubmissionData");
      if (savedData) {
        try {
          setSubmissionData(JSON.parse(savedData));
          // Clear it after reading
          localStorage.removeItem("duplicateSubmissionData");
        } catch (e) {
          console.error("Error parsing submission data:", e);
        }
      }
    }
  }, []);

  // Speak duplicate message - wait for page to fully load
  useEffect(() => {
    if (!mounted || isMuted) return;

    const duplicateMessage =
      "You've already submitted a request with this information. We're already processing your previous submission. You don't need to submit again. Our team will contact you soon!";

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
            throw new Error("No audio data in response");
          }
        } else {
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

    // Delay speaking until page is fully loaded and rendered
    const timer = setTimeout(() => {
      speakText(duplicateMessage);
    }, 1500);

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
  }, [mounted, isMuted]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Function to mask phone numbers
  const maskPhoneNumber = (phone: string): string => {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "");
    if (digits.length <= 4) return "****";
    // Show first 2 and last 2 digits, mask the middle
    const start = digits.slice(0, 2);
    const end = digits.slice(-2);
    return `${start}****${end}`;
  };

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
        <a
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
        </a>
      </motion.div>

      <div className="px-4 py-8 md:py-12">
        {mounted && (
          <div className="max-w-2xl mx-auto">
            {/* Robot with Duplicate Message */}
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
                        ? "drop-shadow(0 0 20px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 10px rgba(251, 146, 60, 0.5))"
                        : "drop-shadow(0 0 10px rgba(251, 146, 60, 0.3))",
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
                  className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-neutral-900/90 border-2 border-orange-400/60 flex items-center justify-center hover:bg-neutral-800/90 transition-colors pointer-events-auto z-50"
                  style={{
                    boxShadow:
                      "0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px rgba(251, 146, 60, 0.2)",
                  }}
                  aria-label={isMuted ? "Unmute robot" : "Mute robot"}
                >
                  {isMuted ? (
                    <svg
                      className="w-3 h-3 text-orange-400"
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
                      className="w-3 h-3 text-orange-400"
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

              {/* Duplicate Message */}
              <h1
                className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #fb923c, #f97316, #fb923c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Duplicate Submission Detected
              </h1>
              <p className="text-lg md:text-xl text-neutral-300 mb-4 text-center">
                You've already submitted a request with similar information
              </p>
            </motion.div>

            {/* Submission Details */}
            {submissionData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-orange-400/20 shadow-[0_0_30px_rgba(251,146,60,0.1)] mb-6"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-orange-400">
                  Previous Submission Details
                </h2>
                <div className="space-y-3 text-neutral-300">
                  {submissionData.created_at && (
                    <div>
                      <span className="text-orange-400 font-medium">
                        Submission Date:
                      </span>{" "}
                      {formatDate(submissionData.created_at)}
                    </div>
                  )}
                  {submissionData.customer_name && (
                    <div>
                      <span className="text-orange-400 font-medium">Name:</span>{" "}
                      {submissionData.customer_name}
                    </div>
                  )}
                  {submissionData.airtel_number && (
                    <div>
                      <span className="text-orange-400 font-medium">
                        Airtel Number:
                      </span>{" "}
                      {maskPhoneNumber(submissionData.airtel_number)}
                    </div>
                  )}
                  {submissionData.alternate_number && (
                    <div>
                      <span className="text-orange-400 font-medium">
                        Alternate Number:
                      </span>{" "}
                      {maskPhoneNumber(submissionData.alternate_number)}
                    </div>
                  )}
                  {submissionData.email && (
                    <div>
                      <span className="text-orange-400 font-medium">Email:</span>{" "}
                      {submissionData.email}
                    </div>
                  )}
                  {submissionData.preferred_package && (
                    <div>
                      <span className="text-orange-400 font-medium">
                        Package:
                      </span>{" "}
                      {submissionData.preferred_package}
                    </div>
                  )}
                  {submissionData.installation_town && (
                    <div>
                      <span className="text-orange-400 font-medium">
                        Installation Town:
                      </span>{" "}
                      {submissionData.installation_town}
                    </div>
                  )}
                  {submissionData.submission_status && (
                    <div>
                      <span className="text-orange-400 font-medium">Status:</span>{" "}
                      <span className="capitalize">
                        {submissionData.submission_status}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Information Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mb-6"
            >
              <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-md mx-auto mb-6">
                Our team is already processing your previous request. You don't
                need to submit again. We'll contact you soon!
              </p>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-sm md:text-base text-neutral-500 mb-3">
                For enquiries, contact us:
              </p>
              <a
                href="tel:+254733100500"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
                <span className="text-lg md:text-xl font-medium">
                  0733 100 500
                </span>
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

