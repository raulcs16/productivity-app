"use client";
import {
  Todo,
  todo_state,
  TodoList,
  TodoWorkSpace,
} from "@/src/core/todolist/todo";
import TodoListWorkSpace from "../ui/todolist/TodoListWorkSpace";
import { useEffect, useState } from "react";
import Workspace from "../ui/layout/WorkSpace";
import { ExplorerContextProvider } from "../ui/explorer/ExplorerContextProvider";
import ExplorerView from "../ui/explorer/ExplorerView";

interface TodoListAppProps {
  // directories: FDDirectory[];
  todoWorkSpace: TodoWorkSpace;
}

export default function TodoListApp(props: TodoListAppProps) {
  const [todoLists, setTodoLists] = useState<TodoList[]>(
    props.todoWorkSpace.lists
  );
  const [currentDirectoryId, setCurrentDirectoryId] = useState(
    props.todoWorkSpace.id
  );
  const [currentListId, setCurrentListId] = useState(0);
  const [title, setTitle] = useState(props.todoWorkSpace.title);

  function handleAddDiretory(title: string) {
    setCurrentListId(0);
  }
  function handleAddNewFile(dirId: number, fileName: string) {
    const newFile = {
      id: Date.now(), // Secure a unique timestamp identifier for mock tracking
      title: fileName,
    };
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
        title={title}
        workspace={
          <TodoListWorkSpace
            id={props.todoWorkSpace.id}
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
          <ExplorerContextProvider initNodes={[]} initSelectedId={0}>
            <ExplorerView></ExplorerView>
          </ExplorerContextProvider>
        }
      ></Workspace>
    </div>
  );
}
