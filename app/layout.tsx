import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/lib/data-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Young Boys Football Academy | Forging Champions",
  description: "The premier football academy in Surulere, Lagos. Developing the next generation of football champions through discipline, hardwork, and consistency.",
  keywords: ["Football Academy", "Lagos", "Surulere", "Youth Football", "Nigeria", "Young Boys FA"],
  authors: [{ name: "Young Boys Football Academy" }],
  openGraph: {
    title: "Young Boys Football Academy",
    description: "Forging the next generation of football champions.",
    url: "https://youngboysfa.netlify.app",
    siteName: "Young Boys Football Academy",
    locale: "en_NG",
    type: "website",
  },
};

// This is the crucial part for mobile responsiveness!
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents iOS from zooming in when focusing on inputs
  themeColor: "#000000", // Matches your brand black for the mobile browser bar
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-white text-brand-black antialiased`}>
        <DataProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
