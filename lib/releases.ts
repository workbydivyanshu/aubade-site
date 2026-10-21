/**
 * Release resolution for /download.
 *
 * The site never publishes or names the release host in page copy — every
 * public link points at this site's own /download/<distro> routes, which
 * 302 to the byte. The host string below lives only in server code and in
 * the redirect Location header.
 */

export type AssetKey =
  | "rpm"
  | "deb"
  | "appimage"
  | "winSetup"
  | "winZip"
  | "macosDmg"
  | "macosZip";

export type Asset = { key: AssetKey; file: string; url: string; size: number };

export type Release = {
  version: string;
  tag: string;
  date: string | null;
  assets: Record<AssetKey, Asset>;
};

/** Matches the shipped packaging matrix byte-for-byte. */
function classify(file: string): AssetKey | null {
  if (file.endsWith("_x86_64.rpm")) return "rpm";
  if (file.endsWith("_amd64.deb")) return "deb";
  if (file.endsWith("_x86_64.AppImage")) return "appimage";
  if (file.endsWith("_windows-x86_64-setup.exe")) return "winSetup";
  if (file.endsWith("_windows-x86_64-portable.zip")) return "winZip";
  if (file.endsWith("_macos.dmg")) return "macosDmg";
  if (file.endsWith("_macos-arm64.zip")) return "macosZip";
  return null;
}

const SUFFIX: Record<AssetKey, string> = {
  rpm: "_x86_64.rpm",
  deb: "_amd64.deb",
  appimage: "_x86_64.AppImage",
  winSetup: "_windows-x86_64-setup.exe",
  winZip: "_windows-x86_64-portable.zip",
  macosDmg: "_macos.dmg",
  macosZip: "_macos-arm64.zip",
};

/** benign fallback while the fetch is cold or the network blinks */
function fallback(tag: string, date: string | null): Release {
  const version = tag.replace(/^v/, "").replace(/--$/, "");
  const base = "https://github.com/workbydivyanshu/aubade-music-player/releases/download";
  const assets = {} as Release["assets"];
  (Object.keys(SUFFIX) as AssetKey[]).forEach((k) => {
    const file = `aubade_${version}${SUFFIX[k]}`;
    assets[k] = { key: k, file, url: `${base}/${tag}/${file}`, size: 0 };
  });
  return { version, tag, date, assets };
}

type CacheShape = { data: Release; at: number } | null;
let cache: CacheShape = null;
const TEN_MIN = 10 * 60 * 1000;

export async function getRelease(): Promise<Release> {
  if (cache && Date.now() - cache.at < TEN_MIN) return cache.data;
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 8000);
    const res = await fetch(
      "https://api.github.com/repos/workbydivyanshu/aubade-music-player/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "aubade-site (release resolver)",
        },
        signal: ctl.signal,
        cache: "no-store",
      }
    );
    clearTimeout(t);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const json = (await res.json()) as {
      tag_name?: string;
      published_at?: string | null;
      assets?: { name: string; browser_download_url: string; size: number }[];
    };
    if (!json.tag_name || !json.assets) throw new Error("no tag");

    const version = json.tag_name.replace(/^v/, "").replace(/--$/, "");
    const assets = {} as Release["assets"];
    let any = false;
    for (const a of json.assets) {
      const k = classify(a.name);
      if (!k) continue;
      any = true;
      assets[k] = { key: k, file: a.name, url: a.browser_download_url, size: a.size };
    }
    if (!any) throw new Error("no matching assets");

    // guarantee all seven slots exist (constructed from the same tag)
    (Object.keys(SUFFIX) as AssetKey[]).forEach((k) => {
      if (!assets[k]) {
        const file = `aubade_${version}${SUFFIX[k]}`;
        assets[k] = {
          key: k,
          file,
          url: `https://github.com/workbydivyanshu/aubade-music-player/releases/download/${json.tag_name}/${file}`,
          size: 0,
        };
      }
    });

    const data: Release = {
      version,
      tag: json.tag_name,
      date: json.published_at ?? null,
      assets,
    };
    cache = { data, at: Date.now() };
    return data;
  } catch {
    const data = fallback("v1.0.1", "2026-10-20T00:00:00Z");
    if (!cache) cache = { data, at: Date.now() };
    return data;
  }
}

export const OS_ROUTES: Record<string, AssetKey> = {
  linux: "appimage",
  fedora: "rpm",
  debian: "deb",
  windows: "winSetup",
  macos: "macosDmg",
  portable: "winZip",
  "macos-arm64": "macosZip",
};

export function humanSize(bytes: number): string {
  return String(Math.round(bytes / 1024 / 1024)) + " MB";
}
