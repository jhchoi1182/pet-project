import { TodoWithoutId } from "@/app/types";

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://next-todo-mu.vercel.app/";
  return base_url;
};

export const todoApi = {
  getTodo: () => fetch(checkEnvironment() + "api/todo"),
  postTodo: (todo: TodoWithoutId) =>
    fetch(checkEnvironment() + "api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    }),
  updateTodo: ({ _id, isDone }: { _id: string; isDone: boolean }) =>
    fetch(checkEnvironment() + `api/todo/${_id}`, {
      method: "PATCH",
      body: JSON.stringify(isDone),
      headers: {
        "Content-Type": "application/json",
      },
    }),
  deleteTodo: (id: string) =>
    fetch(checkEnvironment() + `api/todo/${id}`, {
      method: "DELETE",
    }),
};
