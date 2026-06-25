import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ORG } from "@/lib/config";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://orejitas-callejeras.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${ORG.name} — Adopción de perros y gatos en Tucumán`,
    template: `%s — ${ORG.name}`,
  },
  description: ORG.description,
  keywords: [
    "adopción de perros",
    "adopción de gatos",
    "rescate animal",
    "Tucumán",
    "Orejitas Callejeras",
    "ser tránsito",
    "mascotas en adopción",
  ],
  openGraph: {
    title: ORG.name,
    description: ORG.description,
    url: baseUrl,
    siteName: ORG.name,
    locale: "es_AR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fdf6ec] text-stone-800">
        {children}
      </body>
    </html>
  );
}
