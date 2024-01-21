export interface Todo {
  todoId: number;
  contents: string;
  dueDate: string;
  isDone: boolean;
}

export interface Todos {
  todos: Todo[];
}
