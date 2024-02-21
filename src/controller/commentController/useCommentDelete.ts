import { commentApi } from "@/api/commentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCommentDelete(todoId: number, commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => commentApi.delete(todoId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", todoId] });
    },
  });
}

export default useCommentDelete;
