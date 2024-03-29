import { QUERY_KEY } from "@/config/queyKeyConfig";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQueryClient } from "@tanstack/react-query";

function useMutationService(postId: number) {
  const queryClient = useQueryClient();

  function replaceFreshTitleCacheForPagination({ title }: { title: string }) {
    const currentPage = sessionStorage.getItem("currentPage") ?? 1;
    const prevPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, +currentPage]);
    const updatedPosts = prevPosts?.content?.map((post) => (post.postId === postId ? { ...post, title } : post));
    queryClient.setQueryData([QUERY_KEY.posts, +currentPage], { ...prevPosts, content: updatedPosts });
  }

  return { replaceFreshTitleCacheForPagination };
}

export default useMutationService;
