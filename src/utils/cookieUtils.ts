import Cookies from "js-cookie";

export const cookieUtils = () => {
  const token = "ACCESS_TOKEN";

  const getCookie = (name: string = token) => {
    return Cookies.get(name);
  };
  const setCookie = (value: string, name: string = token, option?: any) => {
    return Cookies.set(name, value, { ...option });
  };
  const removeCookie = (name: string = token) => {
    return Cookies.remove(name);
  };

  return { getCookie, setCookie, removeCookie };
};
