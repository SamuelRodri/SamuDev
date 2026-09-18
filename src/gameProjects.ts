import type { LocalizedText } from './types';
import data from './generated/projects.json';
import { resolveMedia } from './projectMedia';
import projectStatuses from './projectStatuses.json';

export { projectStatuses };

export type GameProject = {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  engine?: string;
  language?: string[];
  year: number;
  platform: string;
  status: keyof typeof projectStatuses;
  summary: LocalizedText;
  description: LocalizedText;
  caseStudyTitle: LocalizedText;
  role: LocalizedText;
  development?: LocalizedText;
  tags: string[];
  image: string;
  gallery?: string[];
  previewVideo?: string;
  video?: string;
  github?: string;
  itch?: string;
  award?: LocalizedText;
};

export const gameProjects: GameProject[] = (data.games as GameProject[]).map((project) => ({
  ...project,
  image: resolveMedia(project.image),
  gallery: project.gallery?.map(resolveMedia),
  previewVideo: project.previewVideo ? resolveMedia(project.previewVideo) : undefined,
  video: project.video ? resolveMedia(project.video) : undefined,
}));
