import { TodoContext } from "@/Context/TodoContextProvider";
import { __deleteTodo, __getTodo, __updateTodo, responseTodo } from "@/service/todo";
import Link from "next/link";
import { useContext } from "react";

type TodoCardProps = {
  todo: responseTodo;
};

const BUTTON_STYLE = "w-32 h-10 border-2 rounded-lg shadow-sm";

export default function TodoCard({ todo: { _id, title, contents, isDone } }: TodoCardProps) {
  const { todos, setTodos } = useContext(TodoContext);
  const isDoneChange = (id: string, isDone: boolean) => {
    __updateTodo(id, isDone);
    const changedTodos = todos.map((todo) => (todo._id === id ? { ...todo, isDone: !todo.isDone } : todo));
    setTodos(changedTodos);
  };

  const deleteTodo = (id: string) => {
    __deleteTodo(id);
    const deletedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(deletedTodos);
  };

  return (
    <li className="flex flex-col w-72 h-60 border-[3px] border-teal-500 rounded-xl pt-3 px-6 pb-6 hover:shadow-lg">
      <div>
        <Link href={`/${_id}`} className="text-sky-600">
          상세보기
        </Link>
        <h2 className="text-xl py-2 font-bold truncate">{title}</h2>
        <p className="pb-2 line-clamp-3">{contents}</p>
      </div>
      <div className="flex gap-7 mt-auto pt-2">
        <button className={`${BUTTON_STYLE} border-red-500`} onClick={() => deleteTodo(_id)}>
          삭제하기
        </button>
        <button className={`${BUTTON_STYLE} border-green-600`} onClick={() => isDoneChange(_id, isDone)}>
          {isDone ? "취소" : "완료"}
        </button>
      </div>
    </li>
  );
}
