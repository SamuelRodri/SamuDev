import data from './generated/projects.json';
import { gameProjects } from './gameProjects';

export const featuredGameProject = gameProjects.find((project) => project.slug === data.featuredGame);
