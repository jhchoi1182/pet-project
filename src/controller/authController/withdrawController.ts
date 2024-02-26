import { authApi } from "@/api/authApi";
import { handleExecptionError } from "@/service/exceptionService";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import { cookieUtils } from "@/util/cookieUtils";
import { SetterOrUpdater } from "recoil";

interface WithdrawControllerParameter {
  setToggleDropdown: SetStateBoolean;
  setLoggedInNickname: SetterOrUpdater<string | null>;
}

const { removeCookie } = cookieUtils();

function withdrawController() {
  async function handleWithdraw({ setToggleDropdown, setLoggedInNickname }: WithdrawControllerParameter) {
    if (!window.confirm("정말 탈퇴하시겠습니까?")) return;
    try {
      await authApi.withdraw();
      alert("정상적으로 탈퇴되었습니다.");
      setLoggedInNickname(null);
      setToggleDropdown(false);
      removeCookie();
    } catch (error) {
      handleExecptionError(error);
    }
  }
  return handleWithdraw;
}

export default withdrawController;
