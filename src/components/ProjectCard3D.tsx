import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

export interface ProjectCard3DProps {
  title: string;
  summary: string;
  stack: string[];
  githubUrl: string | null;
  category: string;
  className?: string;
}

export default function ProjectCard3D({ title, summary, stack, githubUrl, category, className }: ProjectCard3DProps) {
  return (
    <CardContainer containerClassName={`py-0 ${className ?? ''}`} className="w-full">
      <CardBody className="h-full w-full rounded-panel border border-foreground/10 bg-surface p-6">
        <CardItem translateZ={40} className="font-display text-xl font-semibold text-foreground">
          {title}
        </CardItem>
        <CardItem translateZ={30} className="mt-1 text-xs uppercase tracking-wide text-accent">
          {category}
        </CardItem>
        <CardItem translateZ={50} className="mt-3 text-sm text-foreground/70">
          {summary}
        </CardItem>
        <CardItem translateZ={20} className="mt-4 flex flex-wrap gap-2">
          {stack.slice(0, 4).map((tech) => (
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
