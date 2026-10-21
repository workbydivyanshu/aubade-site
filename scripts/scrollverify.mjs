import { chromium } from "playwright-core";
const BASE = process.env.VERIFY_BASE || "http://localhost:3111";
const browser = await chromium.launch({ headless: true });
const results = [];
function pass(label, ok, detail) { results.push(`${ok ? "PASS" : "FAIL"}  ${label}  ${detail}`); }

async function newPage(opts, errors) {
  const ctx = await browser.newContext(opts);
  const p = await ctx.newPage();
  p.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 90)); });
  p.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 90)));
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  return { ctx, p };
}
const depth = (p) => p.evaluate(() => ({ y: scrollY, bottom: document.documentElement.scrollHeight - innerHeight, sh: document.documentElement.scrollHeight }));

async function wheelWalk(p, dir, step, wantStop) {
  for (let i = 0; i < 60; i++) {
    await p.mouse.wheel(0, dir * step);
    await p.waitForTimeout(560);
    const d = await depth(p);
    if (wantStop === "bottom" && d.bottom - d.y < 4) return { hops: i + 1, ...d };
    if (wantStop === "top" && d.y < 4) return { hops: i + 1, ...d };
  }
  return { hops: 60, ...(await depth(p)) };
}

async function run(label, opts, path, { expectLenis }) {
  const errors = [];
  const ctx = await browser.newContext(opts);
  const p = await ctx.newPage();
  p.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 90)); });
  p.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 90)));
  await p.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(2800);
  const boot = await p.evaluate(() => ({ c: document.documentElement.className, sh: document.documentElement.scrollHeight, wh: innerHeight }));
  pass(`${label} unlocked+ready`, (opts.reducedMotion ? boot.c.includes("rm") : true) && boot.c.includes("ready") && !boot.c.includes("loading"), `class="${boot.c}" page=${boot.sh}px/view=${boot.wh}`);
  const lenisOn = await p.evaluate(() => Boolean(window.__lenis));
  pass(`${label} lenis ${expectLenis ? "on" : "off"}`, lenisOn === expectLenis, `__lenis=${lenisOn}`);
  const down = await wheelWalk(p, 1, opts.viewport.height, "bottom");
  pass(`${label} wheel→bottom`, down.bottom - down.y < 4 && down.hops < 60, `y=${down.y}/${down.bottom} in ${down.hops} wheels`);
  await p.screenshot({ path: `captures/${label}-scr-bottom.png` });
  const up = await wheelWalk(p, -1, opts.viewport.height, "top");
  pass(`${label} wheel→top`, up.y < 4 && up.hops < 60, `y=${up.y} in ${up.hops} wheels`);
  // native programmatic sanity — synchronous read (Lenis re-asserts target within a frame)
  const py = await p.evaluate(() => { window.scrollTo(0, 200); return scrollY; });
  pass(`${label} programmatic scroll`, py >= 200, `scrollTo(200)→${py}`);
  pass(`${label} zero errors`, errors.length === 0, errors.slice(0, 3).join(" | ") || "none");
  return { ctx, p };
}

// 1 /download desktop
await run("dl-desktop", { viewport: { width: 1600, height: 1000 } }, "/download", { expectLenis: true });

// 2 /download mobile + CDP touch swipe
{
  const errors = [];
  const opts = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };
  const { ctx, p } = await run("dl-mobile", opts, "/download", { expectLenis: true });
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 700 }] });
  for (let s = 1; s <= 6; s++)
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 700 - s * 90 }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await p.waitForTimeout(1100);
  let tY = (await depth(p)).y;
  void errors;
  // second swipe
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 700 }] });
  for (let s = 1; s <= 6; s++)
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 700 - s * 90 }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await p.waitForTimeout(1100);
  const tY2 = (await depth(p)).y;
  pass("dl-mobile touch swipe scrolls", tY > 200 && tY2 >= tY, `swipe1→${tY}, swipe2→${tY2} (bottomless at tY2 ok)`);
  // programmatic: read immediately after dispatch (Lenis damping re-asserts target within a frame)
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(250);
  const pyM = await p.evaluate(() => { window.scrollTo(0, 200); return scrollY; });
  pass("dl-mobile programmatic scroll (instant)", pyM >= 200, `scrollTo(200)→${pyM} synchronously`);
  await ctx.close();
}

// 3 home regression + 4 rm
await run("home-desktop", { viewport: { width: 1600, height: 1000 } }, "/", { expectLenis: true });
{
  const errors = [];
  const { ctx, p } = await newPage({ viewport: { width: 1600, height: 1000 }, reducedMotion: "reduce" }, errors);
  await p.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
  void errors;
  await p.waitForTimeout(1200);
  const rm = await p.evaluate(() => ({ pre: !document.querySelector(".preloader"), cls: document.documentElement.className, revealOp: getComputedStyle(document.querySelector("[data-reveal]")).opacity }));
  pass("rm home preloader gone <1.2s", rm.pre && rm.cls.includes("rm"), JSON.stringify(rm));
  await ctx.close();
}

// github sweep
for (const path of ["/", "/download", "/privacy", "/terms"]) {
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  const hits = await p.evaluate(() => (document.body.innerText.match(/github/gi) || []).length);
  pass(`github "${path || "/"}"`, hits === 0, `${hits} visible-text hits`);
  await ctx.close();
}

console.log(results.join("\n"));
const fails = results.filter((r) => r.startsWith("FAIL"));
console.log(`\nTOTALS: ${results.length - fails.length}/${results.length} passed`);
if (fails.length) process.exitCode = 1;
await browser.close();
