import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { Post } from "@/types/model/post";
import { useQuery } from "@tanstack/react-query";

export function useGetPostController(postId: number) {
  return useQuery<Post>({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => postApi.getPost(postId),
  });
}