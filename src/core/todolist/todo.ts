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
