import Button from "@/components/atoms/base/Button";
import useDeleteCommentController from "@/controller/commentController/useDeleteCommentController";

interface CommentDeleteButtonProps {
  todoId: number;
  commentId: number;
}

export default function CommentDeleteButton({ todoId, commentId }: CommentDeleteButtonProps) {
  const { mutate } = useDeleteCommentController(todoId, commentId);

  return (
    <Button variant="delete" size="small" onClick={() => mutate()}>
      삭제
    </Button>
  );
}
