"use client";

import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { postAtom } from "@/stateStore/postAtom";
import { Post } from "@/types/model/post";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function useGetPostController(postId: number) {
  const [post, setPost] = useRecoilState(postAtom);

  const { data, isLoading } = useQuery<Post>({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => postApi.getPost(postId),
  });

  useEffect(() => {
    if (!data) return;
    setPost(data);
  }, [data]);

  return { post, isLoading };
}
