import { Wordmark } from "@/components/brand/wordmark";

const FOOTER_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-sm">
            <Wordmark variant="compact" />
            <p className="mt-4 text-sm text-muted-foreground">
              Practical supply chain and operations advisory, rooted in the
              West of Ireland and built on hands-on experience.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Cloon Operations Advisory. All rights reserved.</p>
          <p>
            <a
              href="mailto:hello@cloon.ie"
              className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              hello@cloon.ie
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
