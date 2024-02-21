import { todoApi } from "@/api/todoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useTodoToggleIsDone(todoId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => todoApi.toggleIsDone(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export default useTodoToggleIsDone;
