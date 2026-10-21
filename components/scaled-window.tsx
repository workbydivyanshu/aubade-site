"use client";

import { useEffect, useRef, useState } from "react";

/** Scales the fixed 1120px app artboard to any container width. */
export default function ScaledWindow({ children }: { children: React.ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const measure = () => {
      if (!stage.current) return;
      const w = stage.current.clientWidth;
      setScale(Math.max(0.28, Math.min(1, w / 1120)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={stage}
      className="aw-stage"
      style={{ height: Math.round(708 * scale) }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: 1120,
        }}
      >
        {children}
      </div>
    </div>
  );
}
