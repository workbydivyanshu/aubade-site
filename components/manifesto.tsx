"use client";

import { useEffect, useRef } from "react";
import { SplitWords } from "./split";

const LINES = [
  "An aubade is a poem lovers trade at dawn.",
  "The player by that name takes after it:",
  "quiet, personal, exactly on time.",
  "Your music stays in your folders. So does Aubade.",
  "No account signs you in. No library leaves home.",
  "One keystroke finds the song.",
  "The day can start with the chorus. It usually does.",
];

export default function Manifesto() {
  const poemRef = useRef<HTMLDivElement>(null);
  const lyricRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (document.documentElement.classList.contains("rm")) {
      lyricRefs.current.forEach((el) => el?.classList.add("on"));
      poemRef.current?.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const poem = poemRef.current;
      if (!poem) return;
      const vhCenter = window.innerHeight * 0.55;
      const rect = poem.getBoundingClientRect();
      lyricRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < vhCenter) el.classList.add("on");
      });
      const p = Math.min(1, Math.max(0, (vhCenter - rect.top) / rect.height));
      poem.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section" id="poem">
      <div className="mx-auto max-w-[1200px]">
        <div className="sect-head">
          <p className="overline" data-reveal>
            Side A: the case for quiet
          </p>
          <h2
            className="sect-title"
            style={{ maxWidth: 640 }}
          >
            <SplitWords text="The whole app reads like a morning poem." />
          </h2>
        </div>

        <div className="poem" ref={poemRef}>
          <i className="fill" />
          {LINES.map((l, i) => (
            <div
              key={i}
              className="lyric"
              ref={(el) => {
                lyricRefs.current[i] = el;
              }}
            >
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              <p>{l}</p>
            </div>
          ))}
        </div>

        <p
          className="mt-14"
          style={{
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--dim)",
          }}
          data-reveal
        >
          This page runs alone: no trackers, no banner ads, no background calls.
        </p>
      </div>
    </section>
  );
}
