import { requestTodo } from "./todo";

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://next-todo-mu.vercel.app/";
  return base_url;
};

export const todoApi = {
  getTodo: () => fetch(checkEnvironment() + "api/todo"),
  postTodo: (todo: requestTodo) =>
    fetch(checkEnvironment() + "api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    }),
};
