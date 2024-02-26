import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQuery } from "@tanstack/react-query";

function useGetPostsController(currentPage: number) {
  return useQuery<PostsResponse>({
    queryKey: [QUERY_KEY.posts, currentPage],
    queryFn: () => postApi.getPosts(currentPage),
  });
}

export default useGetPostsController;
