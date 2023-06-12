import { createContext } from "react";

export type Todo = {
  id: string;
  isDone: boolean;
  title: string;
  contents: string;
};

type TodoContext = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoContext = createContext<TodoContext>({
  todos: [],
  setTodos: () => {},
});