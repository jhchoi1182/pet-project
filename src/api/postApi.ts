import { SortCategoryType } from "@/components/sidebar/atom/CategorySelect";
import { instance } from "../config/axiosConfig";

enum SearchTypeEnum {
  "제목+내용" = "all",
  "제목" = "title",
  "내용" = "contents",
  "작성자" = "nickname",
}
enum Category {
  "잡담" = "CHAT",
  "모집" = "RECRUIT",
  "정보" = "INFORMATION",
  "질문" = "QUESTION",
}
enum SearchCategory {
  "전체" = "all",
  "잡담" = "chat",
  "모집" = "recruit",
  "정보" = "information",
  "질문" = "question",
}
export type CategoryType = keyof typeof Category;

export const postApi = {
  getAllPost: async () => {
    const { data } = await instance.get(`/post/all`);
    return data?.result;
  },
  search: async (category: SortCategoryType, type: keyof typeof SearchTypeEnum, value: string, page: number, size: number = 9) => {
    const formattedCategory = SearchCategory[category];
    const formattedType = SearchTypeEnum[type];
    const encodedValue = encodeURIComponent(value);
    const { data } = await instance.get(
      `/post/search?category=${formattedCategory}&searchType=${formattedType}&value=${encodedValue}&page=${page}&size=${size}&sort=createdAt,desc`,
    );
    return data?.result;
  },
  getPost: async (postId: number) => {
    const { data } = await instance.get(`/post/${postId}`);
    return data?.result;
  },
  create: async (category: CategoryType, title: string, contents: string, images: string[]) => {
    const formattedCategory = Category[category];
    const data = await instance.post("/post", { category: formattedCategory, title, contents, images });
    return data;
  },
  update: async (postId: number, category: CategoryType, title: string, contents: string, images: string[]) => {
    const formattedCategory = Category[category];
    const data = await instance.patch(`/post/${postId}`, { category: formattedCategory, title, contents, images });
    return data;
  },
  delete: async (postId: number) => {
    const data = await instance.delete(`/post/${postId}`);
    return data;
  },
};
