"use client";

import { responseTodo } from "@/service/todo";
import { useState } from "react";
import { createContext } from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

type TodoContext = {
  todos: responseTodo[];
  setTodos: React.Dispatch<React.SetStateAction<responseTodo[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoContext = createContext<TodoContext>({
  todos: [],
  setTodos: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export default function TodoContextProvider({ children }: ChildrenProps) {
  const [todos, setTodos] = useState<responseTodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return <TodoContext.Provider value={{ todos, setTodos, isLoading, setIsLoading }}>{children}</TodoContext.Provider>;
}
