import { projectStatuses } from "../gameProjects";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Locale } from "../content";
import type { GameJamProject } from "../gameJamProjects";
import type { GameProject } from "../gameProjects";
import type { Navigate } from "../types";
import { gameJamProjectPath, gameProjectPath } from "../routing";

type InteractiveCardProps = {
  label: string;
  path: string;
  navigate: Navigate;
};

function useInteractiveCard({ label, path, navigate }: InteractiveCardProps) {
  const open = () => navigate(path);
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  };

  return { role: "link" as const, tabIndex: 0, "aria-label": label, onClick: open, onKeyDown };
}

function ProjectCover({ project, eager, previewVideo }: { project: GameProject; eager: boolean; previewVideo: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const isDirectVideo = Boolean(project.video && /\.mp4(?:[?#]|$)/i.test(project.video));
  const showVideo = previewVideo && isDirectVideo && !reduceMotion && !videoFailed;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    const updatePlayback = (isVisible: boolean) => {
      if (isVisible && !document.hidden) void video.play().catch(() => undefined);
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => updatePlayback(entry.isIntersecting), { threshold: 0.2 });
    const onVisibilityChange = () => updatePlayback(!document.hidden && video.getBoundingClientRect().bottom > 0 && video.getBoundingClientRect().top < window.innerHeight);
    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, [showVideo]);

  return showVideo
    ? <video ref={videoRef} muted loop playsInline preload="metadata" poster={project.image} aria-hidden="true" onError={() => setVideoFailed(true)}>
        <source src={project.video} type="video/mp4" />
      </video>
    : <img src={project.image} alt={project.title} loading={eager ? "eager" : "lazy"} />;
}

export function GameProjectCard({ project, locale, navigate, featured = false, previewVideo = false }: { project: GameProject; locale: Locale; navigate: Navigate; featured?: boolean; previewVideo?: boolean }) {
  const label = `${locale === "es" ? "Ver proyecto" : "View project"}: ${project.title}`;
  const interactiveProps = useInteractiveCard({ label, path: gameProjectPath(project.slug), navigate });

  return (
    <article className={`project-card game-project-card${featured ? " primary-featured-project" : ""}`} {...interactiveProps}>
      <div className="project-cover">
        <ProjectCover project={project} eager={featured} previewVideo={previewVideo} />
        <span className="project-status-badge">{projectStatuses[project.status][locale]}</span>
        <span className="project-link" aria-hidden="true"><ArrowRight size={22} /></span>
      </div>
      <div className="project-meta">{[project.engine, ...(project.language ?? []), project.year].filter(Boolean).join(" · ")}</div>
      <h3>{project.title}</h3>
      <p>{project.summary[locale]}</p>
      <small>{project.role[locale]}</small>
      <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </article>
  );
}

export function GameJamProjectCard({ project, locale, navigate }: { project: GameJamProject; locale: Locale; navigate: Navigate }) {
  const viewProject = locale === "es" ? "Ver proyecto" : "View project";
  const interactiveProps = useInteractiveCard({
    label: `${viewProject}: ${project.title}`,
    path: gameJamProjectPath(project.slug),
    navigate,
  });

  return (
    <article className="game-jam-card" {...interactiveProps}>
      <div className="project-cover">
        <img src={project.image} alt={project.title} loading="lazy" />
        <span className="jam-year">{project.year}</span>
      </div>
      <div className="game-jam-copy">
        <div className="project-meta">{project.jam}</div>
        <h3>{project.title}</h3>
        <p>{project.summary[locale]}</p>
        <div className="jam-card-footer">
          <span>{project.engine} · {project.genre[locale]}</span>
          <span className="jam-play-link">{viewProject} <ArrowRight size={15} /></span>
        </div>
      </div>
    </article>
  );
}

