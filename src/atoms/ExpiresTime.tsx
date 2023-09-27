import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "expiresTime",
  storage: sessionStorage,
});

export const expiresTime = atom<number>({
  key: "expiresTimeState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
