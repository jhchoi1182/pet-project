export interface PostWithoutContents {
  postId: number;
  category: Category;
  title: string;
  nickname: string;
  commentsCount: number;
  view: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}
type Category = "CHAT" | "RECRUIT" | "INFORMATION" | "QUESTION";

export interface Post extends PostWithoutContents {
  contents: string;
  images: string[];
}
