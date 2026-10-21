import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/smooth";
import RevealProvider from "@/components/reveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://aubadehq.vercel.app"),
  title: "Aubade — Every track you own. One keystroke away.",
  description:
    "Aubade is a local-first music player for the desktop. Your library is a folder, your lyrics keep time, and your dock is an island. Built on Fedora, shipped for every OS.",
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "https://aubadehq.vercel.app" },
  openGraph: {
    title: "Aubade — a local-first music player",
    description:
      "Your library is a folder. Your lyrics keep time. No account, no cloud, no noise — just the collection, on time at dawn.",
    type: "website",
    url: "https://aubadehq.vercel.app",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aubade — local-first music player" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              // scroll-protect ONLY the home route: the preloader owns
              // the `loading` lock there. Every other route boots unlocked.
              "if(location.pathname==='/'){" +
              "document.documentElement.classList.add('loading');" +
              "}else{" +
              "document.documentElement.classList.add('ready');" +
              "}" +
              "if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm');",
          }}
        />
        <SmoothScroll>
          <RevealProvider>{children}</RevealProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
