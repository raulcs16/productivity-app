"use client";
import { TodoWorkSpace } from "@/src/core/todolist/todo";
import TodoListWorkSpace from "../ui/todolist/TodoListWorkSpace";
import Workspace from "../ui/shared/layout/WorkSpace";
import { ExplorerContextProvider } from "../ui/explorer/ExplorerContextProvider";
import ExplorerView from "../ui/explorer/ExplorerView";
import { TodoListContextProvider } from "../ui/todolist/TodoListContextProvider";
import { ExplorerType } from "../core/explorer/explorer";

interface TodoListAppProps {
  todoWorkSpace: TodoWorkSpace;
}

export default function TodoListApp(props: TodoListAppProps) {
  return (
    <div className="w-full h-full">
      <Workspace
        title={props.todoWorkSpace.title}
        workspace={
          <TodoListContextProvider
            workspace={props.todoWorkSpace}
            todolist={[]}
            todos={[]}
            initListIndex={0}
          >
            <TodoListWorkSpace></TodoListWorkSpace>
          </TodoListContextProvider>
        }
        sideBarOpen={false}
        sideBar={
          <ExplorerContextProvider
            initNodes={[
              {
                id: props.todoWorkSpace.id,
                title: props.todoWorkSpace.title,
                type: ExplorerType.Container,
                parentId: 0,
              },
            ]}
            initSelectedId={0}
          >
            <ExplorerView></ExplorerView>
          </ExplorerContextProvider>
        }
      ></Workspace>
    </div>
  );
}
