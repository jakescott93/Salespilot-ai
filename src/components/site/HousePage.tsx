import { Nav } from "@/components/site/Nav";
import { Intro } from "@/components/site/Intro";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { Difference } from "@/components/sections/Difference";
import { Mandates } from "@/components/sections/Mandates";
import { Process } from "@/components/sections/Process";
import { PrivateClients } from "@/components/sections/PrivateClients";
import { Trust } from "@/components/sections/Trust";
import { Invitation } from "@/components/sections/Invitation";
import type { HouseContent } from "@/content/types";

export function HousePage({ content }: { content: HouseContent }) {
  return (
    <>
      <Intro house={content.house} descriptor={content.descriptor} />
      <Nav content={content} />
      <main>
        <Hero content={content} />
        <Difference content={content} />
        <Mandates content={content} />
        <Process content={content} />
        <PrivateClients content={content} />
        <Trust content={content} />
        <Invitation content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
