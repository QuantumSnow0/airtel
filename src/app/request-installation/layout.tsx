import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Installation | Airtel 5G Smart Connect",
  description:
    "Request your Airtel 5G Smart Connect installation. Fill in your details to schedule installation of high-speed 5G internet. Available in all 47 counties in Kenya.",
  openGraph: {
    title: "Request Installation | Airtel 5G Smart Connect",
    description:
      "Request your Airtel 5G Smart Connect installation. Fill in your details to schedule installation of high-speed 5G internet.",
    url: "https://www.airtel5grouter.co.ke/request-installation",
  },
  alternates: {
    canonical: "https://www.airtel5grouter.co.ke/request-installation",
  },
};

export default function RequestInstallationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
