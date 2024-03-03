export interface requestTodo {
  title: string;
  contents: string;
}

export interface responseTodo extends requestTodo {
  id: string;
  isDone: boolean;
}

export const checkEnvironment = () => {
  let base_url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://localhost:3000";
  return base_url;
};

// NextResponse.json()으로 return할 경우 setState에서 타입 오류가 발생함

export async function __getTodo(): Promise<responseTodo[]> {
  try {
    const response = await fetch(checkEnvironment().concat("/api/todo"));
    if (!response.ok) {
      throw new Error("투두 불러오기에 실패했습니다.");
    }
    const { todos } = await response.json();
    return todos;
  } catch (error) {
    console.error("투두 GET :", error);
    throw new Error("투두 불러오기 중에 오류가 발생했습니다.");
  }
}

export async function __postTodo(data: requestTodo): Promise<responseTodo[]> {
  try {
    const todo = { ...data, isDone: false };
    const response = await fetch(checkEnvironment().concat("/api/todo"), {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("투두 작성에 실패했습니다.");
    }
    const { todos } = await response.json();
    return todos;
  } catch (error) {
    console.error("투두 POST :", error);
    throw new Error("투두 작성 중에 오류가 발생했습니다.");
  }
}

export async function __deleteTodo(id: string) {
  try {
    const response = await fetch(checkEnvironment().concat(`/api/todo/${id}`), {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("투두 삭제에 실패했습니다.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("투두 DELETE :", error);
    throw new Error("투두 삭제 중에 오류가 발생했습니다.");
  }
}

export async function __updateTodo(id: string, isDone: boolean): Promise<responseTodo> {
  const response = await fetch(checkEnvironment().concat(`/api/todo/${id}`), {
    method: "PATCH",
    body: JSON.stringify(isDone),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("투두 업데이트에 실패했습니다.");
  }
  const { updatedTodo } = await response.json();
  return updatedTodo;
}
