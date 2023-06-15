import Link from "next/link";
import { TodoSlug } from "./layout";

export default function DetailPage({ params: { slug } }: TodoSlug) {

  return (
    <section>
      {/* {todos?.map(
        (todo) =>
          todo.id === slug && (
            <>
              <h1>제목: {todo.title}</h1>
              <p>내용: {todo.contents}</p>
            </>
          )
      )} */}
      <Link href="/">뒤로가기</Link>
    </section>
  );
}
