import { commentApi } from "@/api/commentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

function useCommentPost(todoId:number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: string) => commentApi.post(todoId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", todoId] });
    },
  });
}

export default useCommentPost;
