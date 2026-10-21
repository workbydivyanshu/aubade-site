import { chromium } from "playwright-core";
const BASE = process.env.VERIFY_BASE || "http://localhost:3111";
const browser = await chromium.launch({ headless: true });
for (const path of ["/download", "/privacy", "/terms"]) {
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  await p.waitForTimeout(3200);
  const t = await p.evaluate(() => {
    const w = document.querySelector(".words .w");
    return {
      h1text: document.querySelector("h1")?.innerText?.trim() || "(none)",
      wordTransform: w ? getComputedStyle(w).transform : "(no .words)",
      unlocked: !document.documentElement.classList.contains("loading"),
      titleVisible: document.querySelector("h1") ? getComputedStyle(document.querySelector("h1")).opacity : null,
    };
  });
  console.log(path, "→", JSON.stringify(t));
  await p.screenshot({ path: `captures/subpage-top${path === "/download" ? "" : path}.png` });
  await ctx.close();
}
await browser.close();
