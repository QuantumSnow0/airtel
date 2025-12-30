"use client";

import { useState, useEffect } from "react";
import CustomerResubmitModal from "./CustomerResubmitModal";

export default function CustomerResubmitBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add/remove class to body when modal opens/closes
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("customer-resubmit-modal-open");
    } else {
      document.body.classList.remove("customer-resubmit-modal-open");
    }
    
    return () => {
      document.body.classList.remove("customer-resubmit-modal-open");
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-xs sm:text-sm text-neutral-300 font-medium">
              Previously submitted?
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-yellow-400 hover:bg-yellow-500 text-neutral-900 transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] active:scale-95"
            >
              Update & Resubmit
            </button>
          </div>
        </div>
      </div>

      <CustomerResubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

