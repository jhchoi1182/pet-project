import { todoApi } from "@/api/todoApi";
import { Todo } from "@/types/model/todo";
import { useQuery } from "@tanstack/react-query";

function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => todoApi.getTodos(),
  });
}

export default useTodos;
