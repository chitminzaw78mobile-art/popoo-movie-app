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
  title: "POPOO Streaming - Movies & Series",
  description: "Watch your favorite movies, series, and anime on POPOO Streaming. Premium content at your fingertips.",
  keywords: ["Movies", "Series", "Anime", "Streaming", "Entertainment", "POPOO"],
  authors: [{ name: "POPOO Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "POPOO Streaming",
    description: "Watch your favorite movies, series, and anime",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
