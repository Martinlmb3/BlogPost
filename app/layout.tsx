import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/general/Navbar";
import { AuthProvider } from "@/components/general/AuthProvider";
import { Footer } from "@/components/general/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogPost",
  description: "Create, Post and Share you beatiful pictures",
  icons: {
    icon: '/logo.svg', // ou .png
    apple: '/logo.svg',
    shortcut: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full bg-gray-100`}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <Navbar />
            <main className="container mx-auto px-4 py-16">
            {children}
            </main>
          </div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
