import { Todo } from "@/types/model/todo";
import { checkEnvironment } from "../config/axiosConfig";

export async function getTodo(): Promise<Todo[] | []> {
  try {
    const response = await fetch(checkEnvironment() + "api/todo");
    if (!response.ok) {
      throw new Error("투두 불러오기에 실패했습니다.");
    }
    const { todos } = await response.json();
    return todos ?? [];
  } catch (error) {
    console.error("투두 GET :", error);
    throw new Error("투두 불러오기 중에 오류가 발생했습니다.");
  }
}

export async function getDetail(id: string): Promise<Todo> {
  const response = await fetch(checkEnvironment() + `api/detail/${id}`);

  if (!response.ok) {
    throw new Error("상세 정보를 가져오는 데 실패했습니다.");
  }

  const { todo } = await response.json();
  return todo;
}
