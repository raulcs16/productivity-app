"use client";
import { useState } from "react";

interface GridToggleProps {
  onToggled: (state: boolean) => void;
}

export default function GridToggle({ onToggled }: GridToggleProps) {
  const [isGridActive, setIsGridActive] = useState(false);

  const handleToggle = () => {
    const nextState = !isGridActive;
    setIsGridActive(nextState);
    onToggled(nextState); // Broadcast the selection intent up to the parent workspace
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      title="Toggle Grid View"
      className={`p-2.5 rounded-lg border transition-all duration-200 ease-out flex items-center justify-center group ${
        isGridActive
          ? " border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/5"
          : " border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/50"
      }`}
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
    </button>
  );
}
