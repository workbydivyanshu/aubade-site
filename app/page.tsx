import Preloader from "@/components/preloader";
import SmoothScroll from "@/components/smooth";
import RevealProvider from "@/components/reveal";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import Tracklist from "@/components/tracklist";
import { GetSection } from "@/components/get";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <RevealProvider>
          <Nav />
          <main>
            <Hero />
            <Manifesto />
            <Tracklist />
            <GetSection />
          </main>
          <Footer />
        </RevealProvider>
      </SmoothScroll>
    </>
  );
}
