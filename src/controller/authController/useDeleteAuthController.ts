import { authApi } from "@/api/authApi";
import useHandleError from "@/service/useHandleError";
import useAuthService from "@/service/useAuthService";
import { SetStateBoolean } from "@/types/type/utilityTypes";

type ActionType = "logout" | "withdraw";

function useDeleteAuthController() {
  const { removeNickname } = useAuthService();
  const { handleError } = useHandleError();
  async function handleWithdraw(setToggleDropdown: SetStateBoolean, type: ActionType) {
    const isWithdraw = type === "withdraw";
    if (isWithdraw && !window.confirm("정말 탈퇴하시겠습니까?")) return;
    try {
      isWithdraw ? await authApi.withdraw() : await authApi.logout();
      alert(isWithdraw ? "정상적으로 탈퇴되었습니다." : "로그아웃되었습니다.");
      removeNickname();
    } catch (error) {
      handleError(error);
    } finally {
      setToggleDropdown(false);
    }
  }
  return { handleWithdraw };
}

export default useDeleteAuthController;
