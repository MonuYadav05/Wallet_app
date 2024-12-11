"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import nProgress from "nprogress";
import "nprogress/nprogress.css"; // Ensure the CSS for nProgress is imported

interface MyAppProps {
  children: React.ReactNode;
}

export default function MyApp({ children }: MyAppProps) {
  const pathname = usePathname(); // Track pathname changes

  useEffect(() => {
    nProgress.configure({ showSpinner: false }); // Disable spinner
    const handleRouteChangeStart = () => {
      nProgress.start(); // Start the progress bar
    };

    const handleRouteChangeComplete = () => {
      nProgress.done(); // Stop the progress bar
    };

    // Start the progress bar when the pathname changes
    handleRouteChangeStart();

    // Stop the progress bar once the pathname change completes
    handleRouteChangeComplete();

    // Return a cleanup function to reset progress if needed
    return () => {
      nProgress.done();
    };
  }, [pathname]); // Runs whenever pathname changes

  return <>{children}</>;
}
