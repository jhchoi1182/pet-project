import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreatCommentMutation(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: string) => commentApi.post(postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, postId] });
    },
  });
}

export default useCreatCommentMutation;
