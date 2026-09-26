import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibed - Jobs for Vibe Coders",
  description: "Premium job board for AI Engineers and AI-Assisted Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
