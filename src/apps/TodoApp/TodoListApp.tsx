"use client";
import TodoListWorkSpace from "@/src/ui/todolist/TodoListWorkSpace";
import Workspace from "@/src/ui/shared/layout/WorkSpace";
import ExplorerView from "@/src/ui/explorer/ExplorerView";
import { useTodoAppController, useTodoAppStore } from "./TodoAppContext";
import TodoAppTitle from "./TodoAppTitle";
import { ExplorerType } from "@/src/core/explorer/explorer";

interface TodoListAppProps {}

export default function TodoListApp(props: TodoListAppProps) {
  const store = useTodoAppStore();
  const controller = useTodoAppController();
  return (
    <div className="w-full h-full">
      <Workspace
        title={<TodoAppTitle></TodoAppTitle>}
        workspace={<TodoListWorkSpace></TodoListWorkSpace>}
        sideBarOpen={false}
        sideBar={
          <ExplorerView
            explorerNodes={store.explorerNodes}
            selectedId={store.selectedId}
            editableId={store.editableId}
            onNodeSelected={(id: number) => {
              controller.nodeSelected(id);
            }}
            onNodeRenamed={(id: number, title: string) => {
              controller.rename(id, title);
            }}
            onNodeDelete={(id: number) => {}}
            onNodeAdded={(
              type: ExplorerType,
              title: string,
              parentId: number
            ) => {
              controller.addNode(type, title, parentId);
            }}
            onSetEditId={(id) => controller.setEditId(id)}
          ></ExplorerView>
        }
      ></Workspace>
    </div>
  );
}
