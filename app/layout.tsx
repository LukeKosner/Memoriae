import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./globals.css";
import Header from "@/components/header.tsx";
// eslint-disable-next-line camelcase
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

export const metadata = {
  title: "Memōriae",
  description: "Fighting Holocaust denial with the voices of survivors.",
};

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--ibm-plex-serif",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formFieldInput:
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          formFieldLabel:
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          formButtonPrimary:
            "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          socialButtonsBlockButton:
            "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
          headerTitle: "font-serif",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} font-sans flex flex-col min-h-screen`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
