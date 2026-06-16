import TodoListApp from "@/src/apps/TodoListApp";
import { TodoWorkSpace } from "@/src/core/todolist/todo";

const workspace: TodoWorkSpace = {
  id: 0,
  title: "Work",
};
export default function Home() {
  return (
    <main className="w-screen h-screen  pb-10  bg-white dark:bg-black overflow-clip">
      <TodoListApp todoWorkSpace={workspace}></TodoListApp>
    </main>
  );
}
