import { ReactNode } from "react";
import Scrim from "../controls/Scrim";

interface PopUpProps {
  visible: boolean;
  onClickedAway: () => void;
  children: ReactNode; // Fixed typo from 'chidren'
}

export default function PopUp({
  visible,
  onClickedAway,
  children,
}: PopUpProps) {
  // If the popup shouldn't be seen, don't render anything
  if (!visible) return null;

  return (
    <>
      {/* 1. Backdrop Scrim */}
      <Scrim
        onClickedAway={onClickedAway} // Wired up the close callback
        z={50}
      />

      <div className="fixed inset-0 z-80 flex items-center justify-center p-4 pointer-events-none ">
        {/* ADDED: Full-screen backdrop blur element */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="pointer-events-auto w-full max-w-md transform overflow-hidden rounded-xl border px-1 pt-1 pb-6 text-left align-middle shadow-2xl shadow-black/80 transition-all transform-gpu animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={onClickedAway}
              className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer text-sm font-bold w-7 h-7 flex items-center justify-center focus:outline-none"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          {/* Body Content */}
          <div className="text-slate-200 p-4">{children}</div>
        </div>
      </div>
    </>
  );
}
