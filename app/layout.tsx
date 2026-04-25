import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Manrope, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Discover Olive: Your family's nutrition ally and powerful food scanner app",
  description:
    "Join a supportive community of over 200,000 users, get expert-backed insights, and simplify food choices. Olive's database consists of over 1 million products, 10,000 healthy-fats restaurants, and independently lab-tested foods so you can feed your family with confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${manrope.variable} ${dmSans.variable}`}
    >
      <body className="antialiased bg-white text-[#1F3824]">{children}</body>
    </html>
  );
}
