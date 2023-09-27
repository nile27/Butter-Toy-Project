import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, time: number) => {
  const expiresTime = new Date();

  return cookies.set(name, value, {
    maxAge: time - expiresTime.getTime(),
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
