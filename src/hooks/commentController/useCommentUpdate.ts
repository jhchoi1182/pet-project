import { commentApi } from "@/api/commentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCommentUpdate(todoId: number, commentId: number, commentContents: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => commentApi.update(todoId, commentId, commentContents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", todoId] });
    },
  });
}

export default useCommentUpdate;
