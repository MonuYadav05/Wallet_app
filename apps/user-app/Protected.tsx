"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && !pathname.startsWith("/signin")) {
      router.replace("/signin");
    }
    if(status === "authenticated" ){
      router.push("/dashboard")
    }
  }, [status, router]);

  // Show a loading screen while checking the session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
