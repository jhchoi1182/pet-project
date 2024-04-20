"use client";

import { QUERY_KEY } from "@/config/queyKeyConfig";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function QueryInitializer() {
  const queryClient = useQueryClient();
  const initalTotalPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, "전체", 1]);

  useEffect(() => {
    if (initalTotalPosts) return;

    const removeInitalTotalPosts = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["posts", "전체", 1] });
    }, 300);

    return () => clearTimeout(removeInitalTotalPosts);
  }, []);
  return <></>;
}
