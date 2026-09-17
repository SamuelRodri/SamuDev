import { gameProjects } from './gameProjects';

// Projects already follow the order configured in "Organizar portfolio".
// The first one explicitly marked as featured becomes the main showcase.
export const featuredGameProject = gameProjects.find((project) => project.featured);
