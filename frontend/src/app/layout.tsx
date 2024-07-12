import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500"
});

export const metadata: Metadata = {
  title: "Calculateur de cote",
  description: "Calculer votre cote rapidement!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
      <GoogleAnalytics gaId="G-8MKQKYQFY5" />
    </html>
  );
}
