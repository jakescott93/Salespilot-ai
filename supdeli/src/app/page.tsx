import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Menu } from "@/components/Menu";
import { Order } from "@/components/Order";
import { Find } from "@/components/Find";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Story />
      <Menu />
      <Order />
      <Find />
      <Footer />
    </main>
  );
}
