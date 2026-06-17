import { TodoAppContextProvider } from "@/src/apps/TodoApp/TodoAppContext";
import TodoListApp from "@/src/apps/TodoApp/TodoListApp";
import { TodoWorkSpace } from "@/src/core/todolist/todo";

const workspace: TodoWorkSpace = {
  id: 1,
  title: "Work",
};
export default function Home() {
  return (
    <main className="w-screen h-dvh py-8">
      <TodoAppContextProvider
        initWorkSpaces={[workspace]}
        initTodoLists={[]}
        initTodos={[]}
        initWorkSpaceId={workspace.id}
      >
        <TodoListApp></TodoListApp>
      </TodoAppContextProvider>
    </main>
  );
}
