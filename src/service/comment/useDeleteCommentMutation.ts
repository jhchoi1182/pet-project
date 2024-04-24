import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { PostsResponse } from "@/types/response/postsResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCommentMutation(postId: number, commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => commentApi.delete(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, postId] });
    },
  });
}

export default useDeleteCommentMutation;
