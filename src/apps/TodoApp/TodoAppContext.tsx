"use client";
import { ExplorerNode, ExplorerType } from "@/src/core/explorer/explorer";
import { ExplorerTree } from "@/src/core/explorer/explorer_tree";
import {
  Todo,
  TodoList,
  TodoState,
  TodoWorkSpace,
} from "@/src/core/todolist/todo";
import { TodoListModel } from "@/src/core/todolist/todolist_model";
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
  addWorkSpace: (title: string) => void;
  addList: (title: string, workSpaceId: number) => void;
  addTodo: (task: string, parentId: number) => void;
  updateTodoState: (id: number) => void;
  setCurrentListIndex: (index: number) => void;
  setEditId: (id: number) => void;
  nodeSelected: (id: number) => void;
  addNode: (type: ExplorerType, title: string, parentId: number) => void;
  deleteNode: (nodeId: number) => void;
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
  const models = useMemo(() => {
    return {
      todolist: new TodoListModel(/* pass props.init if needed */),
      explorer: new ExplorerTree(),
    };
  }, []);

  const [workspaces, setWorkSpaces] = useState<TodoWorkSpace[]>(
    props.initWorkSpaces
  );
  const [todos, setTodos] = useState<Todo[]>(props.initTodos);
  const [currentWorkSpaceId, setCurrentWorkSpaceId] = useState<number>(
    props.initWorkSpaceId
  );
  const [workspaceTitle, setworkspaceTitle] = useState("Root");

  const [selectedId, setSelectedId] = useState<number>(-1);
  const [editableId, setEditableId] = useState<number>(-1);

  const [explorerNodes, setExplorerNodes] = useState<ExplorerNode[]>(
    models.explorer.getExploreNodes()
  );
  const [todolists, setTodoLists] = useState<TodoList[]>(props.initTodoLists);
  const [currentListIndex, setCurrentListIndex] = useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const workspace = models.todolist.getCurrentWorkSpace();
      setWorkSpaces(models.todolist.getWorkSpaces());
      setCurrentWorkSpaceId(workspace.id);
      setworkspaceTitle(workspace.title);
      setTodoLists(models.todolist.getCurrentTodoLists());
      setCurrentListIndex(models.todolist.getCurrentListIndex());
      setTodos(models.todolist.getCurrentTodosByState(TodoState.Ready));
      setExplorerNodes(models.explorer.getExploreNodes());
    }, 100); // 100ms interval for near-instant UI reactivity

    return () => clearInterval(interval);
  }, [models]);
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
      addWorkSpace: (title: string) => {
        const id = models.todolist.addWorkSpace(title);
        models.explorer.addRootContainer(title, id);
      },
      addList: (title: string, parentId: number) => {
        const id = models.todolist.addNewList(title, parentId);
        if (id < 0) return;
        models.explorer.addChildItem(title, id, parentId);
      },
      addTodo: (task: string) => {
        models.todolist.addTodo(task);
      },
      updateTodoState: (todoId: number) => {
        // 💡 State rotation mapping dictionary
        const nextStateMap: Record<TodoState, TodoState> = {
          [TodoState.Ready]: TodoState.Started,
          [TodoState.Started]: TodoState.Completed,
          [TodoState.Completed]: TodoState.Ready, // Loops back to Ready, or change to whatever your fallback is
          [TodoState.Archived]: TodoState.Archived,
          [TodoState.Scheduled]: TodoState.Scheduled,
        };

        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === todoId
              ? { ...todo, state: nextStateMap[todo.state] } // 💡 Rotate state safely
              : todo
          )
        );
      },
      setCurrentListIndex: (index: number) => {
        if (index < 0 || index > todolists.length) return;
        const targetList = todolists[index];
        if (targetList) setSelectedId(targetList.id);
      },
      addNode: (type: ExplorerType, title: string, parentId: number) => {
        if (type === ExplorerType.Item) {
          const id = controller.addList(title, parentId);
          setEditableId(0);
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
      rename: (id: number, newName: string) => {},
      setEditId: (id: number) => {
        setEditableId(id);
      },
      deleteNode: (nodeId: number) => {},
    }),
    [models]
  );
  return (
    <TodoAppContext.Provider value={{ store, controller }}>
      {props.children}
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
