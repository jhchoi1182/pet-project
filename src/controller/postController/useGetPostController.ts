"use client";

import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setPost } from "@/redux/modules/postSlice";
import { RootState } from "@/redux/store/store";
import { Post } from "@/types/model/post";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useGetPostController(postId: number) {
  const post = useSelector(({ postSlice }: RootState) => postSlice.post);
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery<Post>({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => postApi.getPost(postId),
  });

  useEffect(() => {
    if (!data) return;
    dispatch(setPost(data));
  }, [data]);

  return { post, isLoading };
}
