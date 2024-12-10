"use client"

import { Button } from '@repo/ui/button'
import React from 'react'
import { useRef } from "react";
import {useSetSigninInfo} from '@repo/store/useSigninInfo';
import { handleSendOtp } from '../app/lib/actions/sendOtp';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {motion} from "framer-motion";

const SignIn = () => {
    const phone = useRef("");
    const router = useRouter();
    const setSigninInfo = useSetSigninInfo();

  return (
    <motion.div
    initial={{ y: -80, opacity: 0.3 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      duration: 0.5,
      ease: 'easeInOut',
      type: 'keyframes',
      damping: 0,}}>
    <div className='border-2 border-slate-500 rounded-md p-10 flex flex-col items-center justify-center'> 
         <div className='flex flex-col gap-5 items-center justify-center'>
            <h1 className='font-extrabold text-[#0074DE] text-3xl'>payTM Wallet</h1>
            <h2 className='font-semibold text-xl'>Log in</h2>
            <div className=' text-xl relative'>
                <div className='absolute z-10  top-0 left-0 border-r-2 bg-slate-300 px-2 rounded-md text-md bottom-0 flex items-center w-12 justify-center'>{" "}+91</div>
                <input onChange={(e)=>{
                phone.current=e.target.value;
                setSigninInfo((prev) => ({...prev , mobile:phone.current}))
                 }} type="tel" required={true} placeholder="Enter your phone number" className='bg-gray-50 z-30 border pl-14 border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'></input>
            </div>
         </div>
       
         
       <div className='mt-4'>
       <Button onClick={() => {
            if(phone.current.length!==10){
                toast.error("Invalid phone number");
                return ;
            }
            handleSendOtp({phone:phone.current})

        }}>
            Next
        </Button>
       </div>
    </div>
    </motion.div>
  )
}

export default SignIn