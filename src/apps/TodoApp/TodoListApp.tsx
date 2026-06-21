"use client";
import Workspace from "@/src/ui/shared/layout/WorkSpace";
import TodoAppTitle from "./TodoAppTitle";
import { useState } from "react";
import GridToggle from "@/src/ui/shared/controls/GridToggle";
import TodoExplorer from "./TodoExplorer";
import { useTodoAppController, useTodoAppStore } from "./TodoAppContext";
import SlideListView from "@/src/ui/todolist/SlideListView";
import GridListView from "@/src/ui/todolist/GridListView";
import FolderSvg from "@/src/ui/shared/svg/FolderSvg";
import Button from "@/src/ui/shared/controls/Button";
import FileSvg from "@/src/ui/shared/svg/FileSvg";
import Scrim from "@/src/ui/shared/controls/Scrim";
import PopUp from "@/src/ui/shared/cards/PopUp";
import TextInput from "@/src/ui/shared/controls/TextInput";

interface TodoListAppProps {}

export enum LayoutType {
  Grid,
  Slide,
}

export default function TodoListApp(props: TodoListAppProps) {
  const store = useTodoAppStore();
  const controller = useTodoAppController();
  const [layout, setLayout] = useState<LayoutType>(LayoutType.Slide);
  const [addMenu, setAddMenu] = useState<boolean>(false);
  const [addDir, setAddDir] = useState<boolean>(false);
  const [addList, setAddList] = useState<boolean>(false);
  function ToggleLayout() {
    if (layout === LayoutType.Slide) setLayout(LayoutType.Grid);
    if (layout === LayoutType.Grid) setLayout(LayoutType.Slide);
  }
  return (
    <>
      <div className="w-full h-full flex flex-col relative overflow-hidden">
        <Workspace
          leftHeader={
            <GridToggle
              onToggled={() => ToggleLayout()}
              active={layout === LayoutType.Grid}
            ></GridToggle>
          }
          title={<TodoAppTitle></TodoAppTitle>}
          workspace={
            layout === LayoutType.Slide ? (
              <SlideListView
                todolists={store.todolists}
                currentIndex={store.currentListIndex}
                onCurrentIndexChanged={(index) =>
                  controller.setCurrentListIndex(index)
                }
              ></SlideListView>
            ) : (
              <GridListView
                todolists={store.todolists}
                currentIndex={store.currentListIndex}
                onCurrentIndexChanged={(index) => {
                  controller.setCurrentListIndex(index);
                  setLayout(LayoutType.Slide);
                }}
              ></GridListView>
            )
          }
          sideBarOpen={false}
          sideBar={<TodoExplorer></TodoExplorer>}
        ></Workspace>
        <div className="">
          {addMenu && (
            <>
              <Scrim onClickedAway={() => setAddMenu(false)} z={40}></Scrim>
              <div
                className="p-5 border fixed bottom-15 right-15 flex gap-5 rounded-2xl items-start
        backdrop-blur-md border-slate-800/60 z-50
        "
              >
                <Button
                  onClick={() => {
                    setAddMenu(false);
                    setAddDir(true);
                  }}
                  title={"add Workspace"}
                  active={true}
                >
                  <FolderSvg width={50} height={50}></FolderSvg>
                  <p>Add New WorkSpace</p>
                </Button>
                {store.currentWorkSpaceId > 0 && (
                  <Button
                    onClick={() => {
                      setAddMenu(false);
                      setAddList(true);
                    }}
                    title={"add Workspace"}
                    active={true}
                  >
                    <FileSvg width={50} height={50}></FileSvg>
                    <p>Add New List</p>
                  </Button>
                )}
              </div>
            </>
          )}
          <button
            title="addMenu"
            className=" fixed bottom-6 right-6 z-30 flex items-center justify-center h-12 w-12 rounded-xl 
        bg-slate-900/60 hover:bg-indigo-600 
        text-slate-400 hover:text-white 
        border border-slate-800/80 hover:border-indigo-500
        shadow-lg shadow-black/20 hover:shadow-indigo-500/20
        transition-all duration-200 ease-in-out backdrop-blur-sm
        cursor-pointer active:scale-95 group"
            onClick={() => {
              setAddMenu(true);
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
      <PopUp visible={addDir} onClickedAway={() => setAddDir(false)}>
        <p>Add Directory</p>
        <TextInput
          placeHolder="New Directory"
          onEnter={(text) => {
            setAddDir(false);
            controller.addWorkSpace(text);
          }}
          onChange={(text) => {}}
          onBlur={() => {}}
        ></TextInput>
      </PopUp>
      <PopUp visible={addList} onClickedAway={() => setAddList(false)}>
        <p>Add Directory</p>
        <TextInput
          placeHolder="New List"
          onEnter={(text) => {
            setAddList(false);
            controller.addList(text, store.currentWorkSpaceId);
          }}
          onChange={(text) => {}}
          onBlur={() => {}}
        ></TextInput>
      </PopUp>
    </>
  );
}
