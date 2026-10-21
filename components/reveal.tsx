"use client";

import { useEffect } from "react";

/** Global scroll-reveal observer — [data-reveal] gets .in when 12% visible. */
export default function RevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (document.documentElement.classList.contains("rm")) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return children;
}
