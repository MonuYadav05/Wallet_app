import { useRecoilValue, useSetRecoilState } from "recoil"
import { signinInfoAtom } from "../atoms/signinInfo"


export const useSigninInfo= () => {
    const signinInfo = useRecoilValue(signinInfoAtom);
    return signinInfo;
} 

export const useSetSigninInfo = () => {
    const setSigninInfo = useSetRecoilState(signinInfoAtom);
    return setSigninInfo;
}
