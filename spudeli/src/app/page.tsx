import { EnterGate } from "@/components/EnterGate";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Craft } from "@/components/Craft";
import { Benefits } from "@/components/Benefits";
import { Divider, FilmTeaser } from "@/components/Divider";
import { Signatures } from "@/components/Signatures";
import { Gallery } from "@/components/Gallery";
import { Menu } from "@/components/Menu";
import { Order } from "@/components/Order";
import { Find } from "@/components/Find";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <EnterGate />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Craft />
        <Benefits />
        <Divider />
        <Signatures />
        <Gallery />
        <FilmTeaser />
        <Menu />
        <Order />
        <Find />
        <Footer />
      </main>
    </>
  );
}
