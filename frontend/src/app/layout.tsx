import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VERA — AI Compliance Intelligence",
  description: "Self-hosted AI risk and compliance platform for financial institutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
