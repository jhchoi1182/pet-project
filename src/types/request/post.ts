export enum SearchType {
  "제목+내용" = "all",
  "제목" = "title",
  "내용" = "contents",
  "작성자" = "nickname",
}
export type UnionOfSearchType = keyof typeof SearchType;

export enum CategoryAtCreate {
  "잡담" = "CHAT",
  "모집" = "RECRUIT",
  "정보" = "INFORMATION",
  "질문" = "QUESTION",
}
export type UnionOfCategoryAtCreate = keyof typeof CategoryAtCreate;

export enum CategoryAtSearch {
  "전체" = "all",
  "잡담" = "chat",
  "모집" = "recruit",
  "정보" = "information",
  "질문" = "question",
}
export type UnionOfCategoryAtSearch = keyof typeof CategoryAtSearch;
