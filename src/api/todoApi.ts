import { instance } from "../config/axiosConfig";

export const todoApi = {
  getTodos: async () => {
    const { data } = await instance.get("/todo");
    return data?.result;
  },
  getTodo: async (todoId: number) => {
    const { data } = await instance.get(`/todo/${todoId}`);
    return data?.result;
  },
  post: async (contents: String, dueDate: String) => {
    const data = await instance.post("/todo", { contents, dueDate });
    return data;
  },
  toggleIsDone: async (todoId: number) => {
    const data = await instance.patch(`/todo/${todoId}`);
    return data;
  },
  modify: async (todoId: number, contents: String, dueDate: String) => {
    const data = await instance.put(`/todo/${todoId}`, { contents, dueDate });
    return data;
  },
  delete: async (todoId: number) => {
    const data = await instance.delete(`/todo/${todoId}`);
    return data;
  },
};
