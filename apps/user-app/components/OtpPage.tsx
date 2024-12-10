"use client";

import { useState , useEffect } from "react";
import { useSetSigninInfo ,useSigninInfo } from "@repo/store/useSigninInfo";
import { Button } from "@repo/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {motion} from "framer-motion";

export const OtpPage = ({ realOtp }: { realOtp: number }) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const setSigninInfo = useSetSigninInfo();
  const signinInfo = useSigninInfo();
  
  useEffect(() => {
    if(signinInfo.mobile.length !== 10){
        router.push("/signin")
    }
  }, [])
  
  const handleSignup = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }
    if (Number(otp) !== realOtp) {
      toast.error("Wrong Otp");
      return;
    }
    setSigninInfo((prev) => ({ ...prev, otp: otp }));
    router.push("/signin/setPass");
  };

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
        <h2 className="font-semibold text-xl">SignUp</h2>
        <div className="text-xl relative">
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            required={true}
            placeholder="Enter OTP"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </div>

      <div className="mt-4">
        <Button
          onClick={() => {
            handleSignup();
          }}
        >
          Next
        </Button>
      </div>
    </div>
    </motion.div >
  );
};
