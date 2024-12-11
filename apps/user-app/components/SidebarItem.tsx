"use client"
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "nextjs-toploader/app";
interface SidebarItemProps {
    href: string;
    title: string;
    icon: React.ReactNode;
  
  }

export const SidebarItem : React.FC<SidebarItemProps> = ({
  href,
  title,
  icon,
  
}) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href
    if(title !== "Logout"){
    return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={() => {
        
        router.push(href);
    }} >
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>}

    return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={() => {
        signOut()
    }}>
    <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
        </div>
}