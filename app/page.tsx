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
    <main className="w-screen h-screen  pb-10  bg-white dark:bg-black overflow-clip">
      <header className="w-full h-2 bg-[#FFFFFF01] backdrop-blur-sm shadow-[0_8px_44px_-33px_rgba(0,0,0,0.4)]"></header>
      <TodoListApp
        directories={[directory]}
        todoWorkSpace={workspace}
      ></TodoListApp>
    </main>
  );
}
