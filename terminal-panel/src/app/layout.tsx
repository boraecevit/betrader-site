import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const loginMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-login-mono",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Bora Ecevit | BETRADER",
    template: "%s | BETRADER Terminal"
  },
  description: "Kapalı erişimli finansal terminal paneli.",
  icons: {
    icon: [
      {
        url: "/icon.svg?v=2",
        type: "image/svg+xml"
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#000000"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={loginMono.variable}>
      <body>{children}</body>
    </html>
  );
}
