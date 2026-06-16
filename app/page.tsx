import { TodoAppContextProvider } from "@/src/apps/TodoApp/TodoAppContext";
import TodoListApp from "@/src/apps/TodoApp/TodoListApp";
import { TodoWorkSpace } from "@/src/core/todolist/todo";

const workspace: TodoWorkSpace = {
  id: 1,
  title: "Work",
};
export default function Home() {
  return (
    <main className="w-screen h-screen  pb-10  bg-white dark:bg-black overflow-clip">
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
