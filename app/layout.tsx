import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
// ✅ Import the new component
import DynamicTitle from "@/components/DynamicTitle"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Initial Ventures",
  description: "Initial Ventures is an innovative-focused fund.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/* ✅ Place the component here, right at the top of the body */}
        <DynamicTitle /> 
        {children}
      </body>
    </html>
  );
}