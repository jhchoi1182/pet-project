import { authApi } from "@/api/authApi";
import { cookieUtils } from "@/util/cookieUtils";
import exceptionService from "./exceptionService";
import axios from "axios";
import { HandleLoginParameter } from "@/types/parameter/authServiceParameter";
import { TEXT_COLOR } from "@/styles/colors";
import { SetStateString } from "@/types/type/utilityTypes";
import { AuthInputType } from "@/components/loginSignup/atom/ValidationText";

const isValidUsernameOrNickname = (value: string) =>
  value.length >= 2 && value.length <= 16;
const isValidEmail = (value: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
const isValidPassword = (value: string) =>
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/.test(value);
const { setCookie, removeCookie } = cookieUtils();

function authService() {
  const handleUserLogin = async ({
    username,
    password,
  }: HandleLoginParameter) => {
    const isLoginValid = username.length < 2 && password.length < 4;

    if (isLoginValid) return alert("항목을 모두 확인해주세요.");

    try {
      const { data } = await authApi.userLogin(username, password);
      setCookie(data.result.token, { expires: 7 });
    } catch (error) {
      handleError(error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const { data } = await authApi.guestLogin();
      setCookie(data.result.token, { expires: 7 });
    } catch (error) {
      handleError(error);
    }
  };

  const handleWithdrawal = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await authApi.withdraw();
        removeCookie();
      } catch (error) {
        handleError(error);
      }
    }
  };

  const changeValidationTextColor = (
    type: AuthInputType,
    value: string,
    setValidationTextColor: SetStateString,
    password?: string,
  ) => {
    if (value.length === 0) return setValidationTextColor(TEXT_COLOR.trans);

    let isValid = false;

    switch (type) {
      case "username":
      case "nickname":
        isValid = isValidUsernameOrNickname(value);
        break;
      case "email":
        isValid = isValidEmail(value);
        break;
      case "password":
        isValid = isValidPassword(value);
        break;
      case "passwordConfirm":
        isValid = password === value;
        break;
      default:
        isValid = false;
    }
    setValidationTextColor(isValid ? TEXT_COLOR.trans : TEXT_COLOR.red500);
  };

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      exceptionService(error);
    } else {
      console.error("An error occurred:", error);
    }
  };

  return {
    handleUserLogin,
    handleGuestLogin,
    changeValidationTextColor,
    handleError,
    handleWithdrawal,
  };
}

export default authService;
