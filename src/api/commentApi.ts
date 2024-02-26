import { instance } from "../config/axiosConfig";

export const commentApi = {
  get: async (postId: number) => {
    const { data } = await instance.get(`/post/${postId}/comment`);
    return data?.result;
  },
  post: async (postId: number, comment: String) => {
    const data = await instance.post(`/post/${postId}/comment`, { comment });
    return data;
  },
  update: async (postId: number, commentId: number, comment: String) => {
    const data = await instance.patch(`/post/${postId}/comment/${commentId}`, { comment });
    return data;
  },
  delete: async (postId: number, commentId: number) => {
    const data = await instance.delete(`/post/${postId}/comment/${commentId}`);
    return data;
  },
};
