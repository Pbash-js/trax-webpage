import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Trax",
  description:
    "Privacy Policy for Trax, the iOS Shortcut expense tracker. Covers data collection, Google OAuth scopes, and your rights.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#F8F6F2",
        color: "#111",
        minHeight: "100vh",
        fontFamily: "Georgia, 'Cormorant Garamond', serif",
      }}
    >
      {children}
    </div>
  );
}
