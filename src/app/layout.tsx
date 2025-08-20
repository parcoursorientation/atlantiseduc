import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motiver les élèves à apprendre - Atlantis Education",
  description: "10 techniques simples et efficaces pour réveiller la motivation des élèves. Ebook par Atlantis, expert en pédagogie moderne.",
  keywords: ["motivation élèves", "pédagogie", "éducation", "techniques d'apprentissage", "Atlantis Education", "enseignement"],
  authors: [{ name: "Atlantis" }],
  openGraph: {
    title: "Motiver les élèves à apprendre - Atlantis Education",
    description: "10 techniques simples et efficaces pour réveiller la motivation des élèves",
    url: "https://atlantis-education.com",
    siteName: "Atlantis Education",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motiver les élèves à apprendre",
    description: "10 techniques simples et efficaces pour réveiller la motivation des élèves",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
