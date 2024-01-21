import { TodoContext } from "@/context/TodoContextProvider";
import { Todo } from "@/types/model/todo";
import { todoApi } from "@/api/todoApi";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import Link from "next/link";
import { useContext } from "react";
import Button from "../base/Button";

type TodoCardProps = {
  todo: Todo;
};

export default function TodoCard({ todo: { _id, contents, date, isDone } }: TodoCardProps) {
  const { totalTodo } = useContext(TodoContext);

  const updatedTodos = totalTodo?.todos?.map((todo: Todo) =>
    todo._id === _id ? { ...todo, isDone: !todo.isDone } : todo,
  );
  const deletedTodos = totalTodo?.todos?.filter((todo: Todo) => todo._id !== _id);

  const { mutate: updateMutate } = useUpdateFetch({
    queryKey: "todos",
    queryFn: () => todoApi.updateTodo({ _id, isDone }),
    optimisticData: updatedTodos,
    rollbackOnFail: true,
  });
  const { mutate: deleteMutate } = useUpdateFetch({
    queryKey: "todos",
    queryFn: () => todoApi.deleteTodo(_id),
    optimisticData: deletedTodos,
    rollbackOnFail: true,
  });

  return (
    <li className="flex flex-col w-72 h-60 border-[3px] border-teal-500 rounded-xl pt-3 px-6 pb-6 hover:shadow-lg">
      <div>
        <div className="flex justify-between items-center">
          <Link href={`/${_id}`} className="text-sky-600">
            상세보기
          </Link>
          <h2 className="py-2 font-bold">{date}</h2>
        </div>
        <p className="pb-2 line-clamp-3">{contents}</p>
      </div>
      <div className="flex gap-7 mt-auto pt-2">
        <Button variant="delete" size="small" onClick={() => deleteMutate({ _id, isDone })}>
          삭제하기
        </Button>
        <Button variant="update" size="small" onClick={() => updateMutate(_id)}>
          {isDone ? "취소" : "완료"}
        </Button>
      </div>
    </li>
  );
}
