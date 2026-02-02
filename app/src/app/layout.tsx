import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parker Street Bonds — Trump Account Tracker",
  description:
    "Internal management portal for the Parker Street Ministries Trump Account Initiative",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
