import type { LocalizedText } from './types';
import data from './generated/projects.json';
import { resolveMedia } from './projectMedia';

export type GameProject = {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  engine?: string;
  language?: string;
  year: number;
  platform: string;
  status: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  caseStudyTitle: LocalizedText;
  role: LocalizedText;
  tags: string[];
  image: string;
  gallery?: string[];
  video?: string;
  github?: string;
  itch?: string;
  award?: string;
};

export const gameProjects: GameProject[] = (data.games as GameProject[]).map((project) => ({ ...project, image: resolveMedia(project.image), gallery: project.gallery?.map(resolveMedia), video: project.video ? resolveMedia(project.video) : undefined, }));
