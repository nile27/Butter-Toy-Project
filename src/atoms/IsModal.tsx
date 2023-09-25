import { atom } from "recoil";

export const isLoginModal = atom<boolean>({
  key: "isModalState",
  default: false,
});
