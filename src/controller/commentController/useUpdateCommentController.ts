import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { commentsAtom } from "@/stateStore/commentAtom";
import { Comment } from "@/types/model/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

function useUpdateCommentController(postId: number, commentId: number) {
  const setComments = useSetRecoilState(commentsAtom);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentContents: string) => commentApi.update(postId, commentId, commentContents),
    onMutate: (variables) => {
      const prevComments = queryClient.getQueryData<Comment[]>([QUERY_KEY.comments, postId]) ?? [];
      const updatedComments = prevComments?.map((data) => (data.commentId === commentId ? { ...data, comment: variables } : data));

      setComments(updatedComments);
      queryClient.setQueryData([QUERY_KEY.comments, postId], updatedComments);
      return { prevComments };
    },
    onError: (error, _, context) => {
      if (!context) return;
      if (context?.prevComments) {
        queryClient.setQueryData([QUERY_KEY.post, postId], context?.prevComments);
        setComments(context?.prevComments);
      }
    },
  });
}

export default useUpdateCommentController;
