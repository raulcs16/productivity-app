export enum TodoState {
  Scheduled,
  Ready,
  Started,
  Completed,
  Archived,
}

export type Todo = {
  id: number;
  state: TodoState;
  task: string;
  listId: number;
};

export type TodoList = {
  id: number;
  title: string;
  workSpaceId: number;
};
export type TodoWorkSpace = {
  id: number;
  title: string;
};
