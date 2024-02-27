import Cookies from "js-cookie";

export const cookieUtils = () => {
  const nickname = "nickname";

  const getCookie = (name: string = nickname) => {
    return Cookies.get(name);
  };
  const setCookie = (value: string, option?: any, name: string = nickname) => {
    return Cookies.set(name, value, { ...option });
  };
  const removeCookie = (name: string = nickname) => {
    return Cookies.remove(name);
  };

  return { getCookie, setCookie, removeCookie };
};
