import type { Metadata } from "next";
import { DataProvider } from "@/lib/data-context";
import FooterWrapper from "@/components/layout/FooterWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Young Boys Football Academy | Surulere, Lagos",
    template: "%s | Young Boys Football Academy",
  },
  description: "Forging the next generation of football champions through Discipline, Hardwork, and Consistency. Home of U12, U15, U17, and U20 teams in Surulere, Lagos.",
  keywords: ["Football Academy Lagos", "Surulere Soccer", "Youth Football Nigeria", "Young Boys Academy", "Football Training Lagos", "U17 Football Lagos"],
  authors: [{ name: "Young Boys Football Academy" }],
  openGraph: {
    title: "Young Boys Football Academy",
    description: "Forging the next generation of football champions in Surulere, Lagos. Join our U12, U15, U17, and U20 teams.",
    url: "https://young-boys-academy.vercel.app",
    siteName: "Young Boys Football Academy",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Young Boys Football Academy Training Session",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Young Boys Football Academy",
    description: "Forging the next generation of football champions in Surulere, Lagos.",
    images: ["https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&h=630&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DataProvider>
          {children}
          <FooterWrapper />
        </DataProvider>
      </body>
    </html>
  );
}
