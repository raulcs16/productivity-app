"use client";
import { Todo, todo_state } from "@/src/core/todolist/todo";
import TodoListWorkSpace from "../ui/todolist/TodoListWorkSpace";
import Explorer from "../ui/flat-directory/Explorer";
import { FDDirectory } from "@/src/core/flat-directory/directory";
import { useState } from "react";
import { dir } from "console";

interface TodoListAppProps {
  directories: FDDirectory[];
  workingDirectoryLists: Todo[][];
}

export default function TodoListApp(props: TodoListAppProps) {
  const [directories, setDirectories] = useState<FDDirectory[]>(
    props.directories
  );
  const [todoLists, setTodoLists] = useState<Todo[][]>(
    props.workingDirectoryLists
  );

  function handleAddDiretory(title: string) {
    //for now lets mock adding an empty directory

    const newDirectory: FDDirectory = {
      id: Date.now(),
      title: title,
      files: [],
    };

    setDirectories((prev) => [...prev, newDirectory]);
  }
  function handleAddNewFile(dirId: number, fileName: string) {
    const dirExists = directories.some((fd) => fd.id === dirId);
    if (!dirExists) return;

    // 2. Create our new file object matching your file schema
    const newFile = {
      id: Date.now(), // Secure a unique timestamp identifier for mock tracking
      title: fileName,
    };

    // 3. Update state immutably by transforming the specific directory node
    setDirectories((prevDirectories) =>
      prevDirectories.map((dir) => {
        // If this isn't the directory we are looking for, pass it through unchanged
        if (dir.id !== dirId) return dir;

        // Found the target directory! Return a clean copy with the new file appended
        return {
          ...dir,
          files: [...dir.files, newFile],
        };
      })
    );
  }
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex overflow-hidden min-w-0">
        <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
          <TodoListWorkSpace title="Work" lists={todoLists}></TodoListWorkSpace>
        </div>
        <div className="w-64 h-full flex flex-col min-w-0 shrink-0 overflow-hidden border-l">
          <Explorer
            directories={directories}
            onFileEdit={function (dirId: number, fileId: number): void {
              throw new Error("Function not implemented.");
            }}
            onFileDelete={function (dirId: number, fileId: number): void {
              throw new Error("Function not implemented.");
            }}
            onDirEdit={function (dirId: number): void {
              throw new Error("Function not implemented.");
            }}
            onDirAddFile={function (dirId: number): void {
              throw new Error("Function not implemented.");
            }}
            onNewDirectory={(title: string) => {
              handleAddDiretory(title);
            }}
            onNewFile={(dirId, fileName) => {
              handleAddNewFile(dirId, fileName);
            }}
          ></Explorer>
        </div>
      </div>
    </div>
  );
}
