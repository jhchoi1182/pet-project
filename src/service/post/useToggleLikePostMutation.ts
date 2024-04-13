import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setIsLike } from "@/stores/modules/authSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

function useToggleLikePostMutation(postId: number, dispatch: Dispatch<UnknownAction>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postApi.toggleLike(postId),
    onSuccess: () => {
      dispatch(setIsLike((prev: boolean) => !prev));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.post, postId] });
    },
  });
}

export default useToggleLikePostMutation;
