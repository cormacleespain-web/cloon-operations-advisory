import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Approach } from "@/components/sections/approach";
import { About } from "@/components/sections/about";
import { Positioning } from "@/components/sections/positioning";
import { Contact } from "@/components/sections/contact";
import { BusinessChallengesPage } from "@/components/pages/business-challenges";
import { HowIWorkPage } from "@/components/pages/how-i-work";
import { MyStoryPage } from "@/components/pages/my-story";
import type { PublishedContent } from "@/lib/content/queries";

export type SitePage = "home" | "businessChallenges" | "howIWork" | "myStory";

/**
 * Renders a full page from content. Shared by the public routes (published
 * content) and the admin draft preview (draft content) so the two are
 * guaranteed to stay in visual sync.
 */
export function SiteRenderer({
  content,
  page = "home",
}: {
  content: PublishedContent;
  page?: SitePage;
}) {
  return (
    <>
      <SiteHeader content={content.navigation} />
      <main id="main" className="flex-1">
        {page === "home" && (
          <>
            <Hero content={content.hero} />
            <Services content={content.services} />
            <Approach content={content.approach} />
            <About content={content.about} />
            <Positioning content={content.positioning} />
            <Contact content={content.contact} />
          </>
        )}
        {page === "businessChallenges" && (
          <BusinessChallengesPage content={content.businessChallenges} />
        )}
        {page === "howIWork" && <HowIWorkPage content={content.howIWork} />}
        {page === "myStory" && <MyStoryPage content={content.myStory} />}
      </main>
      <SiteFooter content={content.footer} />
    </>
  );
}
