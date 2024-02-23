import { authApi } from "@/api/authApi";
import { handleExecptionError } from "@/service/exceptionService";
import { cookieUtils } from "@/util/cookieUtils";
import React from "react";

const { removeCookie } = cookieUtils();

function withdrawController() {
  async function handleWithdraw() {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await authApi.withdraw();
        alert("정상적으로 탈퇴되었습니다.");
        removeCookie();
      } catch (error) {
        handleExecptionError(error);
      }
    }
  }
  return handleWithdraw;
}

export default withdrawController;
