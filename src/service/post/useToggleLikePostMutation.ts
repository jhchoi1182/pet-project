import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setIsLike } from "@/stores/modules/authSlice";
import { setPostLikes } from "@/stores/modules/postSlice";
import { RootState } from "@/stores/store/store";
import { PostsResponse } from "@/types/response/postsResponse";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

function useToggleLikePostMutation(postId: number, dispatch: Dispatch<UnknownAction>) {
  const isLike = useSelector(({ authSlice }: RootState) => authSlice.isLike);
  const likes = useSelector(({ postSlice }: RootState) => postSlice.postLikes);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postApi.toggleLike(postId),
    onSuccess: () => {
      const updatedLikes = isLike ? likes - 1 : likes + 1;
      dispatch(setIsLike(!isLike));
      dispatch(setPostLikes(updatedLikes));
      const currentPage = sessionStorage.getItem("currentPage") ?? 1;
      const selectedCategory = sessionStorage.getItem("selectedCategory") ?? "전체";
      const prevPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, selectedCategory, +currentPage]);
      const updatedPosts = prevPosts?.content?.map((post) => (post.postId === postId ? { ...post, likes: updatedLikes } : post));
      queryClient.setQueryData([QUERY_KEY.posts, selectedCategory, +currentPage], { ...prevPosts, content: updatedPosts });
    },
  });
}

export default useToggleLikePostMutation;
