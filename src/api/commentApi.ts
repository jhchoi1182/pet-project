import { instance } from "../config/axiosConfig";

export const commentApi = {
  get: (todoId: number) => instance.get(`/todo/${todoId}/comment`),
  post: (todoId: number, comment: String) => instance.post(`/todo/${todoId}/comment`, { comment }),
};
