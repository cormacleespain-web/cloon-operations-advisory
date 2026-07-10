export function SectionEditorLayout({
  title,
  description,
  children,
  bar,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  bar: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-8 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-medium tracking-[-0.01em] text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
          <div className="mt-8 space-y-8">{children}</div>
        </div>
      </div>
      {bar}
    </div>
  );
}
