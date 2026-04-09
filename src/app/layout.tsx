import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trax — Expense tracking that gets out of your way",
  description:
    "Five seconds. One tap. Log expenses to your own Google Sheet with an iOS Shortcut. Your data, your Drive — not our servers.",
  metadataBase: new URL("https://trax.pragmatixstudio.com"),
  openGraph: {
    title: "Trax — Expense tracking that gets out of your way",
    description:
      "Five seconds. One tap. Your data lives in your own Google Sheet — not our servers.",
    url: "https://trax.pragmatixstudio.com",
    siteName: "Trax",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
