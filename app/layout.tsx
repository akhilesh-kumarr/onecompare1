import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "oneCompare | Mock/Live Comparison Demo",
  description: "Compare demo prices, fares, deals, and recommendations across top platforms."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <div className="noise" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
