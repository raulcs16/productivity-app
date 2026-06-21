"use client";
import { useEffect, useState, useLayoutEffect, RefObject } from "react";
import { createPortal } from "react-dom";

interface FloatingPortalProps {
  children: React.ReactNode;
  anchorRef: RefObject<HTMLElement | null>;
  z: number;
}

export default function FloatingPortal({
  children,
  anchorRef,
  z,
}: FloatingPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Recalculate dimensions based on the target anchor's bounding box
  useLayoutEffect(() => {
    if (!mounted || !anchorRef.current) return;

    const updateCoords = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (rect) {
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    // Run once immediately
    updateCoords();

    // Listen to window resizing or scrolling to keep the position perfectly pinned
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, { capture: true });

    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, { capture: true });
    };
  }, [mounted, anchorRef]);

  if (!mounted || !coords) return null;

  return createPortal(
    <div
      className="absolute pointer-events-none"
      style={{
        top: coords.top,
        left: coords.left,
        width: coords.width,
        height: coords.height,
        zIndex: z,
      }}
    >
      {/* Re-enable pointer events for the actual input contents */}
      <div className="pointer-events-auto w-full h-full">{children}</div>
    </div>,
    document.body
  );
}
