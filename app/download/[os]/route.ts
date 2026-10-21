import { NextResponse } from "next/server";
import { getRelease, OS_ROUTES } from "@/lib/releases";

export const dynamic = "force-dynamic";

/**
 * /download/linux|fedora|debian|windows|macos|portable|macos-arm64
 * Server resolves the latest release and 302s to the matching installer.
 * Unknown keys 404. The redirect alone is the only off-site touch.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ os: string }> }
) {
  const { os } = await params;
  const key = OS_ROUTES[os];
  if (!key) return new NextResponse("unknown package", { status: 404 });

  const info = await getRelease();
  const asset = info.assets[key];
  if (!asset?.url) return new NextResponse("package unavailable", { status: 404 });

  const res = NextResponse.redirect(asset.url, 302);
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;
}
