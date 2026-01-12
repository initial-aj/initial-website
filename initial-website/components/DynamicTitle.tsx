"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Base Title
    const baseTitle = "Initial Ventures";

    // 2. Check if we are on the homepage ("/")
    if (pathname === "/") {
      document.title = baseTitle;
    } else {
      // 3. For other pages, take the path (e.g., "/portfolio"),
      // remove the slash, capitalize the first letter, and format it.
      const pageName = pathname.substring(1); // "portfolio"
      const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1); // "Portfolio"
      
      document.title = `${formattedName} | ${baseTitle}`;
    }
  }, [pathname]);

  return null; 
}