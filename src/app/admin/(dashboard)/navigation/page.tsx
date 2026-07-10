import type { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationEditor } from "@/components/admin/editors/navigation-editor";
import { FooterEditor } from "@/components/admin/editors/footer-editor";
import { getDraftContent } from "@/lib/content/queries";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function NavigationPage() {
  const [navigation, footer] = await Promise.all([
    getDraftContent("navigation"),
    getDraftContent("footer"),
  ]);

  return (
    <Tabs defaultValue="navigation" className="flex min-h-full flex-col">
      <div className="border-b border-border px-8 pt-8">
        <TabsList>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="navigation" className="flex-1">
        <NavigationEditor initial={navigation} />
      </TabsContent>
      <TabsContent value="footer" className="flex-1">
        <FooterEditor initial={footer} />
      </TabsContent>
    </Tabs>
  );
}
