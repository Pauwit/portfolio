import { Timeline } from '@/components/ui/timeline';

export interface TimelineItem {
  title: string;
  org: string;
  kind: string;
  description: string;
  startDate: string;
  endDate: string | null;
}

function formatRange(startDate: string, endDate: string | null) {
  const format = (value: string) => {
    const [year, month] = value.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  if (startDate === endDate) return format(startDate);
  return `${format(startDate)} - ${endDate ? format(endDate) : 'Present'}`;
}

export default function MeTimeline({ items }: { items: TimelineItem[] }) {
  const data = items.map((item) => ({
    title: formatRange(item.startDate, item.endDate),
    content: (
      <div>
        <p className="text-xs uppercase tracking-wide text-accent">{item.kind.replace('-', ' ')}</p>
        <h4 className="mt-1 font-display text-lg font-semibold text-foreground">{item.title}</h4>
        <p className="text-sm text-foreground/60">{item.org}</p>
        <p className="mt-3 max-w-lg text-sm text-foreground/70">{item.description}</p>
      </div>
    ),
  }));

  return <Timeline data={data} />;
}
