"use client";
import TodoListWorkSpace from "@/src/ui/todolist/TodoListWorkSpace";
import Workspace from "@/src/ui/shared/layout/WorkSpace";
import TodoAppTitle from "./TodoAppTitle";
import { useState } from "react";
import GridToggle from "@/src/ui/shared/controls/GridToggle";
import TodoExplorer from "./TodoExplorer";

interface TodoListAppProps {}

export enum LayoutType {
  Grid,
  Slide,
}

export default function TodoListApp(props: TodoListAppProps) {
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
        sideBar={<TodoExplorer></TodoExplorer>}
      ></Workspace>
    </div>
  );
}
