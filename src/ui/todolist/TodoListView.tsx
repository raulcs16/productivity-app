"use client";
import { Todo, todo_state } from "@/src/core/todolist/todo";
import TodoDelegate from "./TodoDelegate";
import TextInput from "../controls/TextInput";
interface TodoListViewProps {
  onItemDoubleClicked: (
    todoId: number,
    todoState: todo_state,
    listId: number
  ) => void;
  id: number;
  title: string;
  todos: Todo[];
}

interface TodoListSectionProps {
  id: number;
  title: string;
  textColor: string;
  todos: Todo[];
  onItemDoubleClicked: (
    todoId: number,
    todoState: todo_state,
    listId: number
  ) => void;
  isFocused?: boolean; // New prop to spotlight "Started"
}

export default function TodoListView(props: TodoListViewProps) {
  return (
    <div className="w-full mx-auto p-4">
      {/* Main Title Banner */}
      <header className="mb-6 pb-4 border-b border-slate-100">
        <h1 className="font-extrabold text-3xl text-slate-800 tracking-tight">
          {props.title}
        </h1>
      </header>

      <div className="space-y-3 ">
        <TextInput
          onChange={(text) => {}}
          onEnter={(text) => {}}
          placeHolder="Add Todo's"
        ></TextInput>
        {/* SECTION 2: READY */}
        <TodoListSection
          id={props.id}
          title="⚡ To Do"
          textColor="#3b82f6"
          todos={props.todos.filter((todo) => todo.state === todo_state.Ready)}
          onItemDoubleClicked={props.onItemDoubleClicked}
        />
        <TodoListSection
          id={props.id}
          title="🔥 In Progress / Started"
          textColor="#f59e0b"
          isFocused={true} // Triggers special emphasis styling
          todos={props.todos.filter(
            (todo) => todo.state === todo_state.Started
          )}
          onItemDoubleClicked={props.onItemDoubleClicked}
        />

        {/* SECTION 3: SCHEDULED */}
        <TodoListSection
          id={props.id}
          title="📅 Scheduled"
          textColor="#64748b"
          todos={props.todos.filter(
            (todo) => todo.state === todo_state.Scheduled
          )}
          onItemDoubleClicked={props.onItemDoubleClicked}
        />

        {/* SECTION 4: COMPLETED */}
      </div>

      {/* ARCHIVED (Tucked away neatly at the bottom out of view since it's historical data) */}
      <footer className="mt-12 pt-6 border-t border-slate-100">
        <TodoListSection
          id={props.id}
          title="✅ Completed"
          textColor="#10b981"
          todos={props.todos.filter(
            (todo) => todo.state === todo_state.Completed
          )}
          onItemDoubleClicked={props.onItemDoubleClicked}
        />
        <TodoListSection
          id={props.id}
          title="📦 Archived"
          textColor="#94a3b8"
          todos={props.todos.filter(
            (todo) => todo.state === todo_state.Archived
          )}
          onItemDoubleClicked={props.onItemDoubleClicked}
        />
      </footer>
    </div>
  );
}

function TodoListSection(props: TodoListSectionProps) {
  return (
    <section
      className={`
        p-5 rounded-2xl border transition-all duration-200
        ${
          props.isFocused
            ? "bg-amber-50/40 border-amber-200 shadow-md ring-1 ring-amber-300/30" // Special focus card
            : "bg-white border-slate-100 shadow-sm"
        }
      `}
    >
      <h2
        className={`font-bold text-lg flex items-center justify-between mb-3`}
        style={{ color: props.textColor }}
      >
        <span>{props.title}</span>
        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
          {props.todos.length}
        </span>
      </h2>

      {props.todos.length === 0 ? (
        <p className="text-sm text-slate-400 italic py-4 text-center">
          No tasks here
        </p>
      ) : (
        <ol className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {props.todos.map((todo) => (
            <TodoDelegate
              key={todo.id}
              id={todo.id}
              task={todo.task}
              state={todo.state}
              onDoubleClicked={(todoId, state) =>
                props.onItemDoubleClicked(todoId, state, props.id)
              }
            />
          ))}
        </ol>
      )}
    </section>
  );
}
