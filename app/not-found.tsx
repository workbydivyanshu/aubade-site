export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <div>
        <p className="overline" style={{ justifyContent: "center" }}>
          Off the tracklist
        </p>
        <h1
          className="sect-title"
          style={{ margin: "24px 0 16px", fontSize: "clamp(38px,6vw,72px)" }}
        >
          This cue doesn&apos;t exist.
        </h1>
        <a className="btn-ghost" href="/">
          ← Back to the player
        </a>
      </div>
    </main>
  );
}
