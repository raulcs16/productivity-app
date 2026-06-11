"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ScrimProps {
  onClickedAway: () => void;
  z: number;
}

export default function Scrim(props: ScrimProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* 1. THE GIANT HITBOX BACKDROP */}
      <div
        className="fixed inset-0 bg-transparent cursor-default select-none"
        style={{ zIndex: props.z }}
        onClick={(e) => {
          e.stopPropagation(); // Stop the event trail
          props.onClickedAway(); // Signal to parent to close/setEdit(false)
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onClickedAway(); // Right clicking away also closes it safely
        }}
      />
    </>,
    document.body
  );
}
