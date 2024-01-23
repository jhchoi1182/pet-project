import { commentApi } from "@/api/commentApi";
import Button from "@/components/base/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CommentDeleteButtonProps {
  todoId: number;
  commentId: number;
}

export default function CommentDeleteButton({ todoId, commentId }: CommentDeleteButtonProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => commentApi.delete(todoId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", todoId] });
    },
  });

  return (
    <Button variant="delete" size="small" onClick={() => mutate()}>
      삭제
    </Button>
  );
}
