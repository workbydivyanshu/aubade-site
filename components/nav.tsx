"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a className="nav-mark" href="#top">
        <i />
        AUBADE
      </a>
      <nav className="nav-links">
        <a href="#poem">The Poem</a>
        <a href="#cues">Cue Sheet</a>
        <a href="#views">Views</a>
        <a href="/download">Formats</a>
      </nav>
      <a className="nav-cta" href="/download">
        Download
      </a>
    </header>
  );
}
