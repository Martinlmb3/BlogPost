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
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full bg-gray-100 px-4 sm:px-6 lg:px-8`}
        >
          <Navbar />
          <main className="container mx-auto px-4 py-16">
            <section className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                Share Your Stories with the World
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Create beautiful blog posts with ease. BlogPost provides a simple and intuitive platform to bring your ideas to life with a title, an image, and a description.
              </p>
              <div className="mt-10">
                <a className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 inline-flex items-center" href="/dashboard/create">
                  Create a Post Now
                  <span className="material-icons ml-2">arrow_forward</span>
                </a>
              </div>
            </section>
          {children}
          </main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
