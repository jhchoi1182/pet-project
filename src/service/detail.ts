import { responseTodo } from "./todo";

export async function __getDetail(id: string): Promise<responseTodo> {
  const response = await fetch(`/api/detail/${id}`);
  const { todos } = await response.json();
  return todos;
}