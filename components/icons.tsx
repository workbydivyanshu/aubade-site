export const IconSearch = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" />
    <path d="m20 20-3.6-3.6" stroke="currentColor" />
  </svg>
);

export const IconChevron = ({ s = 16, flip }: { s?: number; flip?: boolean }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const IconNote = ({ s = 17 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19a2.5 2.5 0 1 1-2.5-2.5H9V4l10-2v12" stroke="currentColor" />
    <path d="M9 4 19 2v12" stroke="currentColor" />
    <circle cx="6.5" cy="19" r="2.5" stroke="currentColor" />
    <circle cx="16.5" cy="16.5" r="2.5" stroke="currentColor" />
  </svg>
);

export const IconAlbums = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" />
    <circle cx="12" cy="12" r="3.2" stroke="currentColor" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconMic = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" />
  </svg>
);

export const IconVault = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 20V10M10 20V4M16 20v-8M22 20v-4" stroke="currentColor" />
  </svg>
);

export const IconPlaylist = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 6h11M4 11h11M4 16h7" stroke="currentColor" />
    <path d="M17 13v6M18.5 12.6l3 1.6" stroke="currentColor" />
  </svg>
);

export const IconHeart = ({ s = 17, filled }: { s?: number; filled?: boolean }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20s-8-4.8-8-10.4C4 6.2 6.4 4 9.2 4 10.8 4 12 4.9 12 4.9S13.2 4 14.8 4C17.6 4 20 6.2 20 9.6 20 15.2 12 20 12 20Z" stroke="currentColor" />
  </svg>
);

export const IconGear = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3.2" stroke="currentColor" />
    <path d="M12 2.8v3M12 18.4v2.8M4.2 7.4l2.6 1.5M17.2 15.1l2.6 1.5M4.2 16.6l2.6-1.5M17.2 8.9l2.6-1.5" stroke="currentColor" />
  </svg>
);

export const IconShuffle = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h3.5c6.5 0 6.5 12 13 12H21M3 18h3.5c2.2 0 3.5-1.6 4.4-3.4M21 6h-1.5c-3 0-4.5 2-5.4 4" stroke="currentColor" />
    <path d="m18 3 3 3-3 3M18 15l3 3-3 3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const IconPrev = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 5h2.2v14H7zM18 5v14L9.5 12z" />
  </svg>
);

export const IconNext = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14.8 5H17v14h-2.2zM6 5v14l8.5-7z" />
  </svg>
);

export const IconPlay = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13L19 12z" />
  </svg>
);

export const IconRepeat = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3l3 3-3 3M20 6H7a4 4 0 0 0-4 4v1M7 21l-3-3 3-3M4 18h13a4 4 0 0 0 4-4v-1" stroke="currentColor" />
  </svg>
);

export const IconExpand = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" />
  </svg>
);

export const IconVolume = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" />
  </svg>
);

export const IconDots = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="12" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="19" cy="12" r="1.7" />
  </svg>
);

export const IconMinimize = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M5 12h14" />
  </svg>
);

export const IconMaximize = ({ s = 11 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="5" y="5" width="14" height="14" rx="1" />
  </svg>
);

export const IconClose = ({ s = 13 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
