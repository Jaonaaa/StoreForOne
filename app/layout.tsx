import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Red_Hat_Text({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "StoreForOne",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
