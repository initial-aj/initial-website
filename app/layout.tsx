import type { Metadata } from "next";
import "./globals.css";
// ✅ Import the new component
import DynamicTitle from "@/components/DynamicTitle";

export const metadata: Metadata = {
  title: "Initial Ventures",
  description: "Initial Ventures is a quantitative hedge fund.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans" style={{ fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)' }}>
        {/* ✅ Place the component here, right at the top of the body */}
        <DynamicTitle />
        {children}
      </body>
    </html>
  );
}