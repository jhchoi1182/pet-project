import { instance } from "../config/axiosConfig";

enum SearchTypeEnum {
  "제목+내용" = "all",
  "제목" = "title",
  "내용" = "contents",
  "작성자" = "nickname",
}

export const postApi = {
  getAllPost: async () => {
    const { data } = await instance.get(`/post/all`);
    return data?.result;
  },
  search: async (type: keyof typeof SearchTypeEnum, value: string, page: number, size: number = 9) => {
    const queryType = SearchTypeEnum[type];
    const encodedValue = encodeURIComponent(value);
    const { data } = await instance.get(`/post/search?type=${queryType}&value=${encodedValue}&page=${page}&size=${size}&sort=createdAt,desc`);
    return data?.result;
  },
  getPost: async (postId: number) => {
    const { data } = await instance.get(`/post/${postId}`);
    return data?.result;
  },
  create: async (title: string, contents: string, images: string[]) => {
    const data = await instance.post("/post", { title, contents, images });
    return data;
  },
  update: async (postId: number, title: string, contents: string, images: string[]) => {
    const data = await instance.patch(`/post/${postId}`, { title, contents, images });
    return data;
  },
  delete: async (postId: number) => {
    const data = await instance.delete(`/post/${postId}`);
    return data;
  },
};
