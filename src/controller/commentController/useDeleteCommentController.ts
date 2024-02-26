import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCommentController(postId: number, commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => commentApi.delete(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, postId] });
    },
  });
}

export default useDeleteCommentController;
