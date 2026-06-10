import Explorer from "@/src/ui/flat-directory/Explorer";
import TodoListApp from "@/src/ui/todolist/TodoListApp";

export default function Home() {
  return (
    <main className="w-screen h-screen px-1 py-10  bg-white dark:bg-black overflow-clip">
      <TodoListApp></TodoListApp>
    </main>
  );
}
