import { checkEnvironment, responseTodo } from "./todo";

export async function __getDetail(id: string): Promise<responseTodo> {
  const response = await fetch(checkEnvironment().concat(`/api/detail/${id}`));

  if (!response.ok) {
    throw new Error("상세 정보를 가져오는 데 실패했습니다.");
  }

  const { todo } = await response.json();
  return todo;
}
