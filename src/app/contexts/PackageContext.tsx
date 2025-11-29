"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PackageContextType = {
  selectedPackage: string;
  setSelectedPackage: (pkg: string) => void;
};

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export function PackageProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState("premium");

  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackage() {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error("usePackage must be used within a PackageProvider");
  }
  return context;
}
