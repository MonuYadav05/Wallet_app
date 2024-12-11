
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import ProtectedRoute from "./Protected";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
         
         
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
           
            <Providers>
            <AppbarClient />
            <ProtectedRoute>
            <NextTopLoader
          showSpinner={true}
          height={4}
          color="#0074DE"
          crawl={true}
        />
            {children}
            
            <Toaster richColors expand={true} position="bottom-right" />
            </ProtectedRoute>
            </Providers>
          </div>
          
        </body>
      
    </html>
  );
}
