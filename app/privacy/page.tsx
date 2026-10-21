import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy — Aubade",
  description:
    "Your library is a folder, not a service. What Aubade collects (almost nothing), what this website collects (nothing), and how opt-in intelligence works.",
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
          h: "Your catalogue never goes anywhere",
          p: [
            "Your folders, your files, your tags, your lyrics, your play counts — all of it lives in your music folder and in Aubade's local index. There is no account to create, no sign-in, no sync, no backup that we hold. Deleting the app deletes its data with it. The terms in plain wording: we cannot sell or leak a catalogue we never receive.",
          ],
        },
        {
          h: "Package downloads are counted, not profiled",
          p: [
            "Close to a new release, requests for installers are handled by this website's own download routes and the public release host. The host logs standard, anonymous delivery statistics — how many times a file was fetched. No names, no email addresses, no fingerprints, no advertising identifiers.",
          ],
        },
        {
          h: "Update checks are anonymous",
          p: [
            "The app may ask whether a newer version exists. That check carries no identity: just the format version and an update promise in return. Disabling it, or accepting it, comes from a settings card inside the app — not a web page.",
          ],
        },
        {
          h: "Intelligence (-- listen-counts, telemetry) is strictly opt-in",
          p: [
            "Aubade ships with an in-app opt-in card for anonymous playback reporting. It starts switched off, stays off until you flip it inside the player, and turning it on never asks for contact details. This website has no switch for it and never triggers it.",
          ],
        },
        {
          h: "This website itself",
          p: [
            "These pages are static: no cookies, no accounts, no ad networks, no behavioural trackers. Your visit sends the usual network facts every web gate sees — rough timings and nothing that identifies you personally. We do not record visits beyond keeping the download chain healthy.",
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
