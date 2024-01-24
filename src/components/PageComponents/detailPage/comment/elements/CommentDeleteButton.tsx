import Button from "@/components/base/Button";
import useCommentDelete from "@/hooks/commentController/useCommentDelete";

interface CommentDeleteButtonProps {
  todoId: number;
  commentId: number;
}

export default function CommentDeleteButton({ todoId, commentId }: CommentDeleteButtonProps) {
  const { mutate } = useCommentDelete(todoId, commentId);

  return (
    <Button variant="delete" size="small" onClick={() => mutate()}>
      삭제
    </Button>
  );
}
