import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper  from "./components/Main/SessionProviderWrapper"
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anime Astral Presentation",
  description:"Explorează universul fascinant al animației japoneze prin Anime Astral o călătorie vizuală printre cele mai populare anime și lumi pline de energie cosmică, construite cu API-ul Jikan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
           <SessionProviderWrapper>{children}
             <Toaster position="top-right" reverseOrder={false} />
           </SessionProviderWrapper>
      </body>
    </html>
  );
}
