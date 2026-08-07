import { useMemo, useState } from 'react';
import ProjectCard3D from '@/components/ProjectCard3D';
import CardFlip from '@/components/kokonutui/card-flip';

export interface ProjectItem {
  title: string;
  summary: string;
  stack: string[];
  githubUrl: string | null;
  visibility: 'public' | 'private';
  category: string;
  image: string | null;
}

const CATEGORIES = [
  'All',
  'Hackathons',
  'Medical & Research',
  'Systems',
  'From-scratch',
  'Tools',
  'Fun Stuff',
  'Private Projects',
] as const;

export default function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('All');

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-control px-4 py-2 text-sm font-medium transition ${
              active === category
                ? 'bg-accent text-white'
                : 'border border-foreground/20 text-foreground/70 hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {filtered.map((project) =>
          project.visibility === 'private' ? (
            <CardFlip
              key={project.title}
              className="mb-6 break-inside-avoid"
              title={project.title}
              subtitle={project.category}
              description={project.summary}
              features={project.stack}
            />
          ) : (
            <ProjectCard3D
              key={project.title}
              className="mb-6 break-inside-avoid"
              title={project.title}
              summary={project.summary}
              stack={project.stack}
              githubUrl={project.githubUrl}
              category={project.category}
              image={project.image}
            />
          ),
        )}
      </div>
    </div>
  );
}
