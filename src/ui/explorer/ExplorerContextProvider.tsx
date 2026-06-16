"use client";
import { appEventBus } from "@/src/core/events/EventBus";
import { ExplorerNode, ExplorerType } from "@/src/core/explorer/explorer";
import React, { createContext, useContext, useMemo, useState } from "react";

interface ExplorerStore {
  readonly nodes: ExplorerNode[];
  readonly currentSelectionId: number;
  readonly currentEditableId: number;
  readonly nodeToDelete: number | null;
  readonly activeMenu: {
    type: ExplorerType | "Explorer";
    id: number;
    x: number;
    y: number;
  } | null;
}

interface ExplorerController {
  addNode: (type: ExplorerType, title: string, parentId: number) => void;
  setEditableId: (id: number) => void;
  setDeleteId: (id: number) => void;
  cancelDelete: () => void;
  confirmDelete: () => void;
  rename: (id: number, title: string) => void;
  cancelEdit: (id: number) => void;
  selectNode: (id: number) => void;
  openMenu: (
    type: ExplorerType | "Explorer",
    id: number,
    x: number,
    y: number,
    parentId?: number
  ) => void;
  closeMenu: () => void;
}

const ExplorerContext = createContext<{
  store: ExplorerStore;
  controller: ExplorerController;
} | null>(null);

interface ExplorerContextProps {
  children: React.ReactNode;
  initNodes: ExplorerNode[];
  initSelectedId: number;
}

export function ExplorerContextProvider(props: ExplorerContextProps) {
  const [nodes, setNodes] = useState<ExplorerNode[]>(props.initNodes);
  const [currentEditableId, setCurrentEditableId] = useState<number>(0);
  const [currentSelectionId, setSelectionId] = useState(props.initSelectedId);
  const [pendingId, setPendingId] = useState(-1);
  const [nodeToDelete, setNodeToDelete] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] =
    useState<ExplorerStore["activeMenu"]>(null);
  const store: ExplorerStore = {
    nodes,
    currentEditableId,
    currentSelectionId,
    activeMenu,
    nodeToDelete,
  };
  React.useEffect(() => {
    const unsubCreate = appEventBus.on("todo:listCreated", (list) => {
      setNodes((prev) => [
        ...prev,
        {
          id: list.id, // Match IDs perfectly so they map together in views
          title: list.title,
          parentId: list.workspaceId,
          type: ExplorerType.Item,
        },
      ]);
    });
    return () => {
      unsubCreate();
    };
  }, []);
  //use memo to ensure the controller ref never changes, prvent unecessary UI renders
  const controller: ExplorerController = useMemo(
    () => ({
      addNode: (type: ExplorerType, title: string, parentId: number = 0) => {
        const newNode: ExplorerNode = {
          id: Date.now(),
          type: type,
          title: title,
          parentId: parentId,
        };
        //if parentId == 0
        if (parentId === 0) {
          setNodes((prev) => [...prev, newNode]);
        } else {
          setNodes((prevNodes) => {
            const parentIndex = prevNodes.findIndex(
              (node) => node.id === parentId
            );
            if (parentIndex === -1) return [...prevNodes, newNode];
            const left = prevNodes.slice(0, parentIndex + 1); // Includes the parent node
            const right = prevNodes.slice(parentIndex + 1); // Everything below the parent
            return [...left, newNode, ...right];
          });
        }
        setCurrentEditableId(newNode.id);
        setPendingId(newNode.id);
        appEventBus.emit("explorer:nodeCreated", {
          id: newNode.id,
          title: newNode.title,
          type: type === ExplorerType.Container ? "Container" : "Item",
          parentId: parentId,
        });
      },
      setEditableId: (id: number) => {
        setCurrentEditableId(id);
      },
      setDeleteId: (id: number) => {
        setNodeToDelete(id);
      },
      cancelDelete: () => {
        setNodeToDelete(null);
      },
      confirmDelete: () => {
        if (nodeToDelete === null) return;
        setNodes((prev) => prev.filter((node) => node.id !== nodeToDelete));
        setNodeToDelete(null);
      },
      rename: (id: number, title: string) => {
        let capturedType: ExplorerType | undefined;
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            if (node.id !== id) return node;
            capturedType = node.type;
            return { ...node, title };
          })
        );
        setCurrentEditableId(-1);
        setPendingId(-1);
        if (capturedType === undefined) return;
        appEventBus.emit("explorer:nodeRenamed", {
          id: id,
          type: capturedType === ExplorerType.Container ? "Container" : "Item",
          title: title,
        });
      },
      cancelEdit: (id: number) => {
        if (pendingId === id) {
          setNodes((prev) => prev.filter((node) => node.id !== id));
          setPendingId(-1);
        }
        setCurrentEditableId(-1);
      },
      selectNode: (id: number) => {
        setSelectionId(id);
        appEventBus.emit("explorer:nodeSelected", {
          id: id,
        });
      },
      openMenu: (type, id, x, y) => {
        setActiveMenu({ type, id, x, y });
      },
      closeMenu: () => {
        setActiveMenu(null);
      },
    }),
    [pendingId]
  );
  return (
    <ExplorerContext.Provider value={{ store, controller }}>
      {props.children}
    </ExplorerContext.Provider>
  );
}

// Custom hooks to keep the separation perfectly clear on the UI side
export const useExplorerStore = () => {
  const context = useContext(ExplorerContext);
  if (!context)
    throw new Error(
      "useFlatDirectoryStore must be inside FlatDirectoryProvider"
    );
  return context.store;
};

export const useExplorerController = () => {
  const context = useContext(ExplorerContext);
  if (!context)
    throw new Error(
      "useFlatDirectoryController must be inside FlatDirectoryProvider"
    );
  return context.controller;
};
