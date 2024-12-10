"use server";

const otpGenerator = require("otp-generator");
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";
const api = require("../../../api.js");

// Create an instance of the SMS API class
const smsApi = new api.SMSApi(process.env.YOUR_USERNAME, process.env.YOUR_API_KEY);

export async function handleSendOtp({ phone }: { phone: string }) {
  const otp = otpGenerator.generate(6, { 
    upperCaseAlphabets: false, 
    specialChars: false, 
    lowerCaseAlphabets: false 
  });

  if (phone.length < 10) {
    return { message: "Invalid phone number" };
  }

  const sendSMS = async (phone: string, message: string) => {
    
    try {
      // Create a message object
      const smsMessage = new api.SmsMessage();
      smsMessage.source = "payTM Wallet";
      smsMessage.body = message;
      smsMessage.to = "+91" + phone;

      // Create a message collection
      const smsCollection = new api.SmsMessageCollection();
      smsCollection.messages = [smsMessage];

      // Send the SMS
      const response = await smsApi.smsSendPost(smsCollection);
      console.log("SMS sent successfully:", response.body);

      // Upsert OTP to the database
      await prisma.otp.upsert({
        where: {
          number: phone,
        },
        create: {
          number: phone,
          otp: Number(otp),
          expiresAt: new Date(Date.now() + 1000 * 5 * 60),
        },
        update: {
          otp: Number(otp),
          expiresAt: new Date(Date.now() + 1000 * 5 * 60),
        },
      });

      return true; // Indicate success
    } catch (error) {
      console.error("Error sending SMS:", error);
      return false; // Indicate failure
    }
  };

//   check if user already exists
    const user = await prisma.user.findFirst({
        where: {
            number: phone,
        },
    })
    if(user){
        redirect(`/signin/login`);
    }
  // Send SMS
  const smsSent = await sendSMS(phone, `Your OTP for Login in payTM Wallet is ${otp}`);

  // Redirect only after successful OTP generation
  if (smsSent) {
    redirect(`/signin/${phone}`);
  } else {
    return { message: "Failed to send OTP" };
  }
}
