import type { Metadata } from "next";

import CustomCursor from "@/components/CustomCursor";

import "./globals.css";

export const metadata: Metadata = {
  title: "JGLOW | Premium Beauty Clinic",
  description:
    "JGLOW is a luxury editorial beauty clinic experience shaped with calm, restraint, and precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-canvas font-sans text-charcoal">
        <CustomCursor />
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
