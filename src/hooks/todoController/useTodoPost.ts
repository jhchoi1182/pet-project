import { todoApi } from "@/api/todoApi";
import { TodoWithoutId } from "@/types/model/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useTodoPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contents, dueDate }: TodoWithoutId) => todoApi.post(contents, dueDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export default useTodoPost;
