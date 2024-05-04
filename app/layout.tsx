import type {Metadata} from "next";
import {Montserrat_Alternates} from "next/font/google";
import {Analytics} from "@vercel/analytics/react";

import Header from "@/components/Header";

import ConvexClientProvider from "./ConvexClientProvider";

const inter = Montserrat_Alternates({weight: "500", subsets: ["cyrillic"]});
import "./globals.css";
import Progress from "@/components/Progress";

export const metadata: Metadata = {
  title: "Travel Planner AI",
  description:
    "A smart travel planner for smart travel suggestions, and real-time destination insights.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center">
            {children}
            <Progress />
            <Analytics />
          </main>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
