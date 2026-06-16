"use client";
interface NextPrevButtonsProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}
export default function NextPrevButtons(props: NextPrevButtonsProps) {
  return (
    <div className="flex items-center rounded-xl border border-slate-700/50 shadow-lg p-2.5 gap-1.5 text-xs font-mono text-slate-400">
      <button onClick={props.onPrev} className="text-lg">
        ◀
      </button>
      <p className="">
        <span className="">
          {props.currentIndex + (props.total > 0 ? 1 : 0)}
        </span>
        <span>/</span>
        <span>{props.total}</span>
      </p>
      <button onClick={props.onNext} className="text-lg">
        ▶
      </button>
    </div>
  );
}
