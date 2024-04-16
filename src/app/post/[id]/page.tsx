import PostDetail from "@/components/postDetail/template/PostDetail";
import { studySyncServerURL } from "@/config/envConfig";
import { Post } from "@/types/model/post";
import { Metadata } from "next";

interface Params {
  params: {
    id: string;
  };
}

export const revalidate = 60;

export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  const { result } = await fetch(`${studySyncServerURL}/post/${id}`).then((res) => res.json());
  return {
    title: result?.title,
    description: result?.noHtmlContents,
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
  const { result } = await fetch(`${studySyncServerURL}/post/all`).then((res) => res.json());
  return result.map((post: Post) => ({ id: post.postId.toString() }));
}
