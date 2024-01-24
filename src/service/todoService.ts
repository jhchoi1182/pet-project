import {
  HandlePostParameter,
  HandleUpdateParameter,
  SetStateTodoInput,
} from "@/types/parameter/todoServiceParameter";
import { InputEvent, MutateVoid } from "@/types/type/utilityTypes";

function todoService() {
  const handlePost = async ({
    enteredTodo: { contents, dueDate },
    setEnteredTodo,
    mutate,
    event,
  }: HandlePostParameter) => {
    event.preventDefault();
    if (contents === "" || dueDate === "") return;
    const todo = {
      contents,
      dueDate,
    };
    mutate(todo);
    setEnteredTodo({ contents: "", dueDate: "" });
  };

  const handleUpdate = ({ editableTodo, mutate, setToggleEditMode }: HandleUpdateParameter) => {
    const { contents, dueDate } = editableTodo;
    if (contents === "" || dueDate === "") return;
    mutate();
    setToggleEditMode(false);
  };

  const handleDelete = (mutate: MutateVoid) => {
    if (window.confirm("삭제하시겠습니까?")) {
      mutate();
    }
  };

  const handleInputChange = (event: InputEvent, setTodoInput: SetStateTodoInput) => {
    const { name, value } = event.target;
    if (name === "dueDate" && isPastDate(value)) {
      alert("과거의 날짜는 선택할 수 없습니다.");
    } else {
      setTodoInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isPastDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate < currentDate;
  };

  return { handlePost, handleUpdate, handleDelete, handleInputChange };
}

export default todoService;
