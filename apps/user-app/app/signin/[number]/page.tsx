import React from 'react'
import { OtpPage } from '../../../components/OtpPage'
import prisma from '@repo/db/client'
import { Center } from '@repo/ui/center';
import { redirect } from 'next/navigation';


export default async function Otp({params}:{params:{number:string}}) {
    const number = params.number;
    const otp = await prisma.otp.findFirst({
        where: {
            number: number,
        },
        select: {
            otp: true,
            expiresAt: true,
        }
    })
    if (!otp || otp.expiresAt < new Date()) {
        redirect("/signin");
    }
    if (otp.expiresAt < new Date()) {
        return <div>OTP expired</div>
    }
  return (
    <div className='md:w-screen mx-3 ms:mx-0 h-screen'> 
        <Center>
        <OtpPage realOtp={otp?.otp}/>
        </Center>
            </div>
  )
}

