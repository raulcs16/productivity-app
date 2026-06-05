import React from "react";

interface HoverCardProps {
  // 1. Tell TypeScript this component accepts other components inside it
  children: React.ReactNode;
}

export default function HoverCard({ children }: HoverCardProps) {
  return (
    <div
      className="
        p-6 
        bg-white 
        border border-slate-100 
        rounded-2xl 
        ring-1 ring-amber-300/30
        
        /* 2. Hover Interaction States */
        transition-all 
        duration-300 
        ease-out 
        hover:scale-[1.01]     /* Grows slightly by 1% */
        hover:shadow-xl        /* Drops a deeper, softer shadow */
      "
    >
      {/* 3. Render whatever component was passed inside */}
      {children}
    </div>
  );
}
