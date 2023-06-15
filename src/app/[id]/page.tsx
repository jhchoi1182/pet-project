import Link from "next/link";
import { TodoId } from "./layout";

export default function DetailPage({ params: { id } }: TodoId) {

  return (
    <section>
      {/* {todos?.map(
        (todo) =>
          todo.id === id && (
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
