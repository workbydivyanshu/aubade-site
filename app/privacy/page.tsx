import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy · Aubade",
  description:
    "Your library is a folder, not a service. What Aubade collects (almost nothing), what this website collects (nothing), and how opt-in reporting works.",
};

export default function Privacy() {
  return (
    <LegalPage
      overline="The honest page"
      title="Privacy, without the fine-print fog."
      updated="October 2026"
      intro="Aubade is a local-first music player. That phrase carries obligations: this page spells out exactly what leaves your machine, what never does, and why."
      sections={[
        {
          h: "Your library never leaves your computer",
          p: [
            "Your folders, files, tags, lyrics and play counts all live in your music folder and in Aubade's local index. There is no account, no sign-in, no sync, and no backup that we hold. Deleting the app deletes its data with it. To put it plainly: we cannot sell or leak a library we never receive.",
          ],
        },
        {
          h: "Package downloads are counted, not profiled",
          p: [
            "Around a new release, requests for installers are handled by this website's own download routes and the public release host. The host logs standard anonymous delivery statistics, nothing more than how many times a file was fetched. No names, no email addresses, no fingerprints, no advertising identifiers.",
          ],
        },
        {
          h: "Update checks are anonymous",
          p: [
            "The app may ask whether a newer version exists. That check carries no identity, just a format version and an answer in return. You can switch it off or on from a settings card inside the app, never from a web page.",
          ],
        },
        {
          h: "Playback reports and telemetry are strictly opt-in",
          p: [
            "Aubade ships with an in-app opt-in card for anonymous playback reporting. It starts off, stays off until you switch it on inside the player, and turning it on never asks for contact details. This website has no switch for it and never triggers it.",
          ],
        },
        {
          h: "This website itself",
          p: [
            "These pages are static: no cookies, no accounts, no ad networks, no behavioral trackers. A visit sends the ordinary network facts any server sees: rough timings, and nothing that identifies you personally. We do not keep visit records beyond what the download chain needs to stay healthy.",
          ],
        },
        {
          h: "If any of this ever changes",
          p: [
            "If a future release asks for more, it will say so explicitly here and inside the app, and it will stay opt-in. This page keeps the first version of every promise that ships.",
          ],
        },
      ]}
    />
  );
}
