"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// --- MENU ITEM COMPONENT (Maps closely to QML MenuItem) ---
interface ContextMenuItemProps {
  text: string;
  icon?: ReactNode;
  onTriggered: () => void;
}

export function ContextMenuItem({
  text,
  icon,
  onTriggered,
}: ContextMenuItemProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation(); // Block bubbling to the overlay scrim
        onTriggered();
      }}
      className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-md transition-colors duration-150 flex items-center gap-2 group cursor-pointer"
    >
      {icon && (
        <span className="text-slate-500 group-hover:text-slate-300 shrink-0">
          {icon}
        </span>
      )}
      <span className="truncate">{text}</span>
    </button>
  );
}

// --- CONTAINER MENU COMPONENT (Maps closely to QML Menu) ---
interface ContextMenuProps {
  x: number;
  y: number;
  open: boolean;
  onClosed: () => void;
  children: ReactNode;
}

export default function ContextMenu({
  x,
  y,
  open,
  onClosed,
  children,
}: ContextMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <>
      {/* Invisible Scrim/Overlay Backdrop to handle auto-closing */}
      <div
        className="fixed inset-0 z-50 bg-transparent cursor-default select-none"
        onClick={(e) => {
          e.stopPropagation();
          onClosed();
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClosed();
        }}
      />

      {/* The Menu Canvas Frame */}
      <div
        className="fixed z-50 min-w-[160px] bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-lg p-1 shadow-xl shadow-black/50 flex flex-col gap-0.5 transform-gpu animate-in fade-in zoom-in-95 duration-100"
        style={{
          top: `${y}px`,
          right: `${window.innerWidth - x}px`,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
}
