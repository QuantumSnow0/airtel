"use client";

import { useMemo } from "react";

export function FooterValentine() {
  const show = useMemo(
    () => new Date().getMonth() === 1, // February
    []
  );
  if (!show) return null;
  return (
    <p className="text-center text-sm text-rose-300/90 mb-2">
      Happy Valentine&apos;s Day 💕
    </p>
  );
}
