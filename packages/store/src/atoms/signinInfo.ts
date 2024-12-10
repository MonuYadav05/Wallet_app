import { atom } from "recoil";


export const signinInfoAtom = atom({
    key:"signinInfo",
    default:{
        mobile:"",
        otp:"",
        password:"",
    }
})