export enum todo_state {
  Scheduled,
  Ready,
  Started,
  Completed,
  Archived,
}

export type Todo = {
  id: number;
  state: todo_state;
  task: string;
};

export type TodoList = {
  id: number;
  title: string;
  todos: Todo[];
};
export type TodoWorkSpace = {
  id: number;
  title: string;
  lists: TodoList[];
};
