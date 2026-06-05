"use client";
import { todo_state } from "@/src/core/todolist/todo";
interface TodoDelegateProps {
  onDoubleClicked: (id: number, state: todo_state) => void;
  id: number;
  state: todo_state;
  task: string;
}

// 1. Create a dictionary that maps each enum state to its specific Tailwind styles
const textStyleMap: Record<todo_state, string> = {
  [todo_state.Scheduled]: "text-slate-600 font-normal",
  [todo_state.Ready]: "text-blue-700 font-medium",
  [todo_state.Started]: "text-amber-700 font-semibold animate-pulse", // Subtly pulses to show active work
  [todo_state.Completed]: "text-emerald-600 line-through opacity-70", // Strike-through and slightly faded
  [todo_state.Archived]: "text-slate-400 italic opacity-50", // Heavily faded and italicized
};

export default function TodoDelegate(props: TodoDelegateProps) {
  // 2. Look up the classes based on the current state, fallback to a safe default if needed
  const textStyles = textStyleMap[props.state] || "text-slate-900";

  return (
    <li
      className="px-2 py-1 cursor-pointer hover:bg-slate-50 transition-colors duration-200 rounded"
      onDoubleClick={() => props.onDoubleClicked(props.id, props.state)}
    >
      {/* 3. Inject the dynamic styles via a template literal */}
      <h1 className={`select-none text-base ${textStyles}`}>{props.task}</h1>
    </li>
  );
}
