"use client";

import { useMemo } from "react";

/** Show only in February (Valentine's period). Set to true to force show for testing. */
const FORCE_SHOW = false;

export default function ValentineBanner() {
  const show = useMemo(() => {
    if (FORCE_SHOW) return true;
    const d = new Date();
    return d.getMonth() === 1; // February (Valentine's period)
  }, []);

  if (!show) return null;

  return (
    <div
      className="relative overflow-hidden border-b border-rose-500/30 bg-gradient-to-r from-rose-950/90 via-rose-900/80 to-pink-950/90 text-center py-2 px-4"
      role="banner"
      aria-label="Valentine's Day message"
    >
      <p className="text-sm font-medium text-rose-100/95 flex items-center justify-center gap-2 flex-wrap">
        <span aria-hidden="true">💕</span>
        <span>
          Happy Valentine&apos;s Day — spread the love, get connected with
          Airtel 5G.
        </span>
        <span aria-hidden="true">💝</span>
      </p>
    </div>
  );
}
