import { Todo } from "@/types/model/todo";
import Link from "next/link";
import Button from "../../atoms/base/Button";
import useTodoDelete from "@/controller/todoController/useTodoDelete";
import useTodoToggleIsDone from "@/controller/todoController/useTodoToggleIsDone";

type TodoCardProps = {
  todo: Todo;
};

export default function TodoCard({
  todo: { todoId, contents, dueDate, isDone },
}: TodoCardProps) {
  const { mutate: updateMutate } = useTodoToggleIsDone(todoId);
  const { mutate: deleteMutate } = useTodoDelete(todoId, "refetch");

  return (
    <li className="flex flex-col w-72 h-60 border-[3px] border-teal-500 rounded-xl pt-3 px-6 pb-6 hover:shadow-lg">
      <div>
        <div className="flex justify-between items-center">
          <Link href={`/todo/${todoId}`} className="text-sky-600">
            상세보기
          </Link>
          <h2 className="py-2 font-bold">{dueDate}</h2>
        </div>
        <p className="mt-3 pb-0 line-clamp-3 whitespace-pre-wrap">{contents}</p>
      </div>
      <div className="flex gap-7 mt-auto pt-2">
        <Button variant="delete" size="small" onClick={() => deleteMutate()}>
          삭제하기
        </Button>
        <Button variant="update" size="small" onClick={() => updateMutate()}>
          {isDone ? "취소" : "완료"}
        </Button>
      </div>
    </li>
  );
}
