import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { PostsResponse } from "@/types/response/postsResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCommentController(postId: number, commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => commentApi.delete(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, postId] });
      const currentPage = sessionStorage.getItem("currentPage") ?? 1;
      const prevPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, +currentPage]);
      const updatedPosts = prevPosts?.content?.map((post) => (post.postId === postId ? { ...post, commentsCount: post.commentsCount - 1 } : post));
      queryClient.setQueryData([QUERY_KEY.posts, +currentPage], { ...prevPosts, content: updatedPosts });
    },
  });
}

export default useDeleteCommentController;
