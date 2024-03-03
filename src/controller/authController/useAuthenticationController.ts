import { authApi } from "@/api/authApi";
import useHandleError from "@/service/useHandleError";
import useAuthService from "@/service/useAuthService";

function useAuthenticationController() {
  const { setNickname } = useAuthService();
  const { handleError } = useHandleError();

  const fetchAuth = async () => {
    try {
      const { nickname } = await authApi.getUserInfo();
      setNickname(nickname);
    } catch (error) {
      handleError(error);
    }
  };

  return { fetchAuth };
}

export default useAuthenticationController;
