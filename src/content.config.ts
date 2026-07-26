import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    githubUrl: z.string().url().nullable(),
    visibility: z.enum(['public', 'private']),
    category: z.enum([
      'Flagship',
      'Hackathons',
      'Medical CV & Research',
      'Systems & From-scratch',
      'Tools',
      'Fun Stuff',
      'Private & Team',
    ]),
    flagship: z.boolean(),
    flagshipOrder: z.number().nullable(),
    image: z.string().nullable(),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    startDate: z.string(),
    endDate: z.string().nullable(),
    title: z.string(),
    org: z.string(),
    kind: z.enum(['education', 'work', 'teaching', 'volunteer', 'project-checkpoint']),
    description: z.string(),
  }),
});

const interestBeat = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  paragraph: z.string().optional(),
  column: z.enum(['left', 'middle', 'right']).optional(),
  images: z.array(z.string()).optional(),
});

const interests = defineCollection({
  loader: file('./src/content/interests.json'),
  schema: z.object({
    name: z.string(),
    beats: z.array(interestBeat),
  }),
});

const links = defineCollection({
  loader: file('./src/content/links.json'),
  schema: z.object({
    label: z.string(),
    url: z.string().url(),
    icon: z.string(),
  }),
});

export const collections = { projects, timeline, interests, links };
