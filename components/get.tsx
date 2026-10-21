import { IconNote } from "./icons";
import { SplitWords } from "./split";

const FORMATS = [
  ".rpm",
  ".deb",
  ".appimage",
  "setup.exe",
  "portable.zip",
  ".dmg",
  "arm64.zip",
];

export function GetSection() {
  return (
    <section className="section" id="get">
      <div className="mx-auto max-w-[1100px] get-wrap">
        <p className="overline" data-reveal>
          Free, forever — seven formats
        </p>
        <h2 className="get-title" style={{ marginTop: 18 }}>
          <SplitWords text="Get the app." />
        </h2>
        <p
          data-reveal
          style={{
            margin: "26px auto 0",
            maxWidth: 480,
            color: "var(--sub)",
            fontSize: 16,
            lineHeight: 1.7,
          }}
        >
          Seven packages, every major desktop, one player. Small installs,
          honest formats and a library that never phones home.
        </p>
        <div className="chip-row" data-reveal style={{ marginTop: 34 }}>
          {FORMATS.map((f) => (
            <span key={f} className="fmt">
              {f}
            </span>
          ))}
        </div>
        <div data-reveal style={{ marginTop: 38 }}>
          <a className="btn-primary" href="/download">
            <IconNote s={15} /> Open the download page
          </a>
        </div>
      </div>
    </section>
  );
}
