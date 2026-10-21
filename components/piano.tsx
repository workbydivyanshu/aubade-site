"use client";

import { useCallback, useRef } from "react";

/**
 * Footer piano — hover: keys rise & glow in accent; click: an honest
 * WebAudio pluck. No samples, no libraries: a decaying sine per key.
 */
const WHITES = [
  { name: "C", f: 261.63 },
  { name: "D", f: 293.66 },
  { name: "E", f: 329.63 },
  { name: "F", f: 349.23 },
  { name: "G", f: 392.0 },
  { name: "A", f: 440.0 },
  { name: "B", f: 493.88 },
  { name: "C", f: 523.25 },
  { name: "D", f: 587.33 },
  { name: "E", f: 659.25 },
];

/** black keys sit between the ordered whites above */
const BLACKS: { name: string; f: number; left: string }[] = [
  { name: "C#", f: 277.18, left: "7%" },
  { name: "D#", f: 311.13, left: "17%" },
  { name: "F#", f: 369.99, left: "37%" },
  { name: "G#", f: 415.3, left: "47%" },
  { name: "A#", f: 466.16, left: "57%" },
];

export default function Piano() {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback((freq: number) => {
    try {
      if (!ctxRef.current) {
        Ctor: {
          const Ctor =
            window.AudioContext ??
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext;
          if (!Ctor) break Ctor;
          ctxRef.current = new Ctor();
        }
      }
      const ctx = ctxRef.current;
      if (!ctx) return;
      const t0 = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.09, t0 + 0.014);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.5);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(t0 + 1.6);
    } catch {
      /* sound is decoration; never a failure */
    }
  }, []);

  return (
    <div className="piano" role="group" aria-label="Decorative keyboard — press a key to hear a note">
      <p className="piano-hint mono">HOVER — AND IF YOU LIKE, PRESS</p>
      <div className="piano-keys">
        {WHITES.map((n, i) => (
          <button
            key={i}
            className="pkey"
            aria-label={`Play ${n.name} key ${i + 1}`}
            onClick={() => play(n.f)}
          >
            <span className="pkey-glyph mono">{n.name}</span>
          </button>
        ))}
        {BLACKS.map((b) => (
          <button
            key={b.name + b.left}
            className="bkey"
            aria-label={`Play ${b.name} sharp`}
            onClick={() => play(b.f)}
            style={{ left: b.left }}
          />
        ))}
      </div>
    </div>
  );
}
