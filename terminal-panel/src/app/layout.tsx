import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bora Ecevit | Sayısal Strateji Paneli",
  description: "Kapalı erişimli finansal terminal paneli."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
