import type { LocalizedText } from './types';
import data from './generated/projects.json';
import { resolveMedia } from './projectMedia';

export type GameJamProject = {
  slug: string;
  title: string;
  jam: string;
  year: number;
  engine: string;
  genre: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  tags: string[];
  image: string;
  gallery?: string[];
  itch: string;
};

export const gameJamProjects: GameJamProject[] = (data.jams as GameJamProject[]).map((project) => ({ ...project, image: resolveMedia(project.image), gallery: project.gallery?.map(resolveMedia),  }));
