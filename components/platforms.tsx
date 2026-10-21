import { SplitWords } from "./split";

const RUNS: {
  sys: string;
  pkg: string;
  route: string;
  how: string;
}[] = [
  { sys: "Fedora", pkg: "aubade_NNN_x86_64.rpm", route: "/download/fedora", how: "sudo dnf install ./aubade_NNN_x86_64.rpm" },
  { sys: "Ubuntu · Debian", pkg: "aubade_NNN_amd64.deb", route: "/download/debian", how: "sudo dpkg -i ./aubade_NNN_amd64.deb" },
  { sys: "Any Linux", pkg: "aubade_NNN_x86_64.AppImage", route: "/download/linux", how: "chmod +x aubade_NNN_x86_64.AppImage && ./aubade_NNN_x86_64.AppImage" },
  { sys: "Windows", pkg: "aubade_NNN_windows-x86_64-setup.exe", route: "/download/windows", how: "double-click the installer, or stay portable with the .zip" },
  { sys: "macOS · Apple Silicon", pkg: "aubade_NNN_macos-arm64.zip", route: "/download/macos-arm64", how: "unzip and launch" },
  { sys: "macOS · Intel", pkg: "aubade_NNN_macos.dmg", route: "/download/macos", how: "open the .dmg, drag to Applications" },
];

export function Platforms() {
  return (
    <section className="section" id="runs">
      <div className="mx-auto max-w-[1380px]">
        <div className="sect-head">
          <p className="overline" data-reveal>
            Side D: the morning machines
          </p>
          <h2 className="sect-title" style={{ maxWidth: 760 }}>
            <SplitWords text="Runs where your mornings run." />
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
            NNN = current version
          </span>
        </div>

        <ul className="runs" data-reveal>
          {RUNS.map((r) => (
            <li key={r.route + r.pkg} className="run-row">
              <span className="run-sys">{r.sys}</span>
              <code className="run-pkg mono">{r.pkg}</code>
              <code className="run-how mono">{r.how}</code>
              <a className="run-go mono" href={r.route}>
                take it →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
