import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';

interface HeroLink {
  id: string;
  label: string;
  url: string;
}

export default function Hero({
  tagline,
  description,
  availability,
  cvPath,
  links,
}: {
  tagline: string;
  description: string;
  availability: string;
  cvPath: string;
  links: HeroLink[];
}) {
  return (
    <div>
      <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
        <TextEffect per="word" preset="blur" as="span">
          {tagline}
        </TextEffect>
      </h1>

      <AnimatedGroup preset="slide">
        <p className="mt-6 max-w-md text-foreground/70">{description}</p>
        <p className="mt-5 flex items-center gap-2 text-sm text-foreground/80">
          <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {availability}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={cvPath}
            className="rounded-control bg-accent px-5 py-3 text-sm font-medium text-white"
          >
            Download CV
          </a>
          <a
            href="/contact"
            className="rounded-control border border-foreground/20 px-5 py-3 text-sm font-medium text-foreground"
          >
            Contact
          </a>
        </div>
        <div className="mt-6 flex gap-5 text-sm text-foreground/60">
          {links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>
      </AnimatedGroup>
    </div>
  );
}
