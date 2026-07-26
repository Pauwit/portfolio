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
  'Flagship',
  'Hackathons',
  'Medical CV & Research',
  'Systems & From-scratch',
  'Tools',
  'Fun Stuff',
  'Private & Team',
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

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) =>
          project.visibility === 'private' ? (
            <CardFlip
              key={project.title}
              title={project.title}
              subtitle={project.category}
              description={project.summary}
              features={project.stack}
            />
          ) : (
            <ProjectCard3D
              key={project.title}
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
