import { Wordmark } from "@/components/brand/wordmark";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="flex min-h-svh items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Wordmark variant="compact" />
        </div>
        <div className="bezel-shell shadow-premium">
          <div className="bezel-core p-8 sm:p-10">
            <h1 className="font-display text-2xl font-medium tracking-[-0.01em] text-foreground">
              {title}
            </h1>
            {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
