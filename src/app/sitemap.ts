import { fetchPostsServerSide } from "@/controller/postController/useGetPostsController";

export default async function sitemap() {
  const posts = await fetchPostsServerSide();
  const pages = posts.map((post) => ({
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
