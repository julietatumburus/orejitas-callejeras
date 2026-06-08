import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ORG } from "@/lib/config";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${ORG.name} — Adopciones`,
  description: ORG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-pink-50 text-stone-800">
        {children}
      </body>
    </html>
  );
}
