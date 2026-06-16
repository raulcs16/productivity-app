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
    <div className="w-full h-full flex flex-wrap mx-auto justify-center  items-center overflow-auto">
      {items.map((item, index) => {
        const isFocused = index === currentIndex;

        return (
          <div
            key={index}
            onClick={() => onItemClicked(index)}
            // Grid sizing forces items to stay compact
            className="w-[calc(42%-12px)] h-[calc(45%)] flex flex-col justify-start cursor-pointer group"
          >
            <div className="grow overflow-hidden rounded-lg p-2 pointer-events-none select-none">
              <div
                className="w-[133%] h-[133%] origin-top-left scale-[0.75] transform-gpu transition-opacity duration-300 "
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
