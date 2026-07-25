import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
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
    flagship: z.boolean().default(false),
    flagshipOrder: z.number().optional(),
    image: z.string().optional(),
  }),
});

const timeline = defineCollection({
  type: 'content',
  schema: z.object({
    startDate: z.string(),
    endDate: z.string().nullable(),
    title: z.string(),
    org: z.string(),
    kind: z.enum(['education', 'work', 'teaching', 'volunteer', 'project-checkpoint']),
    description: z.string(),
  }),
});

const links = defineCollection({
  type: 'data',
  schema: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
  }),
});

export const collections = { projects, timeline, links };
