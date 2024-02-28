import { authApi } from "@/api/authApi";
import useHandleError from "@/service/useHandleError";
import useAuthService from "@/service/useAuthService";
import { SetStateBoolean } from "@/types/type/utilityTypes";

function useWithdrawController() {
  const { removeNickname } = useAuthService();
  const { handleError } = useHandleError();
  async function handleWithdraw(setToggleDropdown: SetStateBoolean) {
    if (!window.confirm("정말 탈퇴하시겠습니까?")) return;
    try {
      await authApi.withdraw();
      alert("정상적으로 탈퇴되었습니다.");
      removeNickname();
      setToggleDropdown(false);
    } catch (error) {
      handleError(error);
    }
  }
  return { handleWithdraw };
}

export default useWithdrawController;
