"use client";
import { ReactNode } from "react";

interface GridProps<T> {
  items: T[];
  currentIndex: number;
  onItemClicked: (index: number) => void;
  renderItem: (item: T, index: number, isFocused: boolean) => ReactNode;
}

export default function Grid<T>({
  items,
  currentIndex,
  onItemClicked,
  renderItem,
}: GridProps<T>) {
  return (
    <div className="w-full flex flex-wrap gap-6 justify-start items-stretch pt-6 pb-12 mx-auto overflow-y-auto">
      {items.map((item, index) => {
        const isFocused = index === currentIndex;

        return (
          <div
            key={index}
            onClick={() => onItemClicked(index)}
            // Grid sizing forces items to stay compact
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[220px] max-w-[320px] flex flex-col justify-start cursor-pointer group"
          >
            {/* 🛠️ Compact Miniature Window: Scales down whatever content is placed inside */}
            <div className="w-full grow overflow-hidden rounded-lg p-2 pointer-events-none select-none max-h-1/2">
              <div
                className="w-[133%] h-[133%] origin-top-left scale-[0.75] transform-gpu transition-opacity duration-300"
                style={{ opacity: isFocused ? 1.0 : 0.5 }}
              >
                {renderItem(item, index, isFocused)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
