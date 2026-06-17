"use client";
import TodoListWorkSpace from "@/src/ui/todolist/TodoListWorkSpace";
import Workspace from "@/src/ui/shared/layout/WorkSpace";
import ExplorerView from "@/src/ui/explorer/ExplorerView";
import { useTodoAppController, useTodoAppStore } from "./TodoAppContext";
import TodoAppTitle from "./TodoAppTitle";
import { ExplorerType } from "@/src/core/explorer/explorer";
import { useState } from "react";
import GridToggle from "@/src/ui/shared/controls/GridToggle";
import { Edu_NSW_ACT_Foundation } from "next/font/google";

interface TodoListAppProps {}

export enum LayoutType {
  Grid,
  Slide,
}

export default function TodoListApp(props: TodoListAppProps) {
  const store = useTodoAppStore();
  const controller = useTodoAppController();
  const [layout, setLayout] = useState<LayoutType>(LayoutType.Slide);
  function ToggleLayout() {
    if (layout === LayoutType.Slide) setLayout(LayoutType.Grid);
    if (layout === LayoutType.Grid) setLayout(LayoutType.Slide);
  }
  return (
    <div className="w-full h-full">
      <Workspace
        leftHeader={
          <GridToggle
            onToggled={() => ToggleLayout()}
            active={layout === LayoutType.Grid}
          ></GridToggle>
        }
        title={<TodoAppTitle></TodoAppTitle>}
        workspace={
          <TodoListWorkSpace
            layout={layout}
            setLayout={setLayout}
          ></TodoListWorkSpace>
        }
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
