import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuOpenAtom } from "../atoms/menuOpen";

export const useIsMenuOpen = () => {
    const isMenuOpen = useRecoilValue(menuOpenAtom); // Rename this variable
    return isMenuOpen;
};

export const useSetIsMenuOpen = () => {
    const setMenuOpen = useSetRecoilState(menuOpenAtom); // Rename this variable
    return setMenuOpen;
};
