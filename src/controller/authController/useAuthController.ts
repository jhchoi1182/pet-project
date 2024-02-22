import { authApi } from "@/api/authApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useQuery } from "@tanstack/react-query";

function useAuthController(token: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY.username],
    queryFn: () => authApi.getUserInfo(),
    enabled: token ? true : false,
  });
}

export default useAuthController;
