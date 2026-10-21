"use client";

import { useCallback } from "react";
import WaveCanvas from "./wave-canvas";
import ScaledWindow from "./scaled-window";
import AppWindow from "./app-window";
import { SplitWords } from "./split";
import { IconNote } from "./icons";

export default function Hero() {
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  }, []);

  return (
    <section className="hero" id="top" onMouseMove={onMove}>
      <WaveCanvas />
      <div
        className="hero-glow"
        style={{
          transform:
            "translateX(calc(-50% + var(--mx,0)*40px)) translateY(var(--my,0)*16px)",
        }}
      />

      <div className="mx-auto grid max-w-[1380px] grid-cols-1 items-center gap-y-14 xl:grid-cols-[1.02fr_0.98fr] xl:gap-x-10">
        <div style={{ transform: "translate(var(--mx,0)*-14px, var(--my,0)*-8px)" }}>
          <p className="overline" data-hero style={{ "--d": ".05s" } as React.CSSProperties}>
            Local-first — Fedora first, everywhere
          </p>

          <h1
            className="hero-words display"
            data-hero
            style={{ margin: "26px 0 0" }}
          >
            <SplitWords gate="preload" text="Every track you own." />
            <em className="block">
              <SplitWords gate="preload" text="One keystroke away." d={0.16} />
            </em>
          </h1>

          <p
            className="hero-sub"
            style={
              { "--d": ".34s", marginTop: 30 } as React.CSSProperties
            }
            data-hero
          >
            Aubade lives on your machine and nowhere else. It reads your
            folders, sings your lyrics back in time and never asks for an
            account. Five thousand tracks, indexed before the kettle boils.
          </p>

          <div
            data-hero
            style={{ "--d": ".46s", } as React.CSSProperties}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a className="btn-primary" href="#get">
              <IconNote s={15} /> Download Aubade
            </a>
            <a className="btn-ghost" href="#poem">
              Read the morning poem ↓
            </a>
          </div>

          <dl
            data-hero
            style={{ "--d": ".58s", } as React.CSSProperties}
            className="mt-14 grid max-w-[560px] grid-cols-4 gap-6 border-t border-[var(--hair)] pt-6"
          >
            {[
              ["5,677", "track library"],
              ["0", "cloud, ever"],
              ["30hz", "lyrics clock"],
              ["82px", "island dock"],
            ].map(([b, t]) => (
              <div key={t} className="hstat">
                <b>{b}</b>
                {t}
              </div>
            ))}
          </dl>
        </div>

        <div
          className="aw-float"
          data-hero
          style={{ "--d": ".2s" } as React.CSSProperties}
        >
          <ScaledWindow>
            <AppWindow />
          </ScaledWindow>
        </div>
      </div>
    </section>
  );
}
