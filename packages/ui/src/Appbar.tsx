
import { useState } from "react";
import { Button } from "./button";




interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="md:text-3xl text-2xl py-2 flex flex-col  text-[#0074DE] font-extrabold justify-center"> 
            PayTM 
        </div>
        <div className="flex  flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
        
    </div>
}


const Mobilemenu = () => {
return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

}