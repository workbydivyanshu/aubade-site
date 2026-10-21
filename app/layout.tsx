import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aubade — Every track you own. One keystroke away.",
  description:
    "Aubade is a local-first music player for the desktop. Your library is a folder, your lyrics keep time, and your dock is an island. Built on Fedora, shipped for every OS.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Aubade — a local-first music player",
    description:
      "Your library is a folder. Your lyrics keep time. No account, no cloud, no noise — just the collection, on time at dawn.",
    type: "website",
  },
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
              "document.documentElement.classList.add('loading');" +
              "if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm');",
          }}
        />
        {children}
      </body>
    </html>
  );
}
