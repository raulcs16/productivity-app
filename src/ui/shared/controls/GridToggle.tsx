"use client";
import { useState } from "react";
import Button from "./Button";

interface GridToggleProps {
  onToggled: (state: boolean) => void;
  active: boolean;
}

export default function GridToggle(props: GridToggleProps) {
  return (
    <Button
      onClick={() => props.onToggled(props.active)}
      title="Toggle Grid View"
      active={props.active}
      className={`transition-all duration-200 ease-out flex items-center justify-center group`}
    >
      {/* Custom SVG 4-Square Layout Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 transition-transform duration-200 group-hover:scale-105 transform-gpu"
      >
        {/* Top-Left Square */}
        <rect x="3" y="3" width="7" height="7" rx="1" />
        {/* Top-Right Square */}
        <rect x="14" y="3" width="7" height="7" rx="1" />
        {/* Bottom-Left Square */}
        <rect x="3" y="14" width="7" height="7" rx="1" />
        {/* Bottom-Right Square */}
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    </Button>
  );
}
