export interface TodoWithoutId {
  contents: string;
  date: string;
  isDone: boolean;
}

export interface Todo extends TodoWithoutId {
  _id: string;
}

export interface Todos {
  todos: Todo[];
}
