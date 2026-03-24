import { useDispatch } from "react-redux";
import { setAuthModalOpen, setAuthModalView } from "@/store/userSlice";

export const useAuthModal = () => {
  const dispatch = useDispatch();

  const openLogin = () => {
    dispatch(setAuthModalView("login"));
    dispatch(setAuthModalOpen(true));
  };

  const openRegister = () => {
    dispatch(setAuthModalView("register"));
    dispatch(setAuthModalOpen(true));
  };

  return { openLogin, openRegister };
};
