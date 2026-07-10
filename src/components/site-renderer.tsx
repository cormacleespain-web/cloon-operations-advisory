import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Approach } from "@/components/sections/approach";
import { About } from "@/components/sections/about";
import { Positioning } from "@/components/sections/positioning";
import { Contact } from "@/components/sections/contact";
import type { PublishedContent } from "@/lib/content/queries";

/**
 * Renders the full homepage from content. Shared by the public homepage
 * (published content) and the admin draft preview (draft content) so the
 * two are guaranteed to stay in visual sync.
 */
export function SiteRenderer({ content }: { content: PublishedContent }) {
  return (
    <>
      <SiteHeader content={content.navigation} />
      <main id="main" className="flex-1">
        <Hero content={content.hero} />
        <Services content={content.services} />
        <Approach content={content.approach} />
        <About content={content.about} />
        <Positioning content={content.positioning} />
        <Contact content={content.contact} />
      </main>
      <SiteFooter content={content.footer} />
    </>
  );
}
