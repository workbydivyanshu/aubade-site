export type LegalSection = { h: string; p: string[] };

export function LegalPage({
  overline,
  title,
  updated,
  intro,
  sections,
}: {
  overline: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="legal-bg">
      <div className="mx-auto max-w-[860px] px-6 pb-32 pt-40">
        <p className="overline" data-reveal>
          {overline}
        </p>
        <h1 className="legal-title display" data-reveal>
          {title}
        </h1>
        <p className="legal-updated mono" data-reveal>
          Last kept current — {updated}
        </p>
        <p className="legal-intro" data-reveal>
          {intro}
        </p>

        <div className="legal-body">
          {sections.map((s, i) => (
            <section key={s.h} data-reveal style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}>
              <h2>
                <span className="legal-no mono">{String(i + 1).padStart(2, "0")}</span>
                {s.h}
              </h2>
              {s.p.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <a className="btn-ghost mt-14 inline-flex" href="/">
          ← Back to the player
        </a>
      </div>
    </main>
  );
}
