import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import { defaultMetaData } from "./meta";
import "./globals.css";

const Red_Had = Red_Hat_Text({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  ...defaultMetaData,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${Red_Had.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
