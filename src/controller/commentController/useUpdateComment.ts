import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateComment(postId: number, commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentContents: string) => commentApi.update(postId, commentId, commentContents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, postId] });
    },
  });
}

export default useUpdateComment;
