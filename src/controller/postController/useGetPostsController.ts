import { postApi } from "@/api/postApi";
import { studySyncServerURL } from "@/config/envConfig";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { Post } from "@/types/model/post";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQuery } from "@tanstack/react-query";

export function useGetPostsController(currentPage: number) {
  return useQuery<PostsResponse>({
    queryKey: [QUERY_KEY.posts, currentPage],
    queryFn: () => postApi.getPosts(currentPage - 1),
  });
}