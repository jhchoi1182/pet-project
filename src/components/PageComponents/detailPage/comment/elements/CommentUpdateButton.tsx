import { commentApi } from "@/api/commentApi";
import Button from "@/components/base/Button";
import { QueryContext } from "@/context/QueryContextProvider";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import exception from "@/service/exception";
import { Comment } from "@/types/model/comment";
import React, { useContext } from "react";

interface CommentUpdateButtonProps {
  todoId: number;
  commentId: number;
  commentContents: string;
  toggleEditMode: boolean;
  setToggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentUpdateButton({
  todoId,
  commentId,
  commentContents,
  toggleEditMode,
  setToggleEditMode,
}: CommentUpdateButtonProps) {
  const { totalData, setTotalData } = useContext(QueryContext);
  const comments = totalData[`comment_${todoId}`];

  const updatedComments = comments?.map((comment: Comment) =>
    comment.commentId === commentId ? { ...comment, comment: commentContents } : comment,
  );

  const { mutate: updateMutate } = useUpdateFetch({
    queryKey: `comment_${todoId}`,
    queryFn: () => commentApi.update(todoId, commentId, commentContents),
    onSuccess: () => {
      setTotalData((prev) => ({
        ...prev,
        [`comment_${todoId}`]: updatedComments,
      }));
    },
    onError: (error) => {
      exception(error);
    },
  });

  const handleUpdate = () => {
    if (commentContents === "") return;
    updateMutate();
    setToggleEditMode(false);
  };

  return (
    <>
      {toggleEditMode ? (
        <Button variant="update" size="small" onClick={handleUpdate}>
          완료
        </Button>
      ) : (
        <Button variant="update" size="small" onClick={() => setToggleEditMode(true)}>
          수정
        </Button>
      )}
    </>
  );
}
