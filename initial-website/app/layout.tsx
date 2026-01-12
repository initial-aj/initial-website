import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Ensure fonts match your imports
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

// --- UPDATE THIS SECTION ---
export const metadata: Metadata = {
  title: "Initial Ventures",
  description: "Initial Ventures is a quantitative hedge fund and venture capital firm.",
  icons: {
    icon: "/logo.png", // Optional: This sets your favicon (the small logo in the tab)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}