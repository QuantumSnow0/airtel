"use client";
import { useEffect, useState } from "react";
import TestMobilePage from "./mobile/page";
import TestDesktopPage from "./desktop/page";

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

  // Render immediately without blocking
  if (!mounted) {
    return <TestMobilePage />;
  }

  return isDesktop ? <TestDesktopPage /> : <TestMobilePage />;
}
