import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { RootState } from "@/redux/store/store";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export function useGetPostsController() {
  const currentPage = useSelector(({ postSlice }: RootState) => postSlice.currentPage);

  return useQuery<PostsResponse>({
    queryKey: [QUERY_KEY.posts, currentPage],
    queryFn: () => postApi.getPosts(currentPage - 1),
    staleTime: 60 * 1000,
  });
}
