"use client";

import Comments from "@/components/PageComponents/detailPage/comment/index/Comments";
import TodoDetail from "@/components/PageComponents/detailPage/todo/index/TodoDetail";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export default function DetailPage({ params: { id } }: DetailPageProps) {
  return (
    <section className="mt-10 flex flex-col items-center">
      <TodoDetail todoId={+id} />
      <Comments todoId={+id} />
    </section>
  );
}
