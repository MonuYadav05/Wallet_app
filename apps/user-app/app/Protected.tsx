"use client";

import { div } from "framer-motion/client";
import { useSession } from "next-auth/react";
import { usePathname} from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && !pathname.startsWith("/signin")) {
      router.replace("/signin");
    }
    if(status === "authenticated" && pathname.startsWith("/signin")){
      router.push("/transfer")
    }
  }, [status, router]);

  // Show a loading screen while checking the session
  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen min-w-screen">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-28 w-28 text-center"></div>

    </div>
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
