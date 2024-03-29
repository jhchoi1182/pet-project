import { postApi } from "@/api/postApi";
import PostDetail from "@/components/postDetail/template/PostDetail";
import { Post } from "@/types/model/post";
import { Metadata } from "next";

interface Params {
  params: {
    id: string;
  };
}

export const revalidate = 60;

export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  const { title, contents } = await postApi.getPost(+id);
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
  const data = await postApi.getAllPost();
  return data?.map((post: Post) => ({ id: post.postId + "" }));
}
