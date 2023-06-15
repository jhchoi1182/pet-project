export interface requestTodo {
  title: string;
  contents: string;
}

export interface responseTodo extends requestTodo {
  _id: string;
  isDone: boolean;
}

// NextResponse.json()으로 return할 경우 setState에서 타입 오류가 발생함

export async function __getTodo(): Promise<responseTodo[]> {
  const response = await fetch("/api");
  const { todos } = await response.json();
  return todos;
}

export async function __postTodo(data: requestTodo): Promise<responseTodo[]> {
  const todo = { ...data, isDone: false };
  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { todos } = await response.json();
  return todos;
}

export async function __deleteTodo(id: string) {
  const response = await fetch(`/api/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}
