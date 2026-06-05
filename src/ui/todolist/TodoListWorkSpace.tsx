"use client";
import React, { useState } from "react";
import { Todo } from "@/src/core/todolist/todo";
import HoverCard from "../cards/HoverCard";
import TodoListView from "./TodoListView";

interface TodoListWorkSpaceProps {
  lists: Todo[][];
  title: string;
}

export default function TodoListWorkSpace(props: TodoListWorkSpaceProps) {
  // QML currentIndex tracking conversion
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalLists = props.lists.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalLists - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalLists - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-slate-900 text-white p-4 md:p-8 ">
      {/* Workspace Header */}
      <header className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="font-extrabold text-2xl tracking-tight">
          {props.title}
        </h1>

        {/* Navigation Controllers (simulating Flick/Swipe behaviors) */}
        {totalLists > 1 && (
          <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur p-1.5 rounded-xl border border-slate-700/50 shadow-lg">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all rounded-lg"
            >
              ◀ Prev
            </button>
            <span className="text-xs font-mono px-2 text-slate-400">
              {currentIndex + 1} / {totalLists}
            </span>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all rounded-lg"
            >
              Next ▶
            </button>
          </div>
        )}
      </header>

      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center perspective-1000">
        {props.lists.map((todos, index) => {
          let offset = index - currentIndex;

          // Universal loop logic for wrapping list counts around the carousel ring
          if (offset < -1) offset += totalLists;
          if (offset > 1) offset -= totalLists;

          const isVisible = Math.abs(offset) <= 1;
          if (!isVisible) return null;

          let transformStyles = "";
          let opacityStyle = "opacity-100";
          let zIndexStyle = "z-30";

          if (offset === 0) {
            // Center Focus Card: Sits squarely in front at default depth
            transformStyles =
              "translateX(0) translateZ(0) scale(1) rotateY(0deg)";
          } else if (offset === -1) {
            // Left Card: Pushed wide to the left, pushed BACK into the screen (-translateZ), angled inward
            transformStyles =
              "translateX(-110%) translateZ(-250px) scale(0.9) rotateY(25deg)";
            opacityStyle = "opacity-25 blur-[1.5px]";
            zIndexStyle = "z-10 pointer-events-none";
          } else if (offset === 1) {
            // Right Card: Pushed wide to the right, pushed BACK into the screen (-translateZ), angled inward
            transformStyles =
              "translateX(110%) translateZ(-250px) scale(0.9) rotateY(-25deg)";
            opacityStyle = "opacity-25 blur-[1.5px]";
            zIndexStyle = "z-10 pointer-events-none";
          }

          return (
            <div
              key={index}
              className={`w-full min-w-xl transition-all duration-500 ease-out transform-gpu ${opacityStyle} ${zIndexStyle}`}
              style={{
                transform: transformStyles,
              }}
            >
              {/* Injecting your local HoverCard wrapper containe*/}
              <HoverCard>
                <TodoListView
                  id={index}
                  title={`Board Workspace - ${index + 1}`}
                  todos={todos}
                  onItemDoubleClicked={(id, state, lId) =>
                    console.log("Task interactive handle:", id)
                  }
                />
              </HoverCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
