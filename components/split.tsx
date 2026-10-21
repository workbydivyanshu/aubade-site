import React from "react";

type Props = {
  text: string;
  className?: string;
  /** seconds before the first word */
  d?: number;
  /** reveal via scroll (default) or ride the preloader handoff */
  gate?: "reveal" | "preload";
};

/** Split a string into clipped words that rise on trigger. */
export function SplitWords({ text, className, d = 0, gate = "reveal" }: Props) {
  const words = text.split(" ");
  return (
    <span
      className={`words ${className ?? ""}`}
      {...(gate === "preload" ? { "data-hero": true } : { "data-reveal": true })}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="clip">
            <span
              className="w"
              style={{ "--i": i, "--d": `${d}s` } as React.CSSProperties}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
