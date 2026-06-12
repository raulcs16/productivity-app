import TodoListApp from "@/src/apps/TodoListApp";
import { FDDirectory } from "@/src/core/flat-directory/directory";
import { Todo, todo_state, TodoWorkSpace } from "@/src/core/todolist/todo";
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

const mockDirectories: FDDirectory[] = [
  {
    id: 1,
    title: "Root Workspace",
    files: [
      { id: 101, title: "index.tsx" },
      { id: 102, title: "globals.css" },
      { id: 103, title: "tailwind.config.js" },
    ],
  },
  {
    id: 2,
    title: "Core Components",
    files: [
      { id: 201, title: "SlideOver.tsx" },
      { id: 202, title: "Grid.tsx" },
      { id: 203, title: "GridToggle.tsx" },
      { id: 204, title: "TodoListView.tsx" },
    ],
  },
  {
    id: 3,
    title: "Assets & Images",
    files: [
      { id: 301, title: "logo.svg" },
      { id: 302, title: "avatar-placeholder.png" },
    ],
  },
  {
    id: 4,
    title: "Empty Directory",
    files: [],
  },
];
const workspace: TodoWorkSpace = {
  id: mockDirectories[0].id,
  title: mockDirectories[0].title,
  lists: [
    {
      id: mockDirectories[0].files[0].id,
      title: mockDirectories[0].files[0].title,
      todos: workTodos,
    },
    {
      id: mockDirectories[1].files[1].id,
      title: mockDirectories[1].files[1].title,
      todos: workTodos,
    },
  ],
};
export default function Home() {
  return (
    <main className="w-screen h-screen px-1 py-10  bg-white dark:bg-black overflow-clip">
      <TodoListApp
        directories={mockDirectories}
        todoWorkSpace={workspace}
      ></TodoListApp>
    </main>
  );
}
