import Preloader from "@/components/preloader";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import Tracklist from "@/components/tracklist";
import { Views } from "@/components/views";
import { Platforms } from "@/components/platforms";
import { GetSection } from "@/components/get";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Tracklist />
        <Views />
        <Platforms />
        <GetSection />
      </main>
      <Footer />
    </>
  );
}
