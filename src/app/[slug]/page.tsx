"use client";

import { useContext } from "react";
import { TodoContext } from "@/utils/Context";
import Link from "next/link";

type TodoSlug = {
  params: {
    slug: string;
  };
};

export const generateMetadata = ({ params }: TodoSlug) => {
  return {
    title: `나의 TODO: ${params.slug}`,
  };
};

export default function DetailPage({ params: { slug } }: TodoSlug) {
  const { todos } = useContext(TodoContext);

  return (
    <section>
      {todos?.map(
        (todo) =>
          todo.id === slug && (
            <>
              <h1>제목: {todo.title}</h1>
              <p>내용: {todo.contents}</p>
            </>
          )
      )}
      <Link href="/">뒤로가기</Link>
    </section>
  );
}
