import { Suspense } from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminGuard } from "@/components/admin/admin-guard";
import { ContentSkeleton } from "@/components/admin/content-skeleton";
import { SidebarSkeleton } from "@/components/admin/sidebar-skeleton";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-background">
      <Suspense fallback={<SidebarSkeleton />}>
        <AdminSidebar />
      </Suspense>
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<ContentSkeleton />}>
          <AdminGuard>{children}</AdminGuard>
        </Suspense>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "rounded-2xl! border! border-border! bg-card! text-foreground! shadow-premium!",
            title: "font-medium!",
            actionButton: "bg-primary! text-primary-foreground!",
          },
        }}
      />
    </div>
  );
}
