import { authApi } from "@/api/authApi";
import useHandleError from "@/service/hooks/useHandleError";
import useAuthManagementService from "@/service/auth/useAuthManagementService";

function useAuthenticationAxios() {
  const { setNickname } = useAuthManagementService();
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

export default useAuthenticationAxios;
