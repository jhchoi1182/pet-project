export interface PostWithoutContents {
  postId: number;
  catery: string;
  title: string;
  nickname: string;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Post extends PostWithoutContents {
  contents: string;
  images: string[];
}
