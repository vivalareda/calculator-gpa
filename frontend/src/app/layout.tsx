import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "../components/PostHogProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Calculateur de cote",
  description: "Calculer votre cote rapidement!",
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
      <GoogleAnalytics gaId="G-8MKQKYQFY5" />
    </html>
  );
}
