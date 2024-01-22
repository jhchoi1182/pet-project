import { authApi } from "@/api/authApi";
import { cookieUtils } from "@/utils/cookieUtils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import exceptionService from "./exceptionService";

interface HandleLoginParametor {
  username: string;
  password: string;
}

interface HandleSignupParametor extends HandleLoginParametor {
  isPassDuplication: boolean;
  passwordConfirm: string;
}

const { setCookie, removeCookie } = cookieUtils();

const authService = (router: AppRouterInstance) => {
  async function handleUserLogin({ username, password }: HandleLoginParametor) {
    const isLoginValid = username.length < 2 && password.length < 4;

    if (isLoginValid) return alert("항목을 모두 확인해주세요.");

    try {
      const { data } = await authApi.userLogin(username, password);
      setCookie(data.result.token, { expires: 7 });
      router.push("/todo");
    } catch (error) {
      exceptionService(error);
    }
  }

  async function handleGuestLogin() {
    try {
      const { data } = await authApi.guestLogin();
      setCookie(data.result.token, { expires: 7 });
      router.push("/todo");
    } catch (error) {
      exceptionService(error);
    }
  }

  async function handleSignup({
    isPassDuplication,
    username,
    password,
    passwordConfirm,
  }: HandleSignupParametor) {
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
      exceptionService(error);
    }
  }

  async function handleWithdrawal() {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await authApi.withdraw();
        removeCookie();
        router.push("/todo");
      } catch (error) {
        exceptionService(error);
      }
    }
  }

  return { handleUserLogin, handleGuestLogin, handleSignup, handleWithdrawal };
};

export default authService;
