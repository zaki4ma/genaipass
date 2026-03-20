import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://genaipass.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "生成AIパスポート対策クイズ",
    template: "%s | 生成AIパスポート対策クイズ",
  },
  description:
    "生成AIパスポート試験（GUGA主催）の合格を目指す無料の問題演習Webアプリ。6分野300問・復習モード・60分模擬試験で本番に備えよう。",
  keywords: [
    "生成AIパスポート",
    "生成AI",
    "AI資格",
    "GUGA",
    "生成AIパスポート試験",
    "対策問題",
    "クイズ",
    "模擬試験",
  ],
  authors: [{ name: "genaipass" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "生成AIパスポート対策クイズ",
    title: "生成AIパスポート対策クイズ",
    description:
      "生成AIパスポート試験の合格を目指す無料の問題演習Webアプリ。6分野300問・復習モード・60分模擬試験で本番に備えよう。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "生成AIパスポート対策クイズ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "生成AIパスポート対策クイズ",
    description:
      "生成AIパスポート試験の合格を目指す無料の問題演習Webアプリ。6分野300問・復習モード・60分模擬試験で本番に備えよう。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-FVDJENQST6" />
    </html>
  );
}
