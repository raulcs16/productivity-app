"use client";
interface NextPrevButtonsProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}
export default function NextPrevButtons(props: NextPrevButtonsProps) {
  return (
    <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur p-1.5 rounded-xl border border-slate-700/50 shadow-lg z-50">
      <button
        onClick={props.onPrev}
        className="px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all rounded-lg"
      >
        ◀ Prev
      </button>
      <span className="text-xs font-mono px-2 text-slate-400">
        {props.currentIndex + 1} / {props.total}
      </span>
      <button
        onClick={props.onNext}
        className="px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all rounded-lg"
      >
        Next ▶
      </button>
    </div>
  );
}
