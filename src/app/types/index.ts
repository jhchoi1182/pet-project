export interface TodoWithoutId {
  title: string;
  contents: string;
  isDone: boolean;
}

export interface Todo extends TodoWithoutId {
  _id: string;
}
