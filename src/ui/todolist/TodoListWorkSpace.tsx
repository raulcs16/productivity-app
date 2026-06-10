"use client";
import React, { useRef, useState, useEffect } from "react";
import { Todo } from "@/src/core/todolist/todo";
import HoverCard from "../cards/HoverCard";
import TodoListView from "./TodoListView";
import NextPrevButtons from "../controls/NextPrevButtons";
import SlideOver from "../views/SlideOver";
import Grid from "../views/Grid";
import GridToggle from "../controls/GridToggle";

interface TodoListWorkSpaceProps {
  lists: Todo[][];
  title: string;
}

export default function TodoListWorkSpace(props: TodoListWorkSpaceProps) {
  const [layout, setLayout] = useState(0); //0 for slide, 1 for grid select
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalLists = props.lists.length;

  function scrollToBoard(index: number) {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  }

  function handlePrev() {
    const nextIndex = currentIndex === 0 ? totalLists - 1 : currentIndex - 1;
    scrollToBoard(nextIndex);
  }

  function handleNext() {
    const nextIndex = currentIndex === totalLists - 1 ? 0 : currentIndex + 1;
    scrollToBoard(nextIndex);
  }
  function handleToggle(state: boolean) {
    if (!state) {
      if (layout == 0) return;
      setLayout(0);
    }
    if (state) {
      if (layout == 1) return;
      setLayout(1);
    }
  }

  return (
    <div className="bg-slate-900 text-white p-4 md:p-8 flex flex-col justify-start w-full h-full overflow-clip">
      <header className="w-full mb-4 flex items-center justify-between shrink-0">
        <h1 className="font-extrabold text-2xl tracking-tight">
          {props.title}
        </h1>

        <div className="flex gap-2 items-center">
          <GridToggle
            onToggled={(state) => {
              handleToggle(state);
            }}
          ></GridToggle>
          {totalLists > 1 && (
            <NextPrevButtons
              total={totalLists}
              currentIndex={currentIndex}
              onNext={() => handleNext()}
              onPrev={() => handlePrev()}
            ></NextPrevButtons>
          )}
        </div>
      </header>
      {layout === 0 ? (
        <SlideOver
          items={props.lists}
          currentIndex={currentIndex}
          onIntentIndexChanged={(index) => {
            scrollToBoard(index);
          }}
          renderItem={(todos, index, isFocused) => (
            <HoverCard
              index={index}
              className="h-full p-6"
              onClicked={(index) => {
                scrollToBoard(index);
              }}
            >
              <TodoListView
                id={index}
                title={`Board Workspace - ${index + 1}`}
                todos={todos}
                onItemDoubleClicked={(id, state, lId) =>
                  console.log("Task click:", id)
                }
              />
            </HoverCard>
          )}
        ></SlideOver>
      ) : (
        <Grid
          items={props.lists}
          currentIndex={currentIndex}
          onItemClicked={(index) => {
            scrollToBoard(index);
            setLayout(0);
          }}
          renderItem={(todos, index, isFocused) => (
            <HoverCard index={index} className="h-full p-6">
              <TodoListView
                id={index}
                title={`Board Workspace -${index + 1}`}
                todos={todos}
                onItemDoubleClicked={(id) => {
                  console.log("task click");
                }}
              ></TodoListView>
            </HoverCard>
          )}
        ></Grid>
      )}
    </div>
  );
}
