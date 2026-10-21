import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = "https://aubadehq.vercel.app";
const out = { console: [], pageerrors: [], checks: {} };

function recConsole(kind, log) {
  out.console.push(`${kind}: ${log}`);
}

const exeDir = null;

const browser = await chromium.launch({ headless: true });

async function session(opts, fn) {
  const ctx = await browser.newContext(opts);
  ctx.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") recConsole(m.type(), `${ctx.__label}: ${m.text()}`);
  });
  ctx.on("pageerror", (e) => out.pageerrors.push(`${ctx.__label}: ${e.message}`));
  const p = await ctx.newPage();
  await fn(p, ctx);
  await ctx.close();
}

// 1 — desktop home
await (async () => {
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  ctx.__label = "HOME/1600";
  ctx.on("console", (m) => { if (m.type() === "error") recConsole("error", m.text()); });
  ctx.on("pageerror", (e) => out.pageerrors.push(e.message));
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(6500);
  out.checks.readyClass = await p.evaluate(() => document.documentElement.classList.contains("ready"));
  out.checks.loadingClassGone = await p.evaluate(() => !document.documentElement.classList.contains("loading"));
  out.checks.preloaderGone = await p.evaluate(() => !document.querySelector(".preloader"));
  out.checks.lenisLive = await p.evaluate(() => Boolean((window).__lenis));
  await p.screenshot({ path: "captures/desktop-home.png" });
  // piano click
  await p.evaluate(() => document.querySelector(".piano").scrollIntoView({ block: "center" }));
  await p.waitForTimeout(900);
  try {
    await p.click(".pkey >> nth=0", { timeout: 4000 });
    await p.click(".bkey >> nth=0", { timeout: 4000 });
  } catch (e) { out.checks.pianoClick = "click issue: " + e.message.split("\n")[0]; }
  await p.waitForTimeout(500);
  // hover choreography on cue rows
  await p.evaluate(() => document.querySelector("#cues").scrollIntoView({ block: "start" }));
  await p.waitForTimeout(900);
  await p.hover(".cue-row >> nth=1");
  await p.waitForTimeout(350);
  out.checks.pianoClick ??= "played both";
  await ctx.close();
})();

// 2 — reduced motion home
await (async () => {
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, reducedMotion: "reduce" });
  ctx.__label = "HOME/reduced";
  ctx.on("pageerror", (e) => out.pageerrors.push(e.message));
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(1200);
  out.checks.rmClass = await p.evaluate(() => document.documentElement.classList.contains("rm"));
  out.checks.rmLenisOff = await p.evaluate(() => !(window).__lenis);
  out.checks.rmRevealVisible = await p.evaluate(() => {
    const el = document.querySelector("[data-reveal]");
    return el ? getComputedStyle(el).opacity === "1" : null;
  });
  out.checks.rmPreloaderGone = await p.evaluate(() => !document.querySelector(".preloader"));
  await ctx.close();
})();

// 3 — download page desktop
await (async () => {
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  ctx.__label = "DOWNLOAD/1600";
  ctx.on("pageerror", (e) => out.pageerrors.push(e.message));
  const p = await ctx.newPage();
  await p.goto(BASE + "/download", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(2500);
  out.checks.smartPickText = (await p.textContent(".pick-title"))?.replace(/\s+/g, " ").trim();
  out.checks.dlCards = await p.locator(".dl-card").count();
  out.checks.dlFiles = await p.evaluate(() =>
    Array.from(document.querySelectorAll(".dl-file")).map((n) => n.textContent.trim())
  );
  await p.screenshot({ path: "captures/desktop-download.png", fullPage: true });
  await ctx.close();
})();

// 4 — mobile home + download
await (async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  ctx.__label = "MOBILE";
  ctx.on("pageerror", (e) => out.pageerrors.push(e.message));
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(5500);
  await p.screenshot({ path: "captures/mobile-home.png", fullPage: false });
  out.checks.mobileNoHScroll = await p.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1
  );
  await p.goto(BASE + "/download", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(2000);
  await p.screenshot({ path: "captures/mobile-download.png", fullPage: true });
  out.checks.mobileDlNoHScroll = await p.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1
  );
  await ctx.close();
})();

await browser.close();
fs.writeFileSync("audit.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.checks, null, 2));
console.log("pageerrors:", out.pageerrors.length, "| console errors:", out.console.filter((c) => c.startsWith("error")).length);
