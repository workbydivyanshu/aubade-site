import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = "https://aubadehq.vercel.app";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
const p = await ctx.newPage();
const out = {};
for (const path of ["/", "/download"]) {
  await p.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(4500);
  const vis = await p.evaluate(() =>
    Array.from(new Set(document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean)))
  );
  const blob = vis.join(" \n ");
  const rows = await p.evaluate(() =>
    Array.from(document.querySelectorAll(".aw tbody tr, .aw-row")).slice(0, 12).map(r =>
      Array.from(r.querySelectorAll("b, span, td")).map(n => n.textContent.trim()).filter(Boolean).join(" | "))
  );
  out[path] = { visibleStrings: vis, appWindowRows: rows, flags: {
    email: (blob.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || []),
    handle: (blob.match(/@[a-z0-9_]+/gi) || []),
    github: (blob.match(/github/gi) || []),
    personallyIdentifying: (blob.match(/divyanshu|workbydi|@work/gi) || []),
  }};
}
await browser.close();
fs.writeFileSync("audit-perscan.json", JSON.stringify(out, null, 2));
console.log("FLAGS:", JSON.stringify({ "/": out["/"].flags, "/download": out["/download"].flags }));
console.log("---APP WINDOW ROWS (/):"); for (const r of out["/"].appWindowRows) console.log("  ", r);
console.log("---VISIBLE STRING COUNT /:", out["/"].visibleStrings.length, "| /download:", out["/download"].visibleStrings.length);
