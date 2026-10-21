"use client";

import { useEffect, useRef } from "react";

/**
 * "Dawn synth" background — slow layered waves in Aubade's exact palette.
 * Reduced motion: painted once, then still.
 */
export default function WaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let running = true;
    const rm = document.documentElement.classList.contains("rm");

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    type Wave = { amp: number; f: number; sp: number; base: number; a: number; c: string; wdt: number; ph: number };
    const waves: Wave[] = [
      { amp: 30, f: 0.0021, sp: 0.00016, base: 0.4, a: 0.16, c: "224,48,48", wdt: 2, ph: 0 },
      { amp: 48, f: 0.0012, sp: -0.00011, base: 0.48, a: 0.09, c: "224,48,48", wdt: 1.6, ph: 1.7 },
      { amp: 76, f: 0.0007, sp: 0.00007, base: 0.56, a: 0.07, c: "224,160,48", wdt: 1.4, ph: 3.1 },
      { amp: 18, f: 0.0034, sp: -0.00019, base: 0.36, a: 0.05, c: "245,244,240", wdt: 1.2, ph: 5.2 },
    ];

    type P = { x: number; y: number; v: number; s: number; a: number; c: string };
    const dust: P[] = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.006 + Math.random() * 0.03,
      s: 0.6 + Math.random() * 1.5,
      a: 0.04 + Math.random() * 0.14,
      c: Math.random() < 0.25 ? "224,48,48" : "245,244,240",
    }));

    const resize = () => {
      const r = cv.parentElement!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // dust
      for (const p of dust) {
        p.y -= p.v / 60;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        ctx.globalAlpha = p.a;
        ctx.fillStyle = `rgb(${p.c})`;
        ctx.beginPath();
        ctx.ellipse(p.x * w, p.y * h, p.s, p.s * 1.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // waves — two passes: wide glow, then core line
      for (const wv of waves) {
        const trace = (lw: number, alpha: number) => {
          ctx.beginPath();
          ctx.moveTo(0, h * wv.base);
          for (let x = 0; x <= w; x += 10) {
            const y =
              h * wv.base +
              Math.sin(x * wv.f + t * wv.sp + wv.ph) * wv.amp +
              Math.sin(x * wv.f * 2.7 + t * wv.sp * 1.6 + wv.ph) * wv.amp * 0.28;
            ctx.lineTo(x, y);
          }
          ctx.strokeStyle = wv.c.startsWith("224,48,48")
            ? `rgba(${wv.c},${alpha})`
            : `rgba(${wv.c},${alpha})`;
          ctx.lineWidth = lw;
          ctx.lineCap = "round";
          ctx.stroke();
        };
        trace(wv.wdt * 4, wv.a * 0.22);
        trace(wv.wdt, wv.a);
      }
    };

    const loop = (t: number) => {
      if (running && visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (rm) {
      draw(36000);
    } else {
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(cv);
      const onVis = () => (visible = !document.hidden && visible);
      document.addEventListener("visibilitychange", onVis);
      const ro = new ResizeObserver(() => { resize(); });
      ro.observe(cv.parentElement!);
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      };
    }
    const ro2 = new ResizeObserver(() => resize());
    ro2.observe(cv.parentElement!);
    return () => ro2.disconnect();
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
