import { useEffect, useState } from "react";
import { getInitialRoute, localizedPath, normalizePath, routeFromLocation, ROUTES } from "../routing";
import type { Locale } from "../content";
import type { Navigate } from "../types";

export function usePortfolioNavigation() {
  const [route, setRoute] = useState(getInitialRoute);
  const { path, locale } = route;
  const [fromHub, setFromHub] = useState(
    () => path === ROUTES.home || window.history.state?.fromHub === true,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const onPopState = () => {
      const nextRoute = getInitialRoute();
      setRoute(nextRoute);
      setFromHub(nextRoute.path === ROUTES.home || window.history.state?.fromHub === true);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const navigate: Navigate = (nextPath) => {
    const normalized = normalizePath(nextPath);
    const nextFromHub = path === ROUTES.home || fromHub;
    window.history.pushState({ fromHub: nextFromHub }, "", localizedPath(normalized, locale));
    setRoute(routeFromLocation());
    setFromHub(nextFromHub);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const setLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    window.history.pushState({ fromHub }, "", `${localizedPath(path, nextLocale)}${window.location.search}${window.location.hash}`);
    setRoute(routeFromLocation());
  };

  return { path, locale, setLocale, fromHub, navigate };
}
