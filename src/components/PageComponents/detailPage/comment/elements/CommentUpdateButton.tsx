import { commentApi } from "@/api/commentApi";
import Button from "@/components/base/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => commentApi.update(todoId, commentId, commentContents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", todoId] });
    },
  });

  const handleUpdate = () => {
    if (commentContents === "") return;
    mutate();
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
