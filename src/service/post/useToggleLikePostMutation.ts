import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useToggleLikePostMutation(postId: number, setIsLike:SetStateBoolean) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postApi.toggleLike(postId),
    onSuccess: () => {
      setIsLike((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.post, postId] });
    },
  });
}

export default useToggleLikePostMutation;
