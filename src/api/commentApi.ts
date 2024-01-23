import { instance } from "../config/axiosConfig";

export const commentApi = {
  get: async (todoId: number) => {
    const { data } = await instance.get(`/todo/${todoId}/comment`);
    return data?.result;
  },
  post: async (todoId: number, comment: String) => {
    const data = await instance.post(`/todo/${todoId}/comment`, { comment });
    return data;
  },
  update: async (todoId: number, commentId: number, comment: String) => {
    const data = await instance.patch(`/todo/${todoId}/comment/${commentId}`, { comment });
    return data;
  },
  delete: async (todoId: number, commentId: number) => {
    const data = await instance.delete(`/todo/${todoId}/comment/${commentId}`);
    return data;
  },
};
