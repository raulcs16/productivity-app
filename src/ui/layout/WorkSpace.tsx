"use client";

import React, { useState } from "react";

interface WorkspaceProps {
  workspace: React.ReactNode;
  sideBar: React.ReactNode;
  sideBarOpen: boolean;
}

export default function Workspace(props: WorkspaceProps) {
  // Defaulting to true so the user sees their file ecosystem on initial mount
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(props.sideBarOpen);

  return (
    <div className="w-full h-full flex overflow-hidden min-w-0 relative">
      {/* 1. Main Application Work Canvas Area */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
        {props.workspace}
      </div>

      {/* 2. Collapsible Sidebar Panel Container */}
      <div
        className={`h-full flex flex-col min-w-0 shrink-0 overflow-visible border-l border-slate-200 dark:border-slate-800 transition-all duration-200 ease-in-out relative ${
          sideBarOpen ? "w-64" : "w-0 border-l-0!"
        }`}
      >
        {/* 🛠️ Floating Toggle Tab Button: Anchored exactly on the left boundary edge */}
        <button
          onClick={() => {
            setSideBarOpen(!sideBarOpen);
          }}
          className="absolute top-4 -left-3.5 z-30 flex items-center justify-center w-7 h-7 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-full text-slate-300 shadow-md transition-colors focus:outline-none"
          title={sideBarOpen ? "Hide Sidebar" : "Show Sidebar"}
        >
          {sideBarOpen ? (
            /* Collapse Chevron pointing Right */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          ) : (
            /* Expand Chevron pointing Left */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          )}
        </button>

        {/* Inner Content Scrim Frame: Prevents text content from bleeding out when width is 0 */}
        <div
          className={`w-64 h-full flex flex-col overflow-hidden ${
            !sideBarOpen && "pointer-events-none opacity-0"
          }`}
        >
          {props.sideBar}
        </div>
      </div>
    </div>
  );
}
