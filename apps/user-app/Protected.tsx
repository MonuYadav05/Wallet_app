"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/api/auth/signin");
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
