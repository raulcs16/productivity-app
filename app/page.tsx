import { TodoAppContextProvider } from "@/src/apps/TodoApp/TodoAppContext";
import TodoListApp from "@/src/apps/TodoApp/TodoListApp";
import {
  Todo,
  TodoList,
  TodoState,
  TodoWorkSpace,
} from "@/src/core/todolist/todo";

export const workspaces: TodoWorkSpace[] = [
  { id: 1, title: "Work" },
  { id: 2, title: "Personal" },
  { id: 3, title: "Side Hustle" },
];

export const todoLists: TodoList[] = [
  // --- Workspace 1: Work ---
  { id: 101, title: "Project Alpha", workSpaceId: 1 },
  { id: 102, title: "Core Bug Fixing", workSpaceId: 1 },
  { id: 103, title: "Design System Review", workSpaceId: 1 },

  // --- Workspace 2: Personal ---
  { id: 201, title: "Chest Workout", workSpaceId: 2 },
  { id: 202, title: "Weekly Groceries", workSpaceId: 2 },

  // --- Workspace 3: Side Hustle ---
  { id: 301, title: "SaaS MVP Dev", workSpaceId: 3 },
];

export const todos: Todo[] = [
  // --- Project Alpha (listId: 101) ---
  {
    id: 1,
    state: TodoState.Completed,
    task: "Finalize high-fidelity marketing assets",
    listId: 101,
  },
  {
    id: 2,
    state: TodoState.Started,
    task: "Draft internal company announcement memo",
    listId: 101,
  },
  {
    id: 3,
    state: TodoState.Ready,
    task: "Configure production environment secrets",
    listId: 101,
  },
  {
    id: 4,
    state: TodoState.Scheduled,
    task: "Schedule legal approval sync on updated terms of service",
    listId: 101,
  },

  // --- Core Bug Fixing (listId: 102) ---
  {
    id: 5,
    state: TodoState.Started,
    task: "Fix memory leak crashing navigation slider on iOS",
    listId: 102,
  },
  {
    id: 6,
    state: TodoState.Ready,
    task: "Resolve alignment mismatch in sliding dot navbar indicators",
    listId: 102,
  },
  {
    id: 7,
    state: TodoState.Completed,
    task: "Patch authentication session timeout edgecase",
    listId: 102,
  },
  {
    id: 8,
    state: TodoState.Archived,
    task: "Debug old legacy IE11 login layout crash",
    listId: 102,
  },

  // --- Design System Review (listId: 103) ---
  {
    id: 9,
    state: TodoState.Ready,
    task: "Audit primary button hover states for contrast guidelines",
    listId: 103,
  },
  {
    id: 10,
    state: TodoState.Scheduled,
    task: "Review unified squircle corner radius specs with team",
    listId: 103,
  },

  // --- Chest Workout (listId: 201) ---
  {
    id: 11,
    state: TodoState.Ready,
    task: "Incline Dumbbell Press (4 sets x 8-10 reps)",
    listId: 201,
  },
  {
    id: 12,
    state: TodoState.Started,
    task: "Flat Bench Barbell Warmup",
    listId: 201,
  },
  {
    id: 13,
    state: TodoState.Completed,
    task: "Cable Flyes high-to-low (3 sets x 12 reps)",
    listId: 201,
  },

  // --- Weekly Groceries (listId: 202) ---
  {
    id: 14,
    state: TodoState.Ready,
    task: "Organic whole milk & oat milk alternative",
    listId: 202,
  },
  {
    id: 15,
    state: TodoState.Completed,
    task: "Avocados & fresh baby spinach packs",
    listId: 202,
  },

  // --- SaaS MVP Dev (listId: 301) ---
  {
    id: 16,
    state: TodoState.Started,
    task: "Integrate Stripe billing webhooks inside controller API",
    listId: 301,
  },
  {
    id: 17,
    state: TodoState.Ready,
    task: "Set up database model structures for workspace tables",
    listId: 301,
  },
  {
    id: 18,
    state: TodoState.Scheduled,
    task: "Register staging DNS domain route pointers",
    listId: 301,
  },
];

export default function Home() {
  return (
    <main className="w-screen h-dvh pb-4">
      <TodoAppContextProvider
        initWorkSpaces={[]}
        initTodoLists={[]}
        initTodos={[]}
        initWorkSpaceId={0}
      >
        <TodoListApp></TodoListApp>
      </TodoAppContextProvider>
    </main>
  );
}
