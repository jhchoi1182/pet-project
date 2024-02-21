import { todoApi } from "@/api/todoApi";
import { Todo } from "@/types/model/todo";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function useTodo(todoId: number) {
  return useQuery<Todo>({
    queryKey: ["todo", todoId],
    queryFn: () => todoApi.getTodo(todoId),
  });
}

export default useTodo;
