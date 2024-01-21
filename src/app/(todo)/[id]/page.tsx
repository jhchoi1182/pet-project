import { getDetail, getTodo } from "@/service/service";
import TodoDetail from "@/components/PageComponents/detailPage/TodoDetail";
import Comments from "@/components/PageComponents/detailPage/Comments";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export default async function DetailPage({ params: { id } }: DetailPageProps) {
  const todo = await getDetail(id);

  return (
    <section className="mt-10 flex flex-col items-center">
      <TodoDetail todo={todo} />
      <Comments />
    </section>
  );
}

export async function generateStaticParams() {
  const todos = await getTodo();
  return todos?.map((todo) => ({ id: todo._id }));
}
