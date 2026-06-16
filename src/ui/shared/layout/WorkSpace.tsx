"use client";

import React, { useState } from "react";
import Button from "../controls/Button";

interface WorkspaceProps {
  title: string;
  workspace: React.ReactNode;
  sideBar: React.ReactNode;
  sideBarOpen: boolean;
}

export default function Workspace(props: WorkspaceProps) {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(props.sideBarOpen);

  return (
    <div className="w-full h-full pt-3">
      <div className="w-full h-5 flex justify-between px-3 items-center pb-3 border-b border-slate-800">
        <div></div>
        <h1 className="font-extrabold text-xl tracking-tight">{props.title}</h1>
        <button
          onClick={() => {
            setSideBarOpen(!sideBarOpen);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            {/* Left Rectangle: Main Workspace (Always hollow) */}
            <rect x="3" y="3" width="11" height="18" rx="1.5" fill="none" />

            {/* Right Rectangle: Sidebar (Fills white if open) */}
            <rect
              x="14"
              y="3"
              width="7"
              height="18"
              rx="1.5"
              fill={sideBarOpen ? "currentColor" : "none"}
            />
          </svg>
        </button>
      </div>
      <div className="w-full h-full flex overflow-hidden min-w-0 relative">
        <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
          {props.workspace}
        </div>
        <div
          className={`h-full flex flex-col min-w-0 shrink-0 overflow-visible border-l border-slate-200 dark:border-slate-800 transition-all duration-200 ease-in-out relative ${
            sideBarOpen ? "w-64" : "w-0 border-l-0!"
          }`}
        >
          <div
            className={`w-64 h-full flex flex-col overflow-hidden ${
              !sideBarOpen && "pointer-events-none opacity-0"
            }`}
          >
            {props.sideBar}
          </div>
        </div>
      </div>
    </div>
  );
}
