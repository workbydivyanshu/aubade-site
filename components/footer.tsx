import Piano from "./piano";

export function Footer() {
  return (
    <footer className="footer">
      <Piano />
      <div className="footer-mark" aria-hidden="true">
        AUBADE
      </div>
      <div className="footer-bar">
        <span>RISING AT © 2026 — BUILT AT DAYBREAK</span>
        <nav className="footer-nav">
          <a href="/download">Downloads</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
