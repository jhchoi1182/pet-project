export interface requestTodo {
  title: string;
  contents: string;
}

export interface responseTodo extends requestTodo {
  _id: string;
  isDone: boolean;
}

export async function getTodo(): Promise<responseTodo[]> {
  const response = await fetch("/api/");
  const data = await response.json();
  return data.todos;
}

export async function postTodo(data: requestTodo): Promise<responseTodo[]> {
  const todo = { ...data, isDone: false };
  const response = await fetch("/api/", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res.todos;
}
