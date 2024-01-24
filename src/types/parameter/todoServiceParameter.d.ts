import { TodoWithoutId } from "../model/todo";
import { MutateVoid } from "../type/utilityTypes";

export type SetStateTodoInput = React.Dispatch<React.SetStateAction<TodoWithoutId>>;
export interface HandlePostParameter {
  enteredTodo: TodoWithoutId;
  setEnteredTodo: React.Dispatch<
    React.SetStateAction<{
      contents: string;
      dueDate: string;
    }>
  >;
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, TodoWithoutId, unknown>;
  event: React.FormEvent<HTMLFormElement>;
}
export interface HandleUpdateParameter {
  editableTodo: TodoWithoutId;
  mutate: MutateVoid;
  setToggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}
