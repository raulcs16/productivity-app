"use client";
import { appEventBus } from "@/src/core/events/EventBus";
import {
  Todo,
  TodoState,
  TodoList,
  TodoWorkSpace,
} from "@/src/core/todolist/todo";
import React, { createContext, useContext, useMemo, useState } from "react";

interface TodoListStore {
  readonly workspace: TodoWorkSpace;
  readonly todolists: TodoList[];
  readonly todos: Todo[];
  readonly currentListIndex: number;
}

interface TodoListController {
  updateListIndex: (index: number) => void;
  addList: (title: string) => void;
  addTodo: (listId: number, task: string) => void;
  updateTodoState: (id: number) => void;
}

const TodoListContext = createContext<{
  store: TodoListStore;
  controller: TodoListController;
} | null>(null);

interface TodoListContextProps {
  children: React.ReactNode;
  workspace: TodoWorkSpace;
  todolist: TodoList[];
  todos: Todo[];
  initListIndex: number;
}

export function TodoListContextProvider(props: TodoListContextProps) {
  const [workspace, setWorkSpace] = useState<TodoWorkSpace>(props.workspace);
  const [todolists, setTodoLists] = useState<TodoList[]>(props.todolist);
  const [todos, setTodos] = useState<Todo[]>(props.todos);
  const [currentListIndex, setCurrentListIndex] = useState<number>(
    props.initListIndex
  );

  React.useEffect(() => {
    const unsubCreate = appEventBus.on("explorer:nodeCreated", (node) => {
      if (node.type === "Item") {
        setTodoLists((prev) => [
          ...prev,
          {
            id: node.id, // Match IDs perfectly so they map together in views
            title: node.title,
            workSpaceId: node.parentId,
          },
        ]);
      }
    });
    const unsubRename = appEventBus.on("explorer:nodeRenamed", (node) => {
      if (node.type === "Item")
        setTodoLists((prev) =>
          prev.map((list) =>
            list.id !== node.id ? list : { ...list, title: node.title }
          )
        );
    });
    const unsubSelected = appEventBus.on("explorer:nodeSelected", (node) => {
      setCurrentListIndex(0);
    });
    return () => {
      unsubCreate();
      unsubRename();
      unsubSelected();
    };
  }, []);
  const store: TodoListStore = {
    workspace,
    todolists,
    todos,
    currentListIndex,
  };

  const controller: TodoListController = useMemo(
    () => ({
      addList: (title: string) => {
        const listId = Date.now();
        setTodoLists((prevLists) => {
          const nextIndex = prevLists.length;
          setCurrentListIndex(nextIndex);
          return [
            ...prevLists,
            {
              id: listId,
              title: title,
              workSpaceId: props.workspace.id,
            },
          ];
        });
        appEventBus.emit("todo:listCreated", {
          id: listId,
          title: title,
          workspaceId: props.workspace.id,
        });
      },
      addTodo: (listId: number, task: string) => {
        const todo: Todo = {
          id: Date.now(),
          listId: listId,
          task: task,
          state: TodoState.Ready,
        };
        setTodos((prev) => [...prev, todo]);
      },
      updateTodoState: (id: number) => {
        setTodos((prevNodes) => {
          return prevNodes.map((todo) => {
            if (todo.id !== id) return todo;

            let nextState = todo.state;
            if (todo.state === TodoState.Ready) nextState = TodoState.Started;
            else if (todo.state === TodoState.Started)
              nextState = TodoState.Completed;

            return { ...todo, state: nextState };
          });
        });
      },
      updateListIndex: (index) => {
        if (index < 0) return;
        setTodoLists((prevLists) => {
          if (index >= prevLists.length) return prevLists;
          setCurrentListIndex(index);
          return prevLists;
        });
      },
    }),
    []
  );
  return (
    <TodoListContext.Provider value={{ store, controller }}>
      {props.children}
    </TodoListContext.Provider>
  );
}

export const useTodoListStore = () => {
  const context = useContext(TodoListContext);
  if (!context)
    throw new Error("useTodoListStore must be inside TodoListProvider");
  return context.store;
};

export const useTodoListController = () => {
  const context = useContext(TodoListContext);
  if (!context)
    throw new Error("useTodoListController must be inside TodoListProvider");
  return context.controller;
};
