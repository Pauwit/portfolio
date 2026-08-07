import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

export interface ProjectCard3DProps {
  title: string;
  summary: string;
  stack: string[];
  githubUrl: string | null;
  category: string;
  image?: string | null;
  className?: string;
}

function ProjectImage({ image, title }: { image?: string | null; title: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={title}
        className="h-32 w-full rounded-control object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
      />
    );
  }
  // No screenshot yet: an abstract, non-monospace code motif rather than a fabricated image.
  const widths = ['w-3/4', 'w-1/2', 'w-5/6', 'w-2/3', 'w-1/3'];
  return (
    <div className="flex h-32 w-full flex-col justify-center gap-2 rounded-control bg-background p-4 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
      {widths.map((w, i) => (
        <div key={i} className={`h-2 ${w} rounded-full bg-foreground/10`} />
      ))}
    </div>
  );
}

export default function ProjectCard3D({
  title,
  summary,
  stack,
  githubUrl,
  category,
  image,
  className,
}: ProjectCard3DProps) {
  return (
    <CardContainer containerClassName={`group py-0 ${className ?? ''}`} className="w-full">
      <CardBody className="h-full w-full rounded-panel border border-foreground/10 bg-surface p-6">
        <CardItem translateZ={20} className="w-full">
          <ProjectImage image={image} title={title} />
        </CardItem>
        <CardItem translateZ={40} className="mt-4 font-display text-xl font-semibold text-foreground">
          {title}
        </CardItem>
        <CardItem translateZ={30} className="mt-1 text-xs uppercase tracking-wide text-accent">
          {category}
        </CardItem>
        <CardItem translateZ={50} className="mt-3 text-sm text-foreground/70">
          {summary}
        </CardItem>
        <CardItem translateZ={20} className="mt-4 flex flex-wrap gap-2">
          {stack.slice(0, 20).map((tech) => (
            <span key={tech} className="rounded-control bg-background px-2 py-1 text-xs text-foreground/60">
              {tech}
            </span>
          ))}
        </CardItem>
        {githubUrl ? (
          <CardItem
            as="a"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            translateZ={60}
            className="mt-6 inline-block text-sm font-medium text-accent"
          >
            View repository &rarr;
          </CardItem>
        ) : (
          <CardItem translateZ={60} className="mt-6 inline-block text-sm font-medium text-foreground/40">
            Private repository
          </CardItem>
        )}
      </CardBody>
    </CardContainer>
  );
}
