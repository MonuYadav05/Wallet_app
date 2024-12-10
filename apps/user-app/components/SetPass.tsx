"use client";

import { useState, useEffect } from "react";
import { useSetSigninInfo, useSigninInfo } from "@repo/store/useSigninInfo";
import { Button } from "@repo/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TextInput } from "@repo/ui/textinput";
import { signIn } from "next-auth/react";
import {motion} from "framer-motion";

export const SetPass = () => {
  const signinInfo = useSigninInfo();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setSigninInfo = useSetSigninInfo();

  const handleSignup = async (e?:React.FormEvent<HTMLFormElement>) => {
    const loadId = toast.loading('Signing Up...');
    
    console.log(loadId)
    if(e){
        e.preventDefault();
    }
    if(!password || !confirmPassword){
        toast.error("required both fields")
        setTimeout(() => {
            toast.dismiss(loadId);
          }, 100); 
        return;
    }
    if(password !== confirmPassword){
        toast.error("confirm password not matching")
        setTimeout(() => {
            toast.dismiss(loadId);
          }, 100); 
        return;
    }
    if(signinInfo.mobile.length !== 10){
        toast.error("invalid mobile number")
        setTimeout(() => {
            toast.dismiss(loadId);
          }, 100); 
        return;
    }

     setSigninInfo((prev) => ({ ...prev, password: password }));
    console.log(signinInfo);
    const res = await signIn('credentials',{
        phone : signinInfo.mobile.trim(),
        password : password, 
        redirect: false,
    })
    toast.dismiss(loadId);
    if (!res?.error) {
      // router.push('/dashboard')
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
    console.log(res)
  };

  useEffect(() => {
    console.log(signinInfo)
    if(signinInfo.mobile =="" || signinInfo.otp == ""){
        router.push("/signin")
    }
  },[]) 

  return (
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
        <h1 className="font-extrabold text-[#0074DE] text-3xl">payTM Wallet</h1>
        <h2 className="font-semibold text-xl">Set Password</h2>
        <div className="text-xl relative w-64 flex flex-col gap-3">
          <TextInput placeholder="Set New Password" label="Password" onChange={(value)=> setPassword(value)}/>
          <TextInput placeholder="Confirm New Password" label="Confirm Password" onChange={(value)=> setConfirmPassword(value)}/>
        </div>
      </div>
      <div className="mt-4">
        <Button
          onClick={() => {
            handleSignup();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
    </motion.div>
  );
};
