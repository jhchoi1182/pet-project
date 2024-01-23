export interface TodoWithoutId {
  contents: string;
  dueDate: string;
}

export interface Todo extends TodoWithoutId {
  todoId: number;
  isDone: boolean;
}

export interface Todos {
  todos: Todo[];
}
