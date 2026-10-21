export const metadata = {
  title: "Download — Aubade",
};

export default function Download() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "120px 24px 80px",
        textAlign: "center",
      }}
    >
      <div>
        <p className="overline" style={{ justifyContent: "center" }}>
          Seven formats, one dawn
        </p>
        <h1
          className="sect-title"
          style={{ margin: "26px 0 18px", fontSize: "clamp(34px,6vw,64px)" }}
        >
          The full download page is firming up.
        </h1>
        <p style={{ color: "var(--sub)", maxWidth: 460, margin: "0 auto 30px" }}>
          Every installer, keyed to your system, appears here the moment the
          release goes public.
        </p>
        <a className="btn-ghost" href="/">
          ← Back to the player
        </a>
      </div>
    </main>
  );
}
