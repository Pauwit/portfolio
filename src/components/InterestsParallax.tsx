import type { ReactNode } from 'react';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';

export interface InterestBeat {
  title?: string;
  subtitle?: string;
  paragraph?: string;
  column?: 'left' | 'middle' | 'right';
  images?: string[];
}

export interface Interest {
  name: string;
  beats: InterestBeat[];
}

function renderBeat(beat: InterestBeat): ReactNode {
  if (beat.title) {
    return <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">{beat.title}</h2>;
  }
  if (beat.subtitle) {
    return <h3 className="font-display text-xl font-semibold text-accent">{beat.subtitle}</h3>;
  }
  if (beat.paragraph) {
    return <p className="max-w-xs text-sm text-foreground/70">{beat.paragraph}</p>;
  }
  if (beat.images) {
    return (
      <div className="space-y-4">
        {beat.images.map((src) => (
          <img key={src} src={src} alt="" className="h-64 w-full rounded-panel object-cover" />
        ))}
      </div>
    );
  }
  return null;
}

function isHeading(beat: InterestBeat) {
  return Boolean(beat.title || beat.subtitle);
}

function buildColumns(interests: Interest[]) {
  const left: ReactNode[] = [];
  const middle: ReactNode[] = [];
  const right: ReactNode[] = [];

  let row = 0;
  for (const interest of interests) {
    for (const beat of interest.beats) {
      const heading = isHeading(beat);
      const target = heading ? 'middle' : beat.column ?? 'left';
      const blankHeight = heading ? 'h-24' : 'h-4';
      const cell = <div key={row}>{renderBeat(beat)}</div>;
      const blank = <div key={row} className={blankHeight} aria-hidden="true" />;

      left.push(target === 'left' ? cell : blank);
      middle.push(target === 'middle' ? cell : blank);
      right.push(target === 'right' ? cell : blank);
      row += 1;
    }
  }

  return { left, middle, right };
}

export default function InterestsParallax({ interests }: { interests: Interest[] }) {
  const { left, middle, right } = buildColumns(interests);

  return (
    <div>
      {/* Mobile fallback: title -> paragraph -> images in document order, no columns/parallax */}
      <div className="space-y-10 px-6 py-16 md:hidden">
        {interests.map((interest) => (
          <div key={interest.name} className="space-y-6">
            {interest.beats.map((beat, i) => (
              <div key={i}>{renderBeat(beat)}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <ParallaxScroll left={left} middle={middle} right={right} />
      </div>
    </div>
  );
}
