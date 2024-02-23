import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { Post } from "@/types/model/post";
import { useQuery } from "@tanstack/react-query";

function usePostsController() {
  return useQuery<Post[]>({
    queryKey: [QUERY_KEY.posts],
    queryFn: () => postApi.getPosts(),
  });
}

export default usePostsController;
