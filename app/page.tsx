import TodoListApp from "@/src/apps/TodoListApp";
import { FDDirectory } from "@/src/core/flat-directory/directory";
import { TodoWorkSpace } from "@/src/core/todolist/todo";

const directory: FDDirectory = {
  id: 0,
  title: "New WorkSpace",
  files: [],
};
const workspace: TodoWorkSpace = {
  id: directory.id,
  title: directory.title,
  lists: [],
};
export default function Home() {
  return (
    <main className="w-screen h-screen px-1 py-10  bg-white dark:bg-black overflow-clip">
      <TodoListApp
        directories={[directory]}
        todoWorkSpace={workspace}
      ></TodoListApp>
    </main>
  );
}
