import Link from "next/link";
import { getDetail, getTodo } from "@/service/service";
import Button from "@/components/base/Button";
import TodoDetail from "@/components/TodoDetail";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export default async function DetailPage({ params: { id } }: DetailPageProps) {
  const todo = await getDetail(id);

  return (
    <section className="mt-10 flex justify-center">
      <TodoDetail todo={todo} />
    </section>
  );
}

export async function generateStaticParams() {
  const todos = await getTodo();
  return todos?.map((todo) => ({ id: todo._id }));
}
