"use client"; // Bu fayl klient komponenti bo‘ladi

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="file-transfer-theme">
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}