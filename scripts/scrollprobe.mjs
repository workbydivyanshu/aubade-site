import { chromium } from "playwright-core";
const BASE = "https://aubadehq.vercel.app";
const browser = await chromium.launch({ headless: true });

async function probe(label, opts, path) {
  const ctx = await browser.newContext(opts);
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 120)); });
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message.slice(0, 120)));
  await p.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(2200);
  const r = await p.evaluate(() => {
    const h = document.documentElement, b = document.body;
    const cs = (n) => { const s = getComputedStyle(n); return { ov: s.overflow, oy: s.overflowY, ox: s.overflowX, h: s.height, maxH: s.maxHeight, pos: s.position }; };
    const lenis = window.__lenis;
    return {
      htmlClass: h.className,
      bodyClass: b.className,
      html: cs(h), body: cs(b),
      docScroll: { sh: h.scrollHeight, ch: h.clientHeight, st: h.scrollTop },
      bodyScroll: { sh: b.scrollHeight, ch: b.clientHeight },
      lenis: lenis ? { present: true, isStopped: !!lenis.isStopped, limit: lenis.limit, smoothWheel: lenis?.options?.smoothWheel ?? lenis?.options?. luxuryMode ?? "?" } : { present: false },
      hitCenter: (() => { void 0; return null; })(),
      winCount: innerHeight,
    };
  });
  r.hitCenter = await p.evaluate(() => {
    const el = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
    const chain = [];
    let n = el;
    while (n && n !== document.documentElement) { chain.push(n.tagName + (n.className ? "." + String(n.className).split(" ")[0] : "")); n = n.parentElement; }
    const s = el ? getComputedStyle(el) : null;
    return { el: chain.join(" < "), pointerEvents: s?.pointerEvents, position: s?.position };
  });
  // native programmatic scroll
  await p.evaluate(() => window.scrollTo(0, 600));
  await p.waitForTimeout(300);
  r.programmatic = await p.evaluate(() => scrollY);
  // reset + real wheel
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(250);
  await p.mouse.wheel(0, 1200);
  await p.waitForTimeout(1400);
  r.wheel = await p.evaluate(() => scrollY);
  await p.mouse.wheel(0, -1200);
  await p.waitForTimeout(1400);
  r.wheelBack = await p.evaluate(() => scrollY);
  r.errors = errs.slice(0, 5);
  console.log("\n=== " + label + " → " + path + " ===");
  console.log(JSON.stringify(r, (k, v) => (k === "winCount" ? undefined : v), 1));
  await ctx.close();
}

await probe("DESKTOP", { viewport: { width: 1600, height: 1000 } }, "/");
await probe("DESKTOP", { viewport: { width: 1600, height: 1000 } }, "/download");
await probe("RM-DESKTOP", { viewport: { width: 1600, height: 1000 }, reducedMotion: "reduce" }, "/download");
await probe("MOBILE", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, "/download");
await browser.close();
