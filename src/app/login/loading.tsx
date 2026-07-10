import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="bezel-shell shadow-premium">
          <div className="bezel-core space-y-4 p-8 sm:p-10">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
