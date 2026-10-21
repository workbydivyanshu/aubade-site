import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms — Aubade",
  description:
    "The short, human terms for using Aubade: your files, your rights, your responsibility — and ours.",
};

export default function Terms() {
  return (
    <LegalPage
      overline="The working agreement"
      title="Terms, kept as short as the install."
      updated="October 2026"
      intro="These terms cover the Aubade player and this website. They are deliberately short: a player this reliant on your library has no interest in reading your files behind your back."
      sections={[
        {
          h: "What Aubade is",
          p: [
            "Aubade is a desktop music player. It reads the audio files you already own, plays them, helps organise them, and shows lyrics when they are available locally or from a lyric lookup you choose. It is provided as-is, in the versions published on the download page.",
          ],
        },
        {
          h: "Your files, your rights, your responsibility",
          p: [
            "Aubade plays whatever exists in your folders and does not license, sell or obtain music on your behalf. The law where you live applies to every file in your library: keep tracks you are allowed to keep, and the player will stay simply a player.",
          ],
        },
        {
          h: "What you may do with Aubade",
          p: [
            "Install and use it every day at no charge. Share it onward, provided you hand over the whole thing verbatim: the player, these notices and this site's promises arrive together. Bundling Aubade into other software requires your own separate arrangement.",
          ],
        },
        {
          h: "No warranty",
          p: [
            "A player that reads FLAC at 44.1 and never phones home still needs an honest safety notice: the software is offered without warranty of any kind. It may lose a queue when a drive is unplugged mid-track. Your library remains your responsibility, exactly as it was before installation.",
          ],
        },
        {
          h: "Updates and their order of consent",
          p: [
            "Aubade may check for updates anonymously; accepting an update is always a choice you make inside the app. Both this website and the player will keep aiming at the latest stable release, and neither pranks you with marketing interruptions.",
          ],
        },
        {
          h: "If terms have to move",
          p: [
            "Changes to these terms ship alongside the release they belong to, surfaced on this page. Continuing to use a version after its terms change means you agree to those terms for that version.",
          ],
        },
      ]}
    />
  );
}
