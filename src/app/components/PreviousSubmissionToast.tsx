"use client";

import { useState, useEffect } from "react";
import CustomerResubmitModal from "./CustomerResubmitModal";

interface PreviousSubmissionToastProps {
  customerName: string;
  onViewClick: () => void;
  onDismiss: () => void;
}

export default function PreviousSubmissionToast({
  customerName,
  onViewClick,
  onDismiss,
}: PreviousSubmissionToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for animation
    }, 10000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  return (
    <>
      {/* Blurred backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" />
      
      {/* Toast */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-4 z-[10000]"
        style={{ animation: "slide-up 0.3s ease-out" }}
      >
        <div className="bg-neutral-800 border-2 border-yellow-400/40 rounded-xl shadow-2xl p-6 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <svg
              className="w-7 h-7 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-white mb-2">
              Previous Request Found
            </p>
            <p className="text-sm text-neutral-300 mb-4">
              We found a previous request for <span className="font-medium text-yellow-400">{customerName}</span>. Would you like to update it instead?
            </p>
            <div className="flex gap-3">
              <button
                onClick={onViewClick}
                className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg bg-yellow-400 hover:bg-yellow-500 text-neutral-900 transition-colors"
              >
                View & Update
              </button>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onDismiss, 300);
                }}
                className="px-4 py-2.5 text-sm font-semibold rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onDismiss, 300);
            }}
            className="flex-shrink-0 text-neutral-400 hover:text-white transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        </div>
      </div>
    </>
  );
}

