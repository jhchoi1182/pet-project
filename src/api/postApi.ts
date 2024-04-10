import { instance } from "../config/axiosConfig";
import { CategoryAtCreate, CategoryAtSearch, SearchType, UnionOfCategoryAtCreate, UnionOfCategoryAtSearch, UnionOfSearchType } from "@/types/type/post";

export const postApi = {
  setInitialViewRecordCookie: async () => {
    await instance.get(`/post/initializeViewRecord`);
  },
  getAllPost: async () => {
    const { data } = await instance.get(`/post/all`);
    return data?.result;
  },
  search: async (category: UnionOfCategoryAtSearch, type: UnionOfSearchType, value: string, page: number, size: number = 9) => {
    const formattedCategory = CategoryAtSearch[category];
    const formattedType = SearchType[type];
    const encodedValue = encodeURIComponent(value);
    const { data } = await instance.get(
      `/post/search?category=${formattedCategory}&searchType=${formattedType}&value=${encodedValue}&page=${page}&size=${size}&sort=createdAt,desc`,
    );
    return data?.result;
  },
  getPostForISR: async (postId: number) => {
    const { data } = await instance.get(`/post/isr/${postId}`);
    return data?.result;
  },
  getPost: async (postId: number) => {
    const { data } = await instance.get(`/post/${postId}`);
    return data?.result;
  },
  create: async (category: UnionOfCategoryAtCreate, title: string, contents: string, images: string[]) => {
    const formattedCategory = CategoryAtCreate[category];
    const data = await instance.post("/post", { category: formattedCategory, title, contents, images });
    return data;
  },
  update: async (postId: number, category: UnionOfCategoryAtCreate, title: string, contents: string, images: string[]) => {
    const formattedCategory = CategoryAtCreate[category];
    const data = await instance.patch(`/post/${postId}`, { category: formattedCategory, title, contents, images });
    return data;
  },
  delete: async (postId: number) => {
    const data = await instance.delete(`/post/${postId}`);
    return data;
  },
};
