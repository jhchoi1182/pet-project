import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { PostsResponse } from "@/types/response/postsResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function useUpdatePostViewMutation(postId: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ skipNameRemove }: { skipNameRemove: boolean }) => postApi.updateViews(postId),
    onSuccess: (data) => {
      const currentPage = sessionStorage.getItem("currentPage") ?? 1;
      const selectedCategory = sessionStorage.getItem("selectedCategory") ?? "전체";
      const prevPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, selectedCategory, +currentPage]);
      const updatedPosts = prevPosts?.content?.map((post) => (post.postId === postId ? { ...post, views: data } : post));
      queryClient.setQueryData([QUERY_KEY.posts, selectedCategory, +currentPage], { ...prevPosts, content: updatedPosts });
    },
  });

  useEffect(() => {
    mutation.mutate({ skipNameRemove: true });
  }, []);

  return mutation;
}

export default useUpdatePostViewMutation;
