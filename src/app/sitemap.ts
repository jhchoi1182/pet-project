import { postApi } from "@/api/postApi";
import { Post } from "@/types/model/post";

export default async function sitemap() {
  const data = await postApi.getAllPost();
  const pages = data.map((post: Post) => ({
    url: `https://www.studysync.store/post/${post.postId}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.5,
  }));

  return [
    {
      url: "https://www.studysync.store/home",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...pages,
  ];
}
