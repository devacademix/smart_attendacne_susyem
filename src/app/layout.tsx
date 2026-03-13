import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Auth System — Face Authentication Attendance Platform",
  description:
    "Next-generation AI-powered face authentication and automated attendance system for institutions and enterprises. Real-time biometric verification at scale.",
  keywords: [
    "AI face authentication",
    "attendance system",
    "biometric verification",
    "facial recognition",
    "AI attendance",
    "smart attendance",
  ],
  openGraph: {
    title: "AI Auth System — Face Authentication Attendance Platform",
    description:
      "Next-generation AI-powered face authentication and automated attendance system for institutions and enterprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise">{children}</body>
    </html>
  );
}
