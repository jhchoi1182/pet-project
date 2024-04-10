import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useToggleLikePostMutation(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postApi.toggleLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.post, postId] });
    },
  });
}

export default useToggleLikePostMutation;
