import { EngineIcon } from "../components/EngineIcon";
import { projectStatuses } from "../gameProjects";
import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub, FaItchIo } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { GameJamProjectCard, GameProjectCard } from "../components/ProjectCards";
import { content, type Locale } from "../content";
import { gameJamProjects, type GameJamProject } from "../gameJamProjects";
import { gameProjects, type GameProject } from "../gameProjects";
import { ROUTES, gameProjectsByEnginePath, type ProjectEngine } from "../routing";
import type { Navigate } from "../types";

type PageProps = { locale: Locale; navigate: Navigate };
type SlugPageProps = PageProps & { slug: string };

function BackButton({ locale, navigate, destination = ROUTES.gameProjects }: PageProps & { destination?: string }) {
  return (
    <button className="back-action" type="button" onClick={() => navigate(destination)}>
      <ArrowLeft size={17} />
      {destination === ROUTES.game
        ? (locale === "es" ? "Volver a GameDev" : "Back to GameDev")
        : (locale === "es" ? "Todos los proyectos" : "All projects")}
    </button>
  );
}

function ProjectNotFound({ locale, navigate }: PageProps) {
  return (
    <section className="project-detail-page project-not-found">
      <h1>{locale === "es" ? "Proyecto no encontrado" : "Project not found"}</h1>
      <BackButton locale={locale} navigate={navigate} />
    </section>
  );
}

type EngineFiltersProps = PageProps & {
  availableEngines: ProjectEngine[];
  selectedEngine?: ProjectEngine;
};

function EngineFilters({ locale, navigate, availableEngines, selectedEngine }: EngineFiltersProps) {
  return <nav className="project-engine-filters" aria-label={locale === "es" ? "Filtrar portfolio por motor" : "Filter portfolio by engine"}>
    <button type="button" className={!selectedEngine ? "active" : ""} aria-pressed={!selectedEngine} onClick={() => navigate(ROUTES.gameProjects)}>
      {locale === "es" ? "Todos" : "All"}
    </button>
    {availableEngines.map((engine) => (
      <button type="button" key={engine} className={selectedEngine === engine ? "active" : ""} aria-pressed={selectedEngine === engine} onClick={() => navigate(gameProjectsByEnginePath(engine))}>
        <EngineIcon engine={engine} />
        <span>{engine}</span>
      </button>
    ))}
  </nav>;
}

export function AllGameProjectsPage({ locale, navigate, selectedEngine }: PageProps & { selectedEngine?: ProjectEngine }) {
  const labels = content[locale].modePage;
  const availableEngines = (["Unity", "Unreal Engine", "Godot"] as ProjectEngine[])
    .filter((engine) => gameProjects.some((project) => project.engine === engine)
      || gameJamProjects.some((project) => project.engine === engine));
  const visibleProjects = selectedEngine
    ? gameProjects.filter((project) => project.engine === selectedEngine)
    : gameProjects;
  const visibleJams = selectedEngine
    ? gameJamProjects.filter((project) => project.engine === selectedEngine)
    : gameJamProjects;

  return (
    <section className="mode-page violet all-projects-page">
      <BackButton locale={locale} navigate={navigate} destination={ROUTES.game} />
      <section className="content-band">
        <h2>{labels.allProjects}</h2>
        <EngineFilters locale={locale} navigate={navigate} availableEngines={availableEngines} selectedEngine={selectedEngine} />
        {visibleProjects.length > 0 && <div className="project-grid">
          {visibleProjects.map((project) => (
            <GameProjectCard key={project.id} project={project} locale={locale} navigate={navigate} />
          ))}
        </div>}
      </section>
      {visibleJams.length > 0 && <section className="content-band game-jams-section">
        <h2>Game Jams</h2>
        <div className="game-jams-grid">
          {visibleJams.map((project) => (
            <GameJamProjectCard key={project.slug} project={project} locale={locale} navigate={navigate} />
          ))}
        </div>
      </section>}
    </section>
  );
}

export function GameProjectPage({ locale, slug, navigate }: SlugPageProps) {
  const project = gameProjects.find((item) => item.slug === slug);
  return project
    ? <GameProjectDetail locale={locale} project={project} navigate={navigate} />
    : <ProjectNotFound locale={locale} navigate={navigate} />;
}

export function GameJamProjectPage({ locale, slug, navigate }: SlugPageProps) {
  const project = gameJamProjects.find((item) => item.slug === slug);
  return project
    ? <GameJamProjectDetail locale={locale} project={project} navigate={navigate} />
    : <ProjectNotFound locale={locale} navigate={navigate} />;
}

function ProjectStory({ locale, title, description, role, development, isJam = false }: { locale: Locale; title: string; description: string; role: string; development?: string; isJam?: boolean }) {
  return (
    <section className="project-story">
      <div className="project-story-main">
        <p className="eyebrow">{isJam ? "Game Jam" : (locale === "es" ? "El proyecto" : "The project")}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="project-story-sections">
        <article><h3>{locale === "es" ? "Mi rol" : "My role"}</h3><p>{role}</p></article>
        {development && <article>
          <h3>{locale === "es" ? "Desarrollo y aprendizajes" : "Development and learnings"}</h3>
          <div className="project-rich-text"><ReactMarkdown>{development}</ReactMarkdown></div>
        </article>}
      </div>
    </section>
  );
}

function ProjectDevelopment({ locale, development }: { locale: Locale; development?: string }) {
  if (!development) return null;
  return <section className="project-development">
    <p className="eyebrow">{locale === "es" ? "Desarrollo y aprendizajes" : "Development and learnings"}</p>
    <div className="project-rich-text"><ReactMarkdown>{development}</ReactMarkdown></div>
  </section>;
}

function ProjectGallery({ images, title, locale }: { images?: string[]; title: string; locale: Locale }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  if (!images?.length) return null;
  const hasMultipleImages = images.length > 1;
  const selectPrevious = () => setSelectedIndex((index) => (index - 1 + images.length) % images.length);
  const selectNext = () => setSelectedIndex((index) => (index + 1) % images.length);
  const imageLabel = (index: number) => `${title} — ${locale === "es" ? "captura" : "screenshot"} ${index + 1} ${locale === "es" ? "de" : "of"} ${images.length}`;

  return <section className="content-band">
    <h2>{locale === "es" ? "Capturas" : "Screenshots"}</h2>
    <div
      className="project-gallery"
      tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={hasMultipleImages ? (event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); selectPrevious(); }
        if (event.key === "ArrowRight") { event.preventDefault(); selectNext(); }
      } : undefined}
      aria-label={locale === "es" ? `Galería de ${title}` : `${title} gallery`}
    >
      <div className="project-gallery-stage">
        <img src={images[selectedIndex]} alt={imageLabel(selectedIndex)} loading="lazy" />
        {hasMultipleImages && <>
          <button type="button" className="gallery-control previous" onClick={selectPrevious} aria-label={locale === "es" ? "Captura anterior" : "Previous screenshot"}><ChevronLeft size={24} /></button>
          <button type="button" className="gallery-control next" onClick={selectNext} aria-label={locale === "es" ? "Captura siguiente" : "Next screenshot"}><ChevronRight size={24} /></button>
          <span className="gallery-counter" aria-hidden="true">{selectedIndex + 1} / {images.length}</span>
        </>}
      </div>
      {hasMultipleImages && <div className="project-gallery-thumbnails" aria-label={locale === "es" ? "Seleccionar captura" : "Select screenshot"}>
        {images.map((src, index) => <button type="button" key={`${src}-${index}`} className={selectedIndex === index ? "active" : ""} aria-label={imageLabel(index)} aria-pressed={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
          <img src={src} alt="" loading="lazy" />
        </button>)}
      </div>}
    </div>
  </section>;
}

function GameJamProjectDetail({ locale, project, navigate }: PageProps & { project: GameJamProject }) {
  return (
    <article className="project-detail-page game">
      <BackButton locale={locale} navigate={navigate} />
      <header className="project-detail-header">
        <div className="project-title-row"><p className="eyebrow">{project.jam} · {project.year}</p><span className="project-status">Game Jam</span></div>
        <h1>{project.title}</h1>
        <p className="project-lead">{project.summary[locale]}</p>
        <div className="project-actions"><ExternalProjectLink href={project.itch} locale={locale} kind="itch" /></div>
      </header>
      <div className="project-featured-media"><img src={project.image} alt={project.title} /></div>
      <dl className="project-facts">
        {project.engine && <div><dt>{locale === "es" ? "Motor" : "Engine"}</dt><dd><EngineIcon engine={project.engine} /></dd></div>}
        <div><dt>{locale === "es" ? "Género" : "Genre"}</dt><dd>{project.genre[locale]}</dd></div>
        <div><dt>Game Jam</dt><dd>{project.jam}</dd></div>
        <div><dt>{locale === "es" ? "Rol" : "Role"}</dt><dd>{project.role[locale]}</dd></div>
      </dl>
      <ProjectStory
        locale={locale}
        title={locale === "es" ? "Sobre el proyecto" : "About the project"}
        description={project.description[locale]}
        role={project.role[locale]}
        isJam
      />
      <div className="project-detail-tags tag-row">{project.tags.map((tag) => <span key={tag}>{tag === project.engine ? <EngineIcon engine={tag} /> : tag}</span>)}</div>
      <ProjectGallery images={project.gallery} title={project.title} locale={locale} />
    </article>
  );
}

function ExternalProjectLink({ href, locale, kind }: { href: string; locale: Locale; kind: "github" | "itch" }) {
  const Icon = kind === "github" ? FaGithub : FaItchIo;
  const label = kind === "github"
    ? (locale === "es" ? "Ver repositorio" : "View repository")
    : (locale === "es" ? "Jugar en itch.io" : "Play on itch.io");

  return (
    <a className="project-repository-link" href={href} target="_blank" rel="noreferrer">
      <Icon size={17} />
      {label}
      <ExternalLink size={14} />
    </a>
  );
}

function GameProjectDetail({ locale, project, navigate }: PageProps & { project: GameProject }) {
  const videoId = project.video?.includes("youtube.com") ? new URL(project.video).searchParams.get("v") : null;

  return (
    <article className="project-detail-page game">
      <BackButton locale={locale} navigate={navigate} />
      <div className="project-overview">
        <div className="project-featured-media">
          {project.video && <img className="project-media-backdrop" src={project.image} alt="" aria-hidden="true" />}
          {videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?controls=1&playsinline=1&rel=0`}
              title={`${project.title} gameplay`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : project.video ? (
            <video controls playsInline preload="metadata" poster={project.image}>
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <img src={project.image} alt={project.title} />
          )}
        </div>
        <div className="project-overview-info">
          <div className="project-title-row">
            <p className="eyebrow project-engine-meta">{project.engine && <EngineIcon engine={project.engine} />}<span>{[project.platform, project.year].filter(Boolean).join(" · ")}</span></p>
            <span className="project-status">{projectStatuses[project.status][locale]}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="project-lead">{project.summary[locale]}</p>
          {(project.github || project.itch) && <div className="project-actions">
            {project.github && <ExternalProjectLink href={project.github} locale={locale} kind="github" />}
            {project.itch && <ExternalProjectLink href={project.itch} locale={locale} kind="itch" />}
          </div>}
          <div className="project-overview-copy">
            <p className="eyebrow">{locale === "es" ? "El proyecto" : "The project"}</p>
            <h2>{project.caseStudyTitle[locale]}</h2>
            <p>{project.description[locale]}</p>
            <h3>{locale === "es" ? "Mi rol" : "My role"}</h3>
            <p>{project.role[locale]}</p>
          </div>
        </div>
      </div>
      <ProjectDevelopment locale={locale} development={project.development?.[locale]} />
      <dl className="project-facts">
        {project.engine && <div><dt>{locale === "es" ? "Motor" : "Engine"}</dt><dd><EngineIcon engine={project.engine} /></dd></div>}
        {project.language?.length && <div><dt>{locale === "es" ? "Lenguajes" : "Languages"}</dt><dd>{project.language.join(" · ")}</dd></div>}
        <div><dt>{locale === "es" ? "Plataforma" : "Platform"}</dt><dd>{project.platform}</dd></div>
      </dl>
      {project.award && <div className="award-card"><span>{locale === "es" ? "Reconocimiento" : "Award"}</span><strong>{project.award[locale]}</strong></div>}
      <div className="project-detail-tags tag-row">{project.tags.map((tag) => <span key={tag}>{tag === project.engine ? <EngineIcon engine={tag} /> : tag}</span>)}</div>
      <ProjectGallery images={project.gallery} title={project.title} locale={locale} />
    </article>
  );
}

