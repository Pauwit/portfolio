import { AnimatedGroup } from '@/components/ui/animated-group';
import ProjectCard3D from '@/components/ProjectCard3D';

interface FlagshipProject {
  title: string;
  summary: string;
  stack: string[];
  githubUrl: string | null;
  category: string;
  flagshipOrder: number | null;
}

const spanByOrder: Record<number, string> = {
  1: 'md:col-span-7',
  2: 'md:col-span-5',
  3: 'md:col-span-4',
  4: 'md:col-span-4',
  5: 'md:col-span-4',
};

export default function FlagshipGrid({ projects }: { projects: FlagshipProject[] }) {
  // AnimatedGroup wraps this grid as a single item (its per-item stagger
  // wrapper would otherwise sit between the grid and its cells, breaking the
  // mixed col-span sizing below), giving the whole block one fade+slide-up
  // reveal as it scrolls into view.
  return (
    <AnimatedGroup preset="blur-slide">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {projects.map((project) => (
          <ProjectCard3D
            key={project.title}
            className={`col-span-1 ${spanByOrder[project.flagshipOrder ?? 0] ?? 'md:col-span-4'}`}
            title={project.title}
            summary={project.summary}
            stack={project.stack}
            githubUrl={project.githubUrl}
            category={project.category}
          />
        ))}
      </div>
    </AnimatedGroup>
  );
}
