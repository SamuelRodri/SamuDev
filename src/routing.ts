export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

const ROUTES = {
  home: "/",
  dotnet: "/dotnet",
  game: "/game",
  gameProjects: "/game/projects",
} as const;

export { ROUTES };

export function normalizePath(path: string) {
  const cleanPath = path.split(/[?#]/, 1)[0].replace(/\/+$/, "") || ROUTES.home;

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

export function parseRoute(value: string) {
  const url = new URL(value, "https://portfolio.local");
  const match = url.pathname.match(/^\/(es|en)(\/|$)/);
  const locale: Locale = match?.[1] === "es" ? "es" : "en";
  const path = normalizePath(match ? url.pathname.slice(3) : url.pathname);
  return { locale, path, search: url.search, hash: url.hash };
}

export const localizedPath = (path: string, locale: Locale) =>
  `${BASE_PATH}/${locale}${path === ROUTES.home ? "" : path}`;

export function routeFromLocation() {
  const { pathname, search, hash } = window.location;
  const relativePath = BASE_PATH && (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`))
    ? pathname.slice(BASE_PATH.length)
    : pathname;
  const redirectedPath = new URLSearchParams(search).get("path");
  return parseRoute(redirectedPath || `${relativePath || "/"}${search}${hash}`);
}

export function getInitialRoute() {
  const route = routeFromLocation();
  window.history.replaceState(window.history.state, "", `${localizedPath(route.path, route.locale)}${route.search}${route.hash}`);
  return route;
}

export const gameProjectPath = (slug: string) => `${ROUTES.gameProjects}/${slug}`;
export const gameJamProjectPath = (slug: string) => `${ROUTES.gameProjects}/jams/${slug}`;

export const engineSlugs = {
  Unity: "unity",
  "Unreal Engine": "unreal-engine",
  Godot: "godot",
} as const;

export type ProjectEngine = keyof typeof engineSlugs;

export const gameProjectsByEnginePath = (engine: ProjectEngine) =>
  `${ROUTES.gameProjects}/${engineSlugs[engine]}`;

export function engineFromProjectsPath(path: string): ProjectEngine | undefined {
  const slug = path.slice(`${ROUTES.gameProjects}/`.length);
  return (Object.entries(engineSlugs) as [ProjectEngine, string][])
    .find(([, engineSlug]) => slug === engineSlug)?.[0];
}

export function engineFromGameJamsPath(path: string): ProjectEngine | undefined {
  const slug = path.slice(`${ROUTES.gameProjects}/jams/`.length);
  return (Object.entries(engineSlugs) as [ProjectEngine, string][])
    .find(([, engineSlug]) => slug === engineSlug)?.[0];
}
import type { Locale } from "./content";
