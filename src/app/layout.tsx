import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import SplashWrapper from "@/components/layout/SplashWrapper";
import Navbar from "@/components/layout/Navbar";
import LiveTicker from "@/components/layout/LiveTicker";
import CompareBar from "@/components/layout/CompareBar";
import FloatingCompareBanner from "@/components/ui/FloatingCompareBanner";
import Toast from "@/components/layout/Toast";
import Footer from "@/components/layout/Footer";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WASM — منصة السيارات الفاخرة",
  description: "منصة السيارات الفاخرة الأولى في المملكة العربية السعودية. تصفح، قارن، وازايّد على أفضل السيارات الفاخرة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col" style={{ background: '#0B0B0D' }}>
        <SplashWrapper>
          <Navbar />
          <LiveTicker />
            <main className="flex-1 pt-[130px] sm:pt-[144px]">
            {children}
          </main>
          <Footer />
          <CompareBar />
          <Toast />
        </SplashWrapper>
        <FloatingCompareBanner />
      </body>
    </html>
  );
}
