export interface PostWithoutContents {
  postId: number;
  title: string;
  nickname: string;
  commentsCount: number;
  createdAt: string;
}

export interface Post extends PostWithoutContents {
  contents: string;
}
