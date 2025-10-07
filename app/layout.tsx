import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NASDANQ - Solana Meme Exchange",
  description:
    "The future of the digital economy. Trade meme tokens on Solana with professional-grade analytics and real-time data from Pump.fun.",
  keywords: [
    "NASDANQ",
    "Solana",
    "meme coins",
    "Pump.fun",
    "crypto",
    "meme trading",
    "DeFi",
  ],
  authors: [{ name: "NASDANQ Team" }],
  creator: "NASDANQ",
  publisher: "NASDANQ",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nasdanq.xyz",
    siteName: "NASDANQ",
    title: "NASDANQ - Solana Meme Exchange",
    description:
      "The future of the digital economy. Trade the present and future of expression.",
    images: [
      {
        url: "/og-image.png", // TODO: Create this when assets are provided
        width: 1200,
        height: 630,
        alt: "NASDANQ - Solana Meme Exchange",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NASDANQ - Solana Meme Exchange",
    description: "Trade the future of expression",
    images: ["/og-image.png"],
    creator: "@nasdanq", // TODO: Update with actual Twitter handle
  },
  metadataBase: new URL("https://nasdanq.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen">
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
