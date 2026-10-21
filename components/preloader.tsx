"use client";

import { useEffect, useRef, useState } from "react";

const WORD = "AUBADE";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const skip = sessionStorage.getItem("aubade_pre");
    const rm = html.classList.contains("rm");
    if (skip) {
      html.classList.remove("loading");
      html.classList.add("ready");
      setHidden(true);
      return;
    }

    let raf = 0;
    let start = performance.now();
    let fontsReady = false;
    Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => setTimeout(r, rm ? 200 : 900)),
    ]).then(() => (fontsReady = true));

    const total = rm ? 300 : 1350;
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      const eased = ease(p);
      setCount(Math.round(eased * 100));
      if (barRef.current) barRef.current.style.width = `${eased * 100}%`;
      if (p < 1 || !fontsReady) {
        raf = requestAnimationFrame(tick);
        if (!fontsReady && p >= 1) start = t; // hold at 100 briefly for fonts
      } else {
        finish();
      }
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setDone(true);
      const t0 = performance.now();
      // allow the cover to start lifting before unlocking scroll
      setTimeout(() => {
        html.classList.remove("loading");
        html.classList.add("ready");
        sessionStorage.setItem("aubade_pre", "1");
      }, 90);
      setTimeout(() => setHidden(true), 1050);
      void t0;
    };
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div className={`preloader ${done ? "done" : ""}`} aria-hidden="true">
      <div className="pre-inner">
        <div className="pre-word">
          {WORD.split("").map((c, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>
              {c}
            </span>
          ))}
        </div>
        <div className="pre-sub">
          <i />
          A LOCAL-FIRST MUSIC PLAYER
          <i />
        </div>
      </div>
      <div className="pre-tray">
        <span>YOURS · UNPLUGGED</span>
        <span className="pre-count">
          {String(count).padStart(3, "0")}
        </span>
        <span>DUSK → DAWN</span>
      </div>
      <div className="pre-bar" ref={barRef} />
    </div>
  );
}
