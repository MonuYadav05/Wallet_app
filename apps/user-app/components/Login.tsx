"use client";

import { useSigninInfo } from "@repo/store/useSigninInfo";
import { Button } from "@repo/ui/button";
import { useRouter } from "nextjs-toploader/app";
import {useState, useEffect} from "react";
import { useSetSigninInfo } from "@repo/store/useSigninInfo";
import { TextInput } from "@repo/ui/textinput";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion"

export const Login = () => {
const signinInfo = useSigninInfo();
  const router = useRouter();
  const [password, setPassword] = useState("");
 
  const setSigninInfo = useSetSigninInfo();

  const handleSignup = async (e?:React.FormEvent<HTMLFormElement>) => {
    const loadId = toast.loading('Signing In...');
    
    // console.log(loadId)
    if(e){
        e.preventDefault();
    }
    if(signinInfo.mobile.length !== 10){
        toast.error("invalid mobile number")
        setTimeout(() => {
            toast.dismiss(loadId);
          }, 100); 
        return;
    }

    // console.log(signinInfo);
    const res = await signIn('credentials',{
        phone : signinInfo.mobile,
        password : password, 
        redirect: false,
    })
    toast.dismiss(loadId);
    console.log(res);
    if (!res?.error) {
        router.push('/dashboard')
        toast.success('Signed In');
    }else {
        if (res.status === 401) {
          toast.error('Invalid Password, try again!');
        } else if (res.status === 400) {
          toast.error('Missing Credentials!');
        } else if (res.status === 404) {
          toast.error('Account not found!');
        } else if (res.status === 403) {
          toast.error('Forbidden!');
        } else {
          toast.error('oops something went wrong..!');
        }
      }
    
  };

  useEffect(() => {
    // console.log(signinInfo)
    if(signinInfo.mobile.length < 10){
        router.push("/signin")
    }
  },[signinInfo.mobile, router]) 

  return (
    <>
    <motion.div 
    initial={{ x: -80, opacity: 0.3 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      duration: 0.5,
      ease: 'easeInOut',
      type: 'spring',
      damping: 10,}}
    >
    <div className="border-2 border-slate-500 rounded-md p-10 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className=" font-extrabold text-3xl text-[#0074DE]">payTM Wallet</h1>
        <h2 className="font-semibold text-xl">Log in</h2>
        <div className="text-xl relative w-64 flex flex-col gap-3">
            <div className="text-sm text-center">+91 {signinInfo.mobile}    <Link href="/signup" className="ml-3 text-[#0074DE]">Change</Link></div>
          <TextInput placeholder="Enter Password" label="Password" onChange={(value)=> setPassword(value)}/>
          <div className="w-72">
          
    </div>
        </div>
      </div>
      <div className="mt-4">
        <Button
          onClick={() => {
            handleSignup();
          }}
        >
          Signin
        </Button>
      </div>
    </div>
    </motion.div>
    </>
  );
};
