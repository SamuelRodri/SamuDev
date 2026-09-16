export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

const ROUTES = {
  home: "/",
  dotnet: "/dotnet",
  game: "/game",
  gameProjects: "/game/projects",
} as const;

export { ROUTES };

export function normalizePath(path: string) {
  const cleanPath = path.split(/[?#]/, 1)[0] || ROUTES.home;

  if (
    cleanPath === ROUTES.dotnet
    || cleanPath === ROUTES.game
    || cleanPath === ROUTES.gameProjects
    || cleanPath.startsWith(`${ROUTES.gameProjects}/`)
  ) {
    return cleanPath;
  }

  return ROUTES.home;
}

export function getInitialPath() {
  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get("path");

  if (redirectedPath) {
    const path = normalizePath(redirectedPath);
    window.history.replaceState({ fromHub: false }, "", `${BASE_PATH}${path}`);
    return path;
  }

  return normalizePath(window.location.pathname.replace(BASE_PATH, "") || ROUTES.home);
}

export const gameProjectPath = (slug: string) => `${ROUTES.gameProjects}/${slug}`;
export const gameJamProjectPath = (slug: string) => `${ROUTES.gameProjects}/jams/${slug}`;
