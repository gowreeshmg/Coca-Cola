import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coca-Cola 3D Experience",
  description: "A hyper-realistic Coca-Cola landing page",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png", // Explicitly define the Apple Touch Icon for iOS Safari!
  },
  appleWebApp: {
    capable: true,
    title: "Coke", // Named exclusively 'Coke'
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
