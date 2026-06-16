"use client";
import { ExplorerNode, ExplorerType } from "@/src/core/explorer/explorer";
import { Todo, TodoList, TodoWorkSpace } from "@/src/core/todolist/todo";
import React, { createContext, useContext, useMemo, useState } from "react";

interface TodoAppStore {
  readonly workspaces: TodoWorkSpace[];
  readonly todolists: TodoList[];
  readonly currentListIndex: number;
  readonly workspaceTitle: string;
  readonly todos: Todo[];
  //computed
  readonly explorerNodes: ExplorerNode[];
  readonly selectedId: number;
  readonly editableId: number;
  readonly currentWorkSpaceId: number;
}

interface TodoAppController {
  addList: (title: string, workSpaceId: number) => number;
  setCurrentListIndex: (index: number) => void;
  setEditId: (id: number) => void;
  nodeSelected: (id: number) => void;
  addNode: (type: ExplorerType, title: string, parentId: number) => void;
  rename: (id: number, newName: string) => void;
}

const TodoAppContext = createContext<{
  store: TodoAppStore;
  controller: TodoAppController;
} | null>(null);

interface TodoAppContextProps {
  children: React.ReactNode;
  initWorkSpaces: TodoWorkSpace[];
  initTodoLists: TodoList[];
  initTodos: Todo[];
  initWorkSpaceId: number;
}

export function TodoAppContextProvider(props: TodoAppContextProps) {
  const [workspaces, setWorkSpaces] = useState<TodoWorkSpace[]>(
    props.initWorkSpaces
  );
  const [allLists, setAllLists] = useState<TodoList[]>(props.initTodoLists);
  const [todos, setTodos] = useState<Todo[]>(props.initTodos);
  const [currentWorkSpaceId, setCurrentWorkSpaceId] = useState<number>(
    props.initWorkSpaceId
  );

  const [selectedId, setSelectedId] = useState<number>(-1);
  const [editableId, setEditableId] = useState<number>(-1);

  const workspaceTitle = useMemo(() => {
    const activeWorkspace = workspaces.find(
      (ws) => ws.id === currentWorkSpaceId
    );
    return activeWorkspace ? activeWorkspace.title : "Default Workspace";
  }, [workspaces, currentWorkSpaceId]);

  const todolists = useMemo(() => {
    return allLists.filter((l) => l.workSpaceId === currentWorkSpaceId);
  }, [allLists, currentWorkSpaceId]);
  const explorerNodes = useMemo<ExplorerNode[]>(() => {
    const categories = workspaces.map((ws) => ({
      id: ws.id,
      title: ws.title,
      type: ExplorerType.Container,
      parentId: 0,
    }));
    const items = allLists.map((list) => ({
      id: list.id,
      title: list.title,
      type: ExplorerType.Item,
      parentId: list.workSpaceId,
    }));
    return [...categories, ...items];
  }, [allLists, workspaces]);
  const currentListIndex = useMemo(() => {
    const idx = todolists.findIndex((list) => list.id === selectedId);
    return idx !== -1 ? idx : 0; // Fallback gracefully to the first entry if no ID is selected
  }, [todolists, selectedId]);
  const store: TodoAppStore = {
    workspaces,
    todolists,
    todos,
    workspaceTitle,
    explorerNodes,
    currentListIndex,
    selectedId,
    editableId,
    currentWorkSpaceId,
  };
  const controller: TodoAppController = useMemo(
    () => ({
      addList: (title: string, parentId: number = currentWorkSpaceId) => {
        const index = todolists.length;
        const list: TodoList = {
          id: Date.now(),
          title: title,
          workSpaceId: parentId,
        };
        setAllLists((prev) => [...prev, list]);
        setSelectedId(list.id);
        return list.id;
      },
      setCurrentListIndex: (index: number) => {
        if (index < 0 || index > todolists.length) return;
        const targetList = todolists[index];
        if (targetList) setSelectedId(targetList.id);
      },
      addNode: (type: ExplorerType, title: string, parentId: number) => {
        if (type === ExplorerType.Item) {
          const id = controller.addList(title, parentId);
          setEditableId(id);
        } else if (type === ExplorerType.Container) {
          const workspace: TodoWorkSpace = {
            id: Date.now(),
            title: title,
          };
          setWorkSpaces((prev) => [...prev, workspace]);
          setEditableId(workspace.id);
          setCurrentWorkSpaceId(workspace.id);
        }
      },
      nodeSelected: (id: number) => {
        const node = explorerNodes.find((n) => n.id === id);
        if (!node) return;
        if (node.type === ExplorerType.Container) {
          setCurrentWorkSpaceId(id);
        } else if (node.parentId !== currentWorkSpaceId) {
          setCurrentWorkSpaceId(node.parentId);
        }
        setSelectedId(id);
      },
      rename: (id: number, newName: string) => {
        setAllLists((prevTodoLists) =>
          prevTodoLists.map((list) =>
            list.id === id
              ? { ...list, title: newName } // Clone the old object, overwrite the title
              : list
          )
        );
        setWorkSpaces((prev) =>
          prev.map((work) =>
            work.id === id ? { ...work, title: newName } : work
          )
        );

        setEditableId(-1);
        setSelectedId(id);
      },
      setEditId: (id: number) => {
        setEditableId(id);
      },
    }),
    [allLists, currentWorkSpaceId]
  );
  return (
    <TodoAppContext.Provider value={{ store, controller }}>
      {props.children}t
    </TodoAppContext.Provider>
  );
}

export const useTodoAppStore = () => {
  const context = useContext(TodoAppContext);
  if (!context)
    throw new Error("useTodoAppStore must be inside TodoAppContextProvider");
  return context.store;
};
export const useTodoAppController = () => {
  const context = useContext(TodoAppContext);
  if (!context)
    throw new Error("useTodoAppController must be inside TodoAppProvider");
  return context.controller;
};
