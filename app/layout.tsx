import type { Metadata } from "next";
import { DataProvider } from "@/lib/data-context";
import FooterWrapper from "@/components/layout/FooterWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Young Boys Football Academy | Surulere, Lagos",
  description: "Discipline, Hardwork, and Consistency. Home of U12, U15, U17, and U20 football excellence in Surulere, Lagos.",
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
