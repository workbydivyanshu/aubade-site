"use client";

import { useEffect, useState } from "react";
import { IconNote } from "./icons";

type Pick = {
  os: string;
  route: string;
  file: string;
  note: string;
};

function detect(): Pick | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/Macintosh|Mac OS X/i.test(ua)) {
    return {
      os: "macOS",
      route: "/download/macos",
      file: (document.getElementById("dl-dmg")?.textContent ?? "").trim() || "the .dmg",
      note: "Apple Silicon machine? Grab the arm64 build in the grid below.",
    };
  }
  if (/Windows/i.test(ua)) {
    return {
      os: "Windows",
      route: "/download/windows",
      file: (document.getElementById("dl-setup")?.textContent ?? "").trim() || "the setup .exe",
      note: "Prefer zero install? The portable .zip is right below.",
    };
  }
  if (/Linux|X11/i.test(ua)) {
    return {
      os: "Linux",
      route: "/download/linux",
      file: "the AppImage",
      note: "Fedora? Take the .rpm. Debian or Ubuntu? The .deb.",
    };
  }
  return null;
}

export default function SmartPick({ version }: { version: string }) {
  const [pick, setPick] = useState<Pick | null>(null);
  useEffect(() => setPick(detect()), []);

  return (
    <div className="pick" data-reveal>
      <div className="pick-copy">
        <p className="overline">Smart pick</p>
        <h2 className="pick-title">
          Download for{" "}
          <b>{pick ? pick.os : "your desktop"}</b>
        </h2>
        <p className="pick-note">
          {pick ? (
            pick.note
          ) : (
            "Any of the seven packages below runs the same player. Pick your platform."
          )}
        </p>
      </div>
      <a className="btn-primary pick-btn" href={pick?.route ?? "/download/linux"}>
        <IconNote s={15} />
        {pick ? "Direct download" : "Most universal build"}
        <span className="pick-ver mono">v{version}</span>
      </a>
    </div>
  );
}
