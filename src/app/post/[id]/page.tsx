import PostDetail from "@/components/postDetail/template/PostDetail";
import { fetchPostServerSide } from "@/controller/postController/useGetPostController";
import { fetchPostsServerSide } from "@/controller/postController/useGetPostsController";
import { Metadata } from "next";

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  const { title, contents } = await fetchPostServerSide(id);
  return {
    title,
    description: contents,
  };
}

export default function Detail({ params: { id } }: Params) {
  return (
    <main className={`relative w-[72%] min-w-[1098px] h-full`}>
      <PostDetail id={id} />
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await fetchPostsServerSide();
  return posts?.map((post) => ({ id: post.postId + "" }));
}
