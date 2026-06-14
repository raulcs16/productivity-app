"use client";
import {
  Todo,
  todo_state,
  TodoList,
  TodoWorkSpace,
} from "@/src/core/todolist/todo";
import TodoListWorkSpace from "../ui/todolist/TodoListWorkSpace";
import Explorer from "../ui/flat-directory/Explorer";
import { FDDirectory } from "@/src/core/flat-directory/directory";
import { useState } from "react";
import Workspace from "../ui/layout/WorkSpace";
import { FDFile } from "../core/flat-directory/file";

interface TodoListAppProps {
  directories: FDDirectory[];
  todoWorkSpace: TodoWorkSpace;
}

export default function TodoListApp(props: TodoListAppProps) {
  const [directories, setDirectories] = useState<FDDirectory[]>(
    props.directories
  );
  const [todoLists, setTodoLists] = useState<TodoList[]>(
    props.todoWorkSpace.lists
  );
  const [currentDirectoryId, setCurrentDirectoryId] = useState(
    props.todoWorkSpace.id
  );
  const [currentListId, setCurrentListId] = useState(0);

  function handleAddDiretory(title: string) {
    // //for now lets mock adding an empty directory
    // const newDirectory: FDDirectory = {
    //   id: Date.now(),
    //   title: title,
    //   files: [],
    // };
    // setDirectories((prev) => [...prev, newDirectory]);
  }
  function handleAddNewFile(dirId: number, fileName: string) {
    const newFile = {
      id: Date.now(), // Secure a unique timestamp identifier for mock tracking
      title: fileName,
    };
    setDirectories((prevDirectories) =>
      prevDirectories.map((dir) => {
        if (dir.id !== dirId) return dir;
        return {
          ...dir,
          files: [...dir.files, newFile],
        };
      })
    );
    const list: TodoList = {
      id: newFile.id,
      title: newFile.title,
      todos: [],
    };
    setTodoLists((prev) => [...prev, list]);
    setCurrentListId(newFile.id);
    setCurrentDirectoryId(dirId);
  }
  function handleFileSelected(dirId: number, fileId: number) {
    if (currentDirectoryId !== dirId) setCurrentDirectoryId(dirId);
    if (currentListId !== fileId) setCurrentListId(fileId);
  }

  function addEmptyList() {
    const list: TodoList = {
      id: Date.now(),
      title: "New List",
      todos: [],
    };
    setTodoLists((prev) => [...prev, list]);
    const file: FDFile = {
      id: list.id,
      title: list.title,
    };
    setDirectories((prevDirectories) =>
      prevDirectories.map((dir) => {
        // If this isn't the active directory we're adding a list to, leave it alone
        if (dir.id !== currentDirectoryId) return dir;

        // Return a fresh directory clone with the new file reference cleanly appended
        return {
          ...dir,
          files: [...dir.files, file],
        };
      })
    );
    setCurrentListId(list.id);
  }
  function handleTodoAdded(listId: number, task: string) {
    // 1. Create the new optimistic Todo object using your imported types and state enum
    const newTodo: Todo = {
      id: Date.now(),
      task: task,
      state: todo_state.Ready,
    };

    // 2. Map through the lists to locate the target List ID and immutably append the item
    setTodoLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id !== listId) return list;
        return {
          ...list,
          todos: [...list.todos, newTodo],
        };
      })
    );
  }
  return (
    <div className="w-full h-full">
      <Workspace
        workspace={
          <TodoListWorkSpace
            id={props.todoWorkSpace.id}
            title={props.todoWorkSpace.title}
            lists={todoLists}
            onTodoAdded={function (listId: number, task: string): void {
              handleTodoAdded(listId, task);
            }}
            onNewList={() => {
              addEmptyList();
            }}
            onCurrentListIdChanged={(id) => setCurrentListId(id)}
            selectedFileId={currentListId}
          ></TodoListWorkSpace>
        }
        sideBarOpen={false}
        sideBar={
          <Explorer
            directories={directories}
            selectedId={currentListId}
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
            onFileSelected={(dirId, fileId) => {
              handleFileSelected(dirId, fileId);
            }}
          ></Explorer>
        }
      ></Workspace>
    </div>
  );
}
