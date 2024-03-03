import Link from "next/link";
import { __getTodo } from "@/service/todo";
import { __getDetail } from "@/service/detail";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export default async function DetailPage({ params: { id } }: DetailPageProps) {
  // const todo = await __getDetail(id);
  return (
    <section>
      {/* <h1>제목: {todo.title}</h1>
      <p>내용: {todo.contents}</p> */}
      <Link href="/">뒤로가기</Link>
    </section>
  );
}

// export async function generateStaticParams() {
//   const todos = await __getTodo();
//   return todos.map((todo) => ({ id: todo._id }));
// }
