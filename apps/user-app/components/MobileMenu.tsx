
"use client"


import { menuOpenAtom } from "@repo/store/menuOpenAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {motion} from "framer-motion";

const Mobilemenu = () => {
 
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
}
export const MobileMenu = () => {
    const menuOpen = useRecoilValue(menuOpenAtom);
    const setIsMenuOpen = useSetRecoilState(menuOpenAtom);
 
    return <motion.div
    initial={{ x: -80, opacity: 0.3 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      duration: 0.5,
      ease: 'easeInOut',
      type: 'spring',
      damping: 10,}}>
        <div className="flex md:hidden flex-col w-screen item-center text-center justify-center ml-10 pt-2" onClick={() => setIsMenuOpen(!menuOpen) } > <Mobilemenu /> </div>
        </motion.div>
}

// Icons Fetched from https://heroicons.com/