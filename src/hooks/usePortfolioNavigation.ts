import { useEffect, useState } from "react";
import { BASE_PATH, getInitialPath, normalizePath, ROUTES } from "../routing";
import type { Navigate } from "../types";

const pathFromLocation = () => normalizePath(window.location.pathname.replace(BASE_PATH, "") || ROUTES.home);

export function usePortfolioNavigation() {
  const [path, setPath] = useState(getInitialPath);
  const [fromHub, setFromHub] = useState(
    () => pathFromLocation() === ROUTES.home || window.history.state?.fromHub === true,
  );

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const onPopState = () => {
      const nextPath = pathFromLocation();
      setPath(nextPath);
      setFromHub(nextPath === ROUTES.home || window.history.state?.fromHub === true);
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
    window.history.pushState({ fromHub: nextFromHub }, "", `${BASE_PATH}${normalized}`);
    setPath(normalized);
    setFromHub(nextFromHub);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return { path, fromHub, navigate };
}

