import { authApi } from "@/api/authApi";
import { cookieUtils } from "@/util/cookieUtils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import exceptionService from "./exceptionService";
import axios from "axios";

interface HandleLoginParametor {
  username: string;
  password: string;
}

interface HandleSignupParametor extends HandleLoginParametor {
  isPassDuplication: boolean;
  passwordConfirm: string;
}

const { setCookie, removeCookie } = cookieUtils();

function authService(router: AppRouterInstance) {
  const handleUserLogin = async ({ username, password }: HandleLoginParametor) => {
    const isLoginValid = username.length < 2 && password.length < 4;

    if (isLoginValid) return alert("항목을 모두 확인해주세요.");

    try {
      const { data } = await authApi.userLogin(username, password);
      setCookie(data.result.token, { expires: 7 });
      router.push("/todo");
    } catch (error) {
      handleError(error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const { data } = await authApi.guestLogin();
      setCookie(data.result.token, { expires: 7 });
      router.push("/todo");
    } catch (error) {
      handleError(error);
    }
  };

  const handleSignup = async ({
    isPassDuplication,
    username,
    password,
    passwordConfirm,
  }: HandleSignupParametor) => {
    const isSignupValid =
      !isPassDuplication ||
      username.length < 2 ||
      password.length < 4 ||
      password !== passwordConfirm;

    if (isSignupValid) return alert("항목을 모두 확인해주세요.");

    try {
      await authApi.signup(username, password, passwordConfirm);
      alert("회원가입 성공!");
      router.push("/login");
    } catch (error) {
      handleError(error);
    }
  };

  const handleWithdrawal = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await authApi.withdraw();
        removeCookie();
        router.push("/todo");
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      exceptionService(error);
    } else {
      console.error("An error occurred:", error);
    }
  };

  return { handleUserLogin, handleGuestLogin, handleSignup, handleWithdrawal };
}

export default authService;
