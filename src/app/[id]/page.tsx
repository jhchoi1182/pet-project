import Link from "next/link";
import { __getTodo } from "@/service/todo";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export default async function DetailPage({ params: { id } }: DetailPageProps) {
  return (
    <section>
      <h1>제목: {id}</h1>
      <p>내용: {}</p>
      <Link href="/">뒤로가기</Link>
    </section>
  );
}

// export async function generateStaticParams() {
//   const todos = await __getTodo();
//   return todos.map((todo) => ({ id: todo._id }));
// }
