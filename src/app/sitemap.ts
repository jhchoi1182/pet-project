import { fetchPostsServerSide } from "@/controller/postController/useGetPostsController";

export default async function sitemap() {
  const posts = await fetchPostsServerSide();
  const pages = posts.map((post) => ({
    url: `https://study-sync-mu.vercel.app/post/${post.postId}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.5,
  }));

  return [
    {
      url: "https://study-sync-mu.vercel.app/home/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...pages,
  ];
}
