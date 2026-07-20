import type { Metadata } from "next";

import { SiteRenderer } from "@/components/site-renderer";
import { getPublishedContent } from "@/lib/content/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { myStory } = await getPublishedContent();
  return {
    title: myStory.seo.metaTitle,
    description: myStory.seo.metaDescription,
    openGraph: {
      title: myStory.seo.metaTitle,
      description: myStory.seo.metaDescription,
      url: "/my-story",
    },
  };
}

export default async function MyStoryRoute() {
  const content = await getPublishedContent();
  return <SiteRenderer content={content} page="myStory" />;
}
