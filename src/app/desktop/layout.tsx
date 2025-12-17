import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "https://www.airtel5grouter.co.ke",
  },
};

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}








