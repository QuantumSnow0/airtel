"use client";

import { useEffect, useState } from "react";
import TestMobilePage from "./test-mobile/page";
import TestDesktopPage from "./test-desktop/page";

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return isDesktop ? <TestDesktopPage /> : <TestMobilePage />;
}
