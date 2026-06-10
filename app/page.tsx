import TodoListApp from "@/src/ui/todolist/TodoListApp";

export default function Home() {
  return (
    <main className="w-screen h-screen p-10  bg-white dark:bg-black overflow-clip">
      <TodoListApp></TodoListApp>
    </main>
  );
}
