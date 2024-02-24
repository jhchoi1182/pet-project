import { todoApi } from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useTodoContentsUpdate(todoId: number, contents: string, dueDate: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => todoApi.modify(todoId, contents, dueDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
  });
}

export default useTodoContentsUpdate;
