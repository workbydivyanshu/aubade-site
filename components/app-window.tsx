import React from "react";
import {
  IconSearch,
  IconChevron,
  IconNote,
  IconAlbums,
  IconMic,
  IconVault,
  IconPlaylist,
  IconHeart,
  IconGear,
  IconShuffle,
  IconPrev,
  IconNext,
  IconPlay,
  IconRepeat,
  IconExpand,
  IconVolume,
  IconDots,
  IconMinimize,
  IconMaximize,
  IconClose,
} from "./icons";

/**
 * Synthetic Aubade app replica — every row, artist and artwork here is
 * invented. No screenshots of a real library are ever published.
 * Geometry mirrors the shipped app: 44px titlebar, 54px rows, r16 dock.
 */
const TRACKS: {
  n: string;
  t: string;
  a: string;
  al: string;
  d: string;
  art: string;
  playing?: boolean;
}[] = [
  { n: "01", t: "Northern Lights Loop", a: "Kaleidoscope Static", al: "Field Notes, Vol. II", d: "3:12", art: "linear-gradient(140deg,#3c3632,#1b1817 70%)" },
  { n: "02", t: "Cassette Ghost", a: "The Bracken Sequence", al: "Analog Ruins", d: "4:05", art: "conic-gradient(from 210deg,#281d1d,#3a2626 32%,#1e1c1c 68%,#281d1d)" },
  { n: "03", t: "Blue Hour", a: "Meridian Park", al: "Blue Hour", d: "2:58", art: "radial-gradient(circle at 32% 30%,#4e2323,#191417 78%)", playing: true },
  { n: "04", t: "Static Bloom", a: "Meridian Park", al: "Blue Hour", d: "3:47", art: "linear-gradient(120deg,#452a2a,#201a1a 62%)" },
  { n: "05", t: "Paper Islands", a: "Low Tide Choir", al: "Shorelines", d: "5:02", art: "conic-gradient(from 90deg,#332e28,#1c1a18 55%,#332e28)" },
  { n: "06", t: "Ferrite Memory", a: "Church of the Analog", al: "Signal Course", d: "4:31", art: "linear-gradient(150deg,#3d1d1d,#1a1a1a 70%)" },
  { n: "07", t: "Wildfire Season", a: "Ash & Signal", al: "Ember Maps", d: "3:26", art: "linear-gradient(135deg,#33241c,#131311)" },
];

const RAIL: { label: string; icon: React.ReactNode; active?: boolean; gap?: boolean }[] = [
  { label: "Songs", icon: <IconNote />, active: true },
  { label: "Albums", icon: <IconAlbums /> },
  { label: "Artists", icon: <IconMic /> },
  { label: "Search", icon: <IconSearch /> },
  { gap: true, label: "", icon: null },
  { label: "Vault", icon: <IconVault /> },
  { label: "Playlists", icon: <IconPlaylist /> },
  { label: "Liked", icon: <IconHeart /> },
];

export default function AppWindow() {
  return (
    <div className="aw" role="img" aria-label="Stylized replica of the Aubade player: a dark window with a slim rail, a song table in a synthetic library, and the floating transport island.">
      {/* titlebar */}
      <div className="aw-tb">
        <span className="tb-btn"><IconChevron flip s={13} /></span>
        <span className="tb-btn"><IconChevron s={13} /></span>
        <div className="aw-search">
          <IconSearch s={12} />
          <span>Search tracks, albums, artists, commands…</span>
          <kbd>Ctrl K</kbd>
        </div>
        <span className="aw-avatar">A</span>
        <span className="tb-btn"><IconDots s={13} /></span>
        <div className="aw-winbtns">
          <span><IconMinimize /></span>
          <span><IconMaximize /></span>
          <span><IconClose /></span>
        </div>
      </div>

      <div className="aw-body">
        {/* rail */}
        <div className="aw-rail">
          {RAIL.map((r, i) =>
            r.gap ? (
              <div key={i} className="aw-rail-gap" />
            ) : (
              <span key={i} className={`aw-rail-item ${r.active ? "active" : ""}`}>
                {r.icon}
                {r.label}
              </span>
            )
          )}
          <div className="aw-rail-spring" />
          <span className="aw-rail-item">
            <IconGear />
            Prefs
          </span>
        </div>

        {/* content */}
        <div className="aw-content">
          <div className="aw-title">
            Songs <span>· your library</span>
          </div>
          <div className="aw-toolbar">
            <span className="aw-btn aw-btn-play">
              <IconPlay s={13} /> Play All
            </span>
            <span className="aw-btn aw-btn-shuffle">
              <IconShuffle s={12} /> Shuffle
            </span>
            <div className="aw-filter">
              <IconSearch s={11} />
              <span>Filter title, artist, album</span>
            </div>
          </div>

          <div className="aw-thead">
            <span>#</span>
            <span>Title</span>
            <span>Artist</span>
            <span>Album</span>
            <span className="aw-dur" style={{ textAlign: "left" }}>MIN</span>
          </div>

          {TRACKS.map((tr) => (
            <div key={tr.n} className={`aw-row ${tr.playing ? "playing" : ""}`}>
              <span className="idx">
                <span className="n">{tr.n}</span>
                {tr.playing && (
                  <span className="eq">
                    <i /><i /><i /><i />
                  </span>
                )}
              </span>
              <span className="aw-t" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="aw-art" style={{ background: tr.art }}>
                  <IconNote s={13} />
                </span>
                <span style={{ overflow: "hidden" }}>{tr.t}</span>
              </span>
              <span className="aw-meta">{tr.a}</span>
              <span className="aw-meta">{tr.al}</span>
              <span className="aw-dur">{tr.d}</span>
            </div>
          ))}
        </div>

        {/* island dock */}
        <div className="aw-dock">
          <span className="aw-dock-art"><IconNote s={18} /></span>
          <div className="aw-dock-id">
            <b>Blue Hour</b>
            <span>Meridian Park</span>
          </div>
          <span className="aw-tbtn"><IconHeart s={15} /></span>
          <div className="aw-transport">
            <span className="aw-tbtn"><IconShuffle s={13} /></span>
            <span className="aw-tbtn"><IconPrev s={14} /></span>
            <span className="aw-playbtn"><IconPlay s={19} /></span>
            <span className="aw-tbtn"><IconNext s={14} /></span>
            <span className="aw-tbtn"><IconRepeat s={13} /></span>
          </div>
          <div className="aw-right">
            <span className="aw-chip">Opus 44.1</span>
            <span className="eq" style={{ height: 12 }}>
              <i /><i /><i /><i />
            </span>
            <span className="aw-tbtn"><IconVolume s={14} /></span>
            <div className="aw-vol"><i /><s /></div>
            <span className="aw-tbtn"><IconExpand s={13} /></span>
          </div>
          <div className="aw-progress"><i /></div>
        </div>
      </div>
    </div>
  );
}
