"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TestMobilePage from "./mobile/page";

// Dynamically import desktop page to reduce initial bundle size
const TestDesktopPage = dynamic(() => import("./desktop/page"), {
  ssr: false,
});

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check screen size immediately on client
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    // Set initial value immediately
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Render mobile first (SSR-friendly), then switch to desktop if needed after mount
  // This maintains original behavior while improving performance
  if (!mounted) {
    return <TestMobilePage />;
  }

  return isDesktop ? <TestDesktopPage /> : <TestMobilePage />;
}
