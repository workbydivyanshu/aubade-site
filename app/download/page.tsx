import type { Metadata } from "next";
import { getRelease, humanSize, type AssetKey } from "@/lib/releases";
import { SplitWords } from "@/components/split";
import SmartPick from "@/components/smart-pick";

export const metadata: Metadata = {
  title: "Download — Aubade",
  description:
    "Seven packages for every major desktop. Smart pick for your OS, direct one-tap links for Fedora, Ubuntu, Windows and the Mac.",
};

export const revalidate = 60;

const CARDS: {
  key: AssetKey;
  group: "linux" | "windows" | "macos";
  plat: string;
  route: string;
  line: string;
  id?: string;
}[] = [
  { key: "rpm", group: "linux", plat: "Fedora / openSUSE", route: "/download/fedora", line: "sudo dnf install ./" },
  { key: "deb", group: "linux", plat: "Ubuntu / Debian", route: "/download/debian", line: "sudo dpkg -i ./" },
  { key: "appimage", group: "linux", plat: "Any Linux", route: "/download/linux", line: "chmod +x . && ./" },
  { key: "winSetup", group: "windows", plat: "Windows · installer", route: "/download/windows", line: "double-click and follow the steps", id: "dl-setup" },
  { key: "winZip", group: "windows", plat: "Windows · portable", route: "/download/portable", line: "unzip, run, leave no trace" },
  { key: "macosDmg", group: "macos", plat: "macOS · Intel", route: "/download/macos", line: "open the .dmg, drag to Applications", id: "dl-dmg" },
  { key: "macosZip", group: "macos", plat: "macOS · Apple Silicon", route: "/download/macos-arm64", line: "unzip and launch" },
];

const GROUPS: { id: "linux" | "windows" | "macos"; label: string }[] = [
  { id: "linux", label: "Linux" },
  { id: "windows", label: "Windows" },
  { id: "macos", label: "macOS" },
];

export default async function DownloadPage() {
  const rel = await getRelease();

  const monthYear = rel.date
    ? new Date(rel.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  return (
    <main className="dl-bg">
      <div className="mx-auto max-w-[1200px] px-6 pb-28 pt-40 md-:pt-32">
        <header className="dl-head">
          <p className="overline" data-reveal>
            Release {rel.tag}
            {monthYear ? ` · ${monthYear}` : ""}
          </p>
          <h1 className="dl-title display">
            <SplitWords text="Take the player home." />
          </h1>
          <p className="dl-sub" data-reveal>
            Seven packages, one player. Every card below serves the newest
            release, resolved live — no mirrors to hunt down, no login to make.
          </p>
        </header>

        <SmartPick version={rel.version} />

        {GROUPS.map((g) => (
          <section key={g.id} className="dl-group" aria-label={g.label}>
            <p className="dl-grouplabel">
              <span>{g.label}</span>
              <i />
            </p>
            <div className="dl-grid">
              {CARDS.filter((c) => c.group === g.id).map((c) => {
                const asset = rel.assets[c.key];
                return (
                  <a key={c.key} className="dl-card" href={c.route} data-reveal>
                    <span className="dl-tile mono" aria-hidden="true">
                      {{ rpm: "RPM", deb: "DEB", appimage: "IMG", winSetup: "EXE", winZip: "ZIP", macosDmg: "DMG", macosZip: "ZIP" }[c.key]}
                    </span>
                    <span className="dl-plat">{c.plat}</span>
                    <span className="dl-file mono" id={c.id}>
                      {asset.file}
                    </span>
                    <span className="dl-foot">
                      <span className="dl-route mono">{c.route}</span>
                      <span className="dl-size numeral">{asset.size ? humanSize(asset.size) : "—"}</span>
                    </span>
                    <span className="dl-line mono">{c.line}</span>
                    <span className="dl-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        ))}

        <p className="dl-note" data-reveal>
          First run: point Aubade at your music folder once — it indexes and
          remembers. Update checks are anonymous, and telemetry only exists as
          an opt-in card that you switch on yourself, inside the app.
        </p>

        <a className="btn-ghost mt-10" href="/">
          ← Back to the player
        </a>
      </div>
    </main>
  );
}
