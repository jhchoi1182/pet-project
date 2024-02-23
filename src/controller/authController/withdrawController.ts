import { authApi } from "@/api/authApi";
import { handleExecptionError } from "@/service/exceptionService";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import { cookieUtils } from "@/util/cookieUtils";
import React from "react";
import { SetterOrUpdater } from "recoil";

interface WithdrawControllerParameter {
  setToggleDropdown: SetStateBoolean;
  setUsername: SetterOrUpdater<string | null>;
}

const { removeCookie } = cookieUtils();

function withdrawController() {
  async function handleWithdraw({ setToggleDropdown, setUsername }: WithdrawControllerParameter) {
    if (!window.confirm("정말 탈퇴하시겠습니까?")) return;
    try {
      await authApi.withdraw();
      alert("정상적으로 탈퇴되었습니다.");
      setUsername(null);
      setToggleDropdown(false);
      removeCookie();
    } catch (error) {
      handleExecptionError(error);
    }
  }
  return handleWithdraw;
}

export default withdrawController;
