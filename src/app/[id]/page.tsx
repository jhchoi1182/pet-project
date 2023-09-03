import Link from "next/link";
import { getDetail, getTodo } from "@/service/service";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export default async function DetailPage({ params: { id } }: DetailPageProps) {
  const todo = await getDetail(id);

  return (
    <section>
      <h1>제목: {todo.title}</h1>
      <p>내용: {todo.contents}</p>
      <Link href="/">뒤로가기</Link>
    </section>
  );
}

export async function generateStaticParams() {
  const todos = await getTodo();
  return todos?.map((todo) => ({ id: todo._id }));
}
