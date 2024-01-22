import { instance } from "../config/axiosConfig";

export const commentApi = {
  get: (todoId: number) => instance.get(`/todo/${todoId}/comment`),
  post: (todoId: number, comment: String) => instance.post(`/todo/${todoId}/comment`, { comment }),
  update: (todoId: number, commentId: number, comment: String) =>
    instance.patch(`/todo/${todoId}/comment/${commentId}`, { comment }),
  delete: (todoId: number, commentId: number) =>
    instance.delete(`/todo/${todoId}/comment/${commentId}`),
};
