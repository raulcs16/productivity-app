"use client";
import { Todo, todo_state } from "@/src/core/todolist/todo";
import TodoListView from "./TodoListView";
import HoverCard from "../cards/HoverCard";
import TodoListWorkSpace from "./TodoListWorkSpace";

interface TodoListAppProps {}

const workTodos: Todo[] = [
  { task: "help1", state: todo_state.Scheduled, id: 1 },
  { task: "help1", state: todo_state.Scheduled, id: 2 },
  { task: "help1", state: todo_state.Scheduled, id: 3 },
  { task: "help2", state: todo_state.Ready, id: 2 },
  { task: "help2", state: todo_state.Ready, id: 21 },
  { task: "help2", state: todo_state.Ready, id: 22 },
  { task: "help2", state: todo_state.Ready, id: 23 },
  { task: "help3", state: todo_state.Started, id: 33 },
  { task: "help4", state: todo_state.Completed, id: 44 },
  { task: "help4", state: todo_state.Completed, id: 45 },
  { task: "help4", state: todo_state.Completed, id: 46 },
  { task: "help3", state: todo_state.Started, id: 31 },
  { task: "help3", state: todo_state.Started, id: 30 },
  { task: "help5", state: todo_state.Archived, id: 5 },
  { task: "help5", state: todo_state.Archived, id: 51 },
  { task: "help5", state: todo_state.Archived, id: 52 },
];
export default function TodoListApp(props: TodoListAppProps) {
  return (
    <TodoListWorkSpace
      title="Work"
      lists={[workTodos, workTodos, workTodos]}
    ></TodoListWorkSpace>
  );
}
