"use client";
import React, { useRef, useState, useEffect } from "react";
import { Todo, TodoList } from "@/src/core/todolist/todo";
import HoverCard from "@/src/ui/shared/cards/HoverCard";
import TodoListView from "./TodoListView";
import NextPrevButtons from "../shared/controls/NextPrevButtons";
import SlideOver from "../shared/views/SlideOver";
import Grid from "../shared/views/Grid";
import GridToggle from "../shared/controls/GridToggle";
import Button from "../shared/controls/Button";
import {
  useTodoAppController,
  useTodoAppStore,
} from "@/src/apps/TodoApp/TodoAppContext";
interface TodoListWorkSpaceProps {}

export default function TodoListWorkSpace(props: TodoListWorkSpaceProps) {
  const store = useTodoAppStore();
  const controller = useTodoAppController();
  const [layout, setLayout] = useState(0); //0 for slide, 1 for grid select

  const [addNewListActive, setAddNewListActive] = useState(false);
  const totalLists = store.todolists.length;

  function scrollToBoard(index: number) {
    controller.setCurrentListIndex(index);
    if (layout !== 0) setLayout(0);
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
  function handleToggle(state: boolean) {
    if (!state) {
      if (layout === 1) return;
      setLayout(1);
    }
    if (state) {
      if (layout === 0) return;
      setLayout(0);
    }
  }

  return (
    <div className=" text-white  flex flex-col justify-start w-full h-full overflow-clip">
      <header className="w-full px-8 py-2 mb-4 flex flex-col md:flex-row items-center justify-between shrink-0 gap-4">
        <div className="w-full flex items-center  justify-between md:justify-end gap-4">
          <GridToggle
            active={layout === 1}
            onToggled={(state) => {
              handleToggle(state);
            }}
          ></GridToggle>
          <NextPrevButtons
            total={totalLists}
            currentIndex={store.currentListIndex}
            onNext={() => handleNext()}
            onPrev={() => handlePrev()}
          ></NextPrevButtons>
          <Button
            title="New List"
            onClick={() => {
              controller.addList("new list", store.currentWorkSpaceId);
              setAddNewListActive(false);
            }}
            active={addNewListActive}
          >
            New List
          </Button>
        </div>
      </header>
      {layout === 0 ? (
        <SlideOver
          items={store.todolists}
          currentIndex={store.currentListIndex}
          onIntentIndexChanged={(index) => {
            scrollToBoard(index);
          }}
          renderItem={(todolist, index, isFocused) => (
            <HoverCard
              index={index}
              className="h-full"
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
            <HoverCard index={index} className="h-full p-6">
              <TodoListView
                id={todolist.id}
                title={todolist.title}
              ></TodoListView>
            </HoverCard>
          )}
        ></Grid>
      )}
    </div>
  );
}
