import PostDetail from "@/components/postDetail/template/PostDetail";
import { Post } from "@/types/model/post";
import { Metadata } from "next";

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  const { result } = await fetch(`https://api.studysync.store/api/post/${id}`).then((res) => res.json());
  return {
    title: result?.title,
    description: result?.noHtmlContents,
  };
}

export default async function Detail({ params: { id } }: Params) {
  const getPost = await fetch(`https://api.studysync.store/api/post/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const { result: post } = await getPost.json();

  const getComment = await fetch(`https://api.studysync.store/api/post/${id}/comment`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const { result: comments } = await getComment.json();
  return (
    <main className={`relative w-[72%] min-w-[1098px] h-full`}>
      <PostDetail id={id} post={post} comments={comments} />
    </main>
  );
}

export async function generateStaticParams() {
  const { result } = await fetch(`https://api.studysync.store/api/post/all`).then((res) => res.json());
  return result.map((post: Post) => ({ id: post.postId.toString() }));
}
