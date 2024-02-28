import PostDetail from "@/components/postDetail/template/PostDetail";

interface Params {
  params: {
    id: string;
  };
}

export default function Detail({ params: { id } }: Params) {
  return (
    <main className={`relative w-[72%] min-w-[1098px] h-full`}>
      <PostDetail id={id} />
    </main>
  );
}
