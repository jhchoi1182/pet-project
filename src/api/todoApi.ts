import { instance } from "../config/axiosConfig";

export const todoApi = {
  getTodos: () => instance.get("/todo"),
  getTodo: (todoId: number) => instance.get(`/todo/${todoId}`),
  post: (contents: String, dueDate: String) => instance.post("/todo", { contents, dueDate }),
  toggleIsDone: (todoId: number) => instance.patch(`/todo/${todoId}`),
  modify: (todoId: number, contents: String, dueDate: String) =>
    instance.put(`/todo/${todoId}`, { contents, dueDate }),
  delete: (todoId: number) => instance.delete(`/todo/${todoId}`),
};
