"use client";
import { useState } from "react";
import HoverCard from "@/src/ui/shared/cards/HoverCard";
import TodoListView from "./TodoListView";
import SlideOver from "../shared/views/SlideOver";
import Grid from "../shared/views/Grid";
import {
  useTodoAppController,
  useTodoAppStore,
} from "@/src/apps/TodoApp/TodoAppContext";
import { LayoutType } from "@/src/apps/TodoApp/TodoListApp";
import DotNavigation from "../shared/controls/DotNavigation";
interface TodoListWorkSpaceProps {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

export default function TodoListWorkSpace(props: TodoListWorkSpaceProps) {
  const store = useTodoAppStore();
  const controller = useTodoAppController();

  const [addNewListActive, setAddNewListActive] = useState(false);
  const totalLists = store.todolists.length;

  function scrollToBoard(index: number) {
    controller.setCurrentListIndex(index);
    if (props.layout !== LayoutType.Slide) props.setLayout(LayoutType.Slide);
  }

  function handlePrev() {
    if (totalLists == 0) return;
    const nextIndex =
      store.currentListIndex === 0
        ? totalLists - 1
        : store.currentListIndex - 1;
    scrollToBoard(nextIndex);
  }

  function handleNext() {
    if (totalLists == 0) return;
    const nextIndex =
      store.currentListIndex === totalLists - 1
        ? 0
        : store.currentListIndex + 1;
    scrollToBoard(nextIndex);
  }

  return (
    <div className="relative text-white  flex flex-col justify-start w-full h-full overflow-clip">
      {props.layout === LayoutType.Slide ? (
        <SlideOver
          items={store.todolists}
          currentIndex={store.currentListIndex}
          onIntentIndexChanged={(index) => {
            scrollToBoard(index);
          }}
          renderItem={(todolist, index, isFocused) => (
            <HoverCard
              index={index}
              className="h-[95%] md:ring-1 md:ring-amber-200 md:rounded-2xl"
              onClicked={(index) => {
                scrollToBoard(index);
              }}
            >
              <TodoListView id={todolist.id} title={todolist.title} />
            </HoverCard>
          )}
        ></SlideOver>
      ) : (
        <Grid
          items={store.todolists}
          currentIndex={store.currentListIndex}
          onItemClicked={(index) => {
            scrollToBoard(index);
          }}
          renderItem={(todolist, index, isFocused) => (
            <HoverCard
              index={index}
              className="h-full ring-1 ring-amber-300 rounded-2xl"
            >
              <TodoListView
                id={todolist.id}
                title={todolist.title}
              ></TodoListView>
            </HoverCard>
          )}
        ></Grid>
      )}
      {props.layout === LayoutType.Slide && (
        <div className="absolute w-1/2 flex items-center justify-center px-10 py-1 mx-auto bottom-1 left-1/2 -translate-x-1/2">
          <DotNavigation
            total={totalLists}
            currentIndex={store.currentListIndex}
            onIndexSelect={(index) => scrollToBoard(index)}
          ></DotNavigation>
        </div>
      )}
      <div className="absolute right-8 bottom-1 z-20">
        <button
          title="New List"
          className="flex items-center justify-center h-12 w-12 rounded-xl 
               bg-slate-900/60 hover:bg-indigo-600 
               text-slate-400 hover:text-white 
               border border-slate-800/80 hover:border-indigo-500
               shadow-lg shadow-black/20 hover:shadow-indigo-500/20
               transition-all duration-200 ease-in-out backdrop-blur-sm
               cursor-pointer active:scale-95"
          onClick={() => {
            controller.addList("new list", store.currentWorkSpaceId);
            setAddNewListActive(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 transition-transform duration-200 group-hover:rotate-90"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="12" y1="5" x2="12" y2="19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
