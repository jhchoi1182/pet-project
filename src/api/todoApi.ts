import { instance } from "../config/axiosConfig";

export const todoApi = {
  get: () => instance.get("/todo"),
  post: (contents: String, dueDate: String) => instance.post("/todo", { contents, dueDate }),
  toggleIsDone: (todoId: number) => instance.patch(`/todo/${todoId}`),
  delete: (todoId: number) => instance.delete(`/todo/${todoId}`),
};
