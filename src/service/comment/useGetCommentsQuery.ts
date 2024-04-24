import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setComments } from "@/stores/modules/commentSlice";
import { RootState } from "@/stores/store/store";
import { Comment } from "@/types/model/comment";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetCommentsQuery(postId: number) {
  const comments = useSelector(({ commentSlice }: RootState) => commentSlice.comments);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const result = useQuery<Comment[]>({
    queryKey: [QUERY_KEY.comments, postId],
    queryFn: () => commentApi.get(postId),
  });
  const { data } = result;

  useEffect(() => {
    if (!data) return;
    dispatch(setComments(data));
    const initalTotalPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, "전체", 1]);
    if (!initalTotalPosts?.content) return;
    const currentPage = sessionStorage.getItem("currentPage") ?? 1;
    const selectedCategory = sessionStorage.getItem("selectedCategory") ?? "전체";
    const prevPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, selectedCategory, +currentPage]);
    const updatedPosts = prevPosts?.content?.map((post) => (post.postId === postId ? { ...post, commentsCount: data?.length } : post));
    queryClient.setQueryData([QUERY_KEY.posts, selectedCategory, +currentPage], { ...prevPosts, content: updatedPosts });
  }, [data]);

  return { comments, ...result };
}

export default useGetCommentsQuery;
