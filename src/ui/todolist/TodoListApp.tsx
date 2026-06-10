"use client";
import { Todo, todo_state } from "@/src/core/todolist/todo";
import TodoListWorkSpace from "./TodoListWorkSpace";
import Explorer from "../flat-directory/Explorer";
import { FDDirectory } from "@/src/core/flat-directory/directory";
import FileMenuContext from "../flat-directory/FileContext";
import { useState } from "react";
import DirectoryMenuContext from "../flat-directory/DirectoryContext";
import ExplorerMenuContext from "../flat-directory/ExplorerContext";

interface TodoListAppProps {}

const workTodos: Todo[] = [
  { task: "help1", state: todo_state.Scheduled, id: 1 },
  { task: "help1", state: todo_state.Scheduled, id: 2 },
  { task: "help1", state: todo_state.Scheduled, id: 3 },
  { task: "help2", state: todo_state.Ready, id: 2 },
  { task: "help2", state: todo_state.Ready, id: 21 },
  { task: "help2", state: todo_state.Ready, id: 22 },
  { task: "help2", state: todo_state.Ready, id: 23 },
  { task: "help3", state: todo_state.Started, id: 33 },
  { task: "help4", state: todo_state.Completed, id: 44 },
  { task: "help4", state: todo_state.Completed, id: 45 },
  { task: "help4", state: todo_state.Completed, id: 46 },
  { task: "help3", state: todo_state.Started, id: 31 },
  { task: "help3", state: todo_state.Started, id: 30 },
  { task: "help5", state: todo_state.Archived, id: 5 },
  { task: "help5", state: todo_state.Archived, id: 51 },
  { task: "help5", state: todo_state.Archived, id: 52 },
];

const mockDirectories: FDDirectory[] = [
  {
    id: 1,
    title: "Root Workspace",
    files: [
      { id: 101, title: "index.tsx" },
      { id: 102, title: "globals.css" },
      { id: 103, title: "tailwind.config.js" },
    ],
  },
  {
    id: 2,
    title: "Core Components",
    files: [
      { id: 201, title: "SlideOver.tsx" },
      { id: 202, title: "Grid.tsx" },
      { id: 203, title: "GridToggle.tsx" },
      { id: 204, title: "TodoListView.tsx" },
    ],
  },
  {
    id: 3,
    title: "Assets & Images",
    files: [
      { id: 301, title: "logo.svg" },
      { id: 302, title: "avatar-placeholder.png" },
    ],
  },
  {
    id: 4,
    title: "Empty Directory",
    files: [],
  },
];
export default function TodoListApp(props: TodoListAppProps) {
  const [fileMenuConfig, setFileMenuConfig] = useState<{
    fileId: number;
    x: number;
    y: number;
  } | null>(null);
  const [dirMenuConfig, setDirMenuConfig] = useState<{
    dirId: number;
    x: number;
    y: number;
  } | null>(null);
  const [expMenuConfig, setExpMenuConfig] = useState<{
    x: number;
    y: number;
  } | null>(null);
  return (
    <div className="w-full h-full">
      <FileMenuContext
        x={fileMenuConfig?.x ?? 0}
        y={fileMenuConfig?.y ?? 0}
        open={fileMenuConfig !== null}
        onDelete={() => {}}
        onRename={() => {}}
        onClose={() => setFileMenuConfig(null)}
      ></FileMenuContext>
      <DirectoryMenuContext
        x={dirMenuConfig?.x ?? 0}
        y={dirMenuConfig?.y ?? 0}
        open={dirMenuConfig !== null}
        onAddFile={() => {}}
        onRename={() => {}}
        onClose={() => setDirMenuConfig(null)}
      ></DirectoryMenuContext>
      <ExplorerMenuContext
        x={expMenuConfig?.x ?? 0}
        y={expMenuConfig?.y ?? 0}
        open={expMenuConfig !== null}
        onClose={() => setExpMenuConfig(null)}
        onAddWorkSpace={() => {}}
      ></ExplorerMenuContext>
      <div className="w-full h-full flex overflow-hidden min-w-0">
        <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
          <TodoListWorkSpace
            title="Work"
            lists={[workTodos, workTodos, workTodos]}
          ></TodoListWorkSpace>
        </div>
        <div className="w-64 h-full flex flex-col min-w-0 shrink-0 overflow-hidden border-l">
          <Explorer
            directories={mockDirectories}
            onDirContextMenu={(dirId, x, y) => {
              setDirMenuConfig({ dirId, x, y });
            }}
            onFileContextMenu={(dirId, fileId, x, y) => {
              setFileMenuConfig({ fileId, x, y });
            }}
            onExplorerContextMenu={(x, y) => {
              setExpMenuConfig({ x, y });
            }}
          ></Explorer>
        </div>
      </div>
    </div>
  );
}
