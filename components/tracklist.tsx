import { SplitWords } from "./split";

const CUES = [
  {
    no: "01",
    t: "Local-first, always",
    p: "Your music is a folder, and Aubade reads it in place. Files never leave the machine that bought them — the cloud gets to live in its own story, on someone else's page.",
    meta: ["no cloud", "offline at boot"],
  },
  {
    no: "02",
    t: "Lyrics, word for word",
    p: "A 30Hz karaoke clock keeps every line in step with the vocal — glowing when it sings, dimming when it rests. Typography that finally keeps time.",
    meta: ["30hz sync", "scroll to catch up"],
  },
  {
    no: "03",
    t: "Hi-res, honestly told",
    p: "FLAC and Opus keep their true names. The dock prints OPUS 44.1 like a press stamp — what you hear is exactly what the file says, and nothing pretends to be richer than that.",
    meta: ["flac", "opus 44.1", "mp3"],
  },
  {
    no: "04",
    t: "Commands before menus",
    p: "Ctrl K opens one command field that reaches the whole library — search, queue, play, jump. Two hands stay where they usually are: on the keys.",
    meta: ["ctrl k", "instant jump"],
  },
  {
    no: "05",
    t: "The island dock",
    p: "One floating island holds transport, lyrics and queue in eighty-two calm pixels. It rises when you reach for it and keeps out of the way when you listen.",
    meta: ["82px", "r16 island", "reduce-friendly"],
  },
  {
    no: "06",
    t: "Dawn-fast search",
    p: "The index lives in memory, so thousands of titles stay a keystroke apart. Type three letters — the answer was already waiting for you.",
    meta: ["in-memory", "keyboard-tight"],
  },
];

export default function Tracklist() {
  return (
    <section className="section" id="cues">
      <div className="mx-auto max-w-[1380px]">
        <div className="sect-head">
          <p className="overline" data-reveal>
            Side B — what it does
          </p>
          <h2 className="sect-title" style={{ maxWidth: 720 }}>
            <SplitWords text="Every feature, cue by cue." />
          </h2>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--dim)",
            }}
            data-reveal
          >
            Six cues — pressing on both
          </span>
        </div>

        <ol className="cue" data-reveal>
          {CUES.map((c) => (
            <li key={c.no} className="cue-row">
              <span className="cue-no" aria-hidden="true">
                {c.no}
              </span>
              <div className="cue-body">
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
              <div className="cue-meta">
                {c.meta.map((m) => (
                  <s key={m}>{m}</s>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
