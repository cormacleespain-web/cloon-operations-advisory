import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Approach } from "@/components/sections/approach";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Services />
        <Approach />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
