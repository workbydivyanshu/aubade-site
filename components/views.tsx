import { SplitWords } from "./split";
import {
  IconNote,
  IconHeart,
  IconSearch,
  IconNext,
  IconPrev,
  IconPlay,
  IconShuffle,
  IconRepeat,
  IconVolume,
} from "./icons";

/**
 * Synthetic views of the player — every title, artist and artwork is
 * invented. No real library data appears anywhere on this site.
 */

function MiniRow({
  n,
  t,
  a,
  art,
  dur,
}: {
  n: string;
  t: string;
  a: string;
  art: string;
  dur: string;
}) {
  return (
    <div className="gv-row">
      <span className="gv-no mono">{n}</span>
      <span className="gv-art" style={{ background: art }}>
        <IconNote s={11} />
      </span>
      <span className="gv-t">{t}</span>
      <span className="gv-a">{a}</span>
      <span className="gv-dur mono">{dur}</span>
    </div>
  );
}

const SONGS = [
  { n: "01", t: "Northern Lights Loop", a: "Kaleidoscope Static", art: "linear-gradient(140deg,#3c3632,#1b1817 70%)", dur: "3:12" },
  { n: "02", t: "Cassette Ghost", a: "The Bracken Sequence", art: "conic-gradient(from 210deg,#281d1d,#3a2626 32%,#1e1c1c 68%,#281d1d)", dur: "4:05" },
  { n: "03", t: "Blue Hour", a: "Meridian Park", art: "radial-gradient(circle at 32% 30%,#4e2323,#191417 78%)", dur: "2:58" },
  { n: "04", t: "Static Bloom", a: "Meridian Park", art: "linear-gradient(120deg,#452a2a,#201a1a 62%)", dur: "3:47" },
];

function V({
  label,
  title,
  line,
  children,
  d,
}: {
  label: string;
  title: string;
  line: string;
  children: React.ReactNode;
  d: string;
}) {
  return (
    <figure className="gv" data-reveal style={{ "--d": d } as React.CSSProperties}>
      <div className="gv-frame" role="img" aria-label={`${title}: stylized replica of the Aubade player, synthetic data only`}>
        <div className="gv-head">
          <span className="gv-dot" />
          <span className="gv-headlabel mono">{label}</span>
          <span className="gv-headdots mono">— ▢ ✕</span>
        </div>
        {children}
      </div>
      <figcaption>
        <h3>{title}</h3>
        <p>{line}</p>
      </figcaption>
    </figure>
  );
}

export function Views() {
  return (
    <section className="section" id="views">
      <div className="mx-auto max-w-[1380px]">
        <div className="sect-head">
          <p className="overline" data-reveal>
            Side C: portrait gallery
          </p>
          <h2 className="sect-title" style={{ maxWidth: 760 }}>
            <SplitWords text="The player, in four moods." />
          </h2>
        </div>

        <div className="gv-grid">
          {/* A — library */}
          <V
            label="VIEW · SONGS"
            title="The library page"
            line="Index numbers, runtimes, and nothing pretending to be a feed."
            d="0s"
          >
            <div className="gv-body">
              <div className="gv-libhead">
                <span className="gv-libtitle">Songs · your library</span>
                <span className="gv-chip mono">Ctrl&nbsp;K</span>
              </div>
              {SONGS.map((s) => (
                <MiniRow key={s.n} {...s} />
              ))}
              <div className="gv-row gv-pseudo" aria-hidden="true">
                <span className="gv-no mono">05</span>
                <span className="gv-art" style={{ background: "linear-gradient(150deg,#332e28,#1c1a18)" }}>
                  <IconNote s={11} />
                </span>
                <span className="gv-t">Paper Islands</span>
                <span className="gv-a">Low Tide Choir</span>
                <span className="gv-dur mono">5:02</span>
              </div>
            </div>
          </V>

          {/* B — lyrics */}
          <V
            label="VIEW · LYRICS"
            title="Lyrics, keeping time"
            line="The 30Hz karaoke clock: the singing line glows, the rest recedes."
            d="0.08s"
          >
            <div className="gv-body gv-lyr">
              <div className="gv-l l-i">
                <span className="mono">0:41</span> And the streetlamps swung
              </div>
              <div className="gv-l l-i">
                <span className="mono">0:47</span> a low impossible swing
              </div>
              <div className="gv-l l-a">
                <span className="mono">0:53</span> Blue hour, hold on to the quiet
              </div>
              <div className="gv-l l-i">
                <span className="mono">1:01</span> nothing else undergoes
              </div>
              <div className="gv-l l-i">
                <span className="mono">1:06</span> the morning, saying yes
              </div>
            </div>
          </V>

          {/* C — dock */}
          <V
            label="VIEW · DOCK"
            title="The island dock"
            line="Eighty-two pixels of transport, lyrics and queue. r16, no corners cut."
            d="0.16s"
          >
            <div className="gv-body gv-dockview">
              <div className="gv-glow" aria-hidden="true" />
              <div className="gv-island">
                <span className="gv-dockart">
                  <IconNote s={17} />
                </span>
                <div className="gv-id">
                  <b>Blue Hour</b>
                  <span>Meridian Park</span>
                </div>
                <span className="gv-tr">
                  <IconShuffle s={12} />
                </span>
                <span className="gv-tr">
                  <IconPrev s={12} />
                </span>
                <span className="gv-play">
                  <IconPlay s={16} />
                </span>
                <span className="gv-tr">
                  <IconNext s={12} />
                </span>
                <span className="gv-tr">
                  <IconRepeat s={12} />
                </span>
                <span className="gv-chip mono">Opus 44.1</span>
                <span className="eq" style={{ height: 11 }}>
                  <i /><i /><i /><i />
                </span>
                <span className="gv-tr">
                  <IconHeart s={13} />
                </span>
              </div>
              <div className="gv-progress">
                <i style={{ width: "63%" }} />
              </div>
              <span className="gv-times mono">1:58 / 3:12</span>
            </div>
          </V>

          {/* D — tags */}
          <V
            label="VIEW · TAGS"
            title="Tags without ceremony"
            line="Tidy your collection in place: counts, colors, no manual labor."
            d="0.24s"
          >
            <div className="gv-body gv-tags">
              <div className="gvtile-grid">
                {[
                  ["Field Notes", "linear-gradient(140deg,#3c3632,#1b1817)", "62"],
                  ["Analog Ruins", "conic-gradient(from 210deg,#281d1d,#3a2626 40%,#1e1c1c)", "31"],
                  ["Blue Hour", "radial-gradient(circle at 32% 30%,#542222,#191417 80%)", "14"],
                  ["Shorelines", "linear-gradient(160deg,#2c2a26,#423028)", "9"],
                ].map(([t, g, c]) => (
                  <div key={t} className="gvtile">
                    <span className="gvtile-art" style={{ background: g }}>
                      <IconNote s={14} />
                    </span>
                    <span className="gvtile-name">{t}</span>
                    <span className="gvtile-count mono">{c}</span>
                  </div>
                ))}
              </div>
              <div className="gv-tagchips">
                <span className="gv-chip">Hydrus&nbsp;<b className="mono">214</b></span>
                <span className="gv-chip">Ferrite&nbsp;<b className="mono">118</b></span>
                <span className="gv-chip">Half-Light&nbsp;<b className="mono">63</b></span>
              </div>
            </div>
          </V>
        </div>
      </div>
    </section>
  );
}
