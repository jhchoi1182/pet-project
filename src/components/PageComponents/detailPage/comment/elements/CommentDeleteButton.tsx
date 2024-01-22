import { commentApi } from "@/api/commentApi";
import Button from "@/components/base/Button";
import { QueryContext } from "@/context/QueryContextProvider";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import exceptionService from "@/service/exceptionService";
import { Comment } from "@/types/model/comment";
import React, { useContext } from "react";

interface CommentDeleteButtonProps {
  todoId: number;
  commentId: number;
}

export default function CommentDeleteButton({ todoId, commentId }: CommentDeleteButtonProps) {
  const { totalData } = useContext(QueryContext);
  const comments = totalData[`comment_${todoId}`];
  const deletedComments = comments?.filter((comment: Comment) => comment.commentId !== commentId);

  const { mutate } = useUpdateFetch({
    queryKey: `comment_${todoId}`,
    queryFn: () => commentApi.delete(todoId, commentId),
    optimisticData: deletedComments,
    rollbackOnFail: true,
    onError: (error) => {
      exceptionService(error);
    },
  });

  return (
    <Button variant="delete" size="small" onClick={() => mutate()}>
      삭제
    </Button>
  );
}
