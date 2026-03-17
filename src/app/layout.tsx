import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Sharma | Portfolio",
  description:
    "Software Engineer & ML Enthusiast. B.Tech CSE from GBPEC, skilled in Python, ML, and Cloud technologies.",
  keywords: [
    "Yash Sharma",
    "Portfolio",
    "Software Engineer",
    "Machine Learning",
    "Python",
    "Next.js",
  ],
  authors: [{ name: "Yash Sharma" }],
  openGraph: {
    title: "Yash Sharma | Portfolio",
    description: "Software Engineer & ML Enthusiast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`} style={{ background: "var(--background)", color: "var(--foreground)" }}>
        {children}
      </body>
    </html>
  );
}
