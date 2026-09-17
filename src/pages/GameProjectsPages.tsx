import { EngineIcon } from "../components/EngineIcon";
import { projectStatuses } from "../gameProjects";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Volume2, VolumeX } from "lucide-react";
import { FaGithub, FaItchIo } from "react-icons/fa";
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

export function AllGameProjectsPage({ locale, navigate, selectedEngine }: PageProps & { selectedEngine?: ProjectEngine }) {
  const labels = content[locale].modePage;
  const availableEngines = (["Unity", "Unreal Engine", "Godot"] as ProjectEngine[])
    .filter((engine) => gameProjects.some((project) => project.engine === engine));
  const visibleProjects = selectedEngine
    ? gameProjects.filter((project) => project.engine === selectedEngine)
    : gameProjects;

  return (
    <section className="mode-page violet all-projects-page">
      <BackButton locale={locale} navigate={navigate} destination={ROUTES.game} />
      <section className="content-band">
        <h2>{labels.allProjects}</h2>
        <nav className="project-engine-filters" aria-label={locale === "es" ? "Filtrar proyectos por motor" : "Filter projects by engine"}>
          <button
            type="button"
            className={!selectedEngine ? "active" : ""}
            aria-pressed={!selectedEngine}
            onClick={() => navigate(ROUTES.gameProjects)}
          >
            {locale === "es" ? "Todos" : "All"}
          </button>
          {availableEngines.map((engine) => (
            <button
              type="button"
              key={engine}
              className={selectedEngine === engine ? "active" : ""}
              aria-pressed={selectedEngine === engine}
              onClick={() => navigate(gameProjectsByEnginePath(engine))}
            >
              <EngineIcon engine={engine} />
              <span>{engine}</span>
            </button>
          ))}
        </nav>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <GameProjectCard key={project.id} project={project} locale={locale} navigate={navigate} />
          ))}
        </div>
      </section>
      <section className="content-band game-jams-section">
        <h2>Game Jams</h2>
        <div className="game-jams-grid">
          {gameJamProjects.map((project) => (
            <GameJamProjectCard key={project.slug} project={project} locale={locale} navigate={navigate} />
          ))}
        </div>
      </section>
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

function ProjectStory({ locale, title, description, isJam = false }: { locale: Locale; title: string; description: string; isJam?: boolean }) {
  return (
    <section className="project-story">
      <div>
        <p className="eyebrow">{isJam ? "Game Jam" : (locale === "es" ? "El proyecto" : "The project")}</p>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </section>
  );
}

function ProjectGallery({ images, title, locale }: { images?: string[]; title: string; locale: Locale }) {
  if (!images?.length) return null;
  return <section className="content-band">
    <h2>{locale === "es" ? "Capturas" : "Screenshots"}</h2>
    <div className="project-gallery">{images.map((src, index) => <img key={`${src}-${index}`} src={src} alt={`${title} — ${index + 1}`} loading="lazy" />)}</div>
  </section>;
}

function GameJamProjectDetail({ locale, project, navigate }: PageProps & { project: GameJamProject }) {
  return (
    <article className="project-detail-page game">
      <BackButton locale={locale} navigate={navigate} />
      <section className="project-overview">
        <div className="project-featured-media"><img src={project.image} alt={project.title} /></div>
        <div className="project-overview-copy">
          <div className="project-title-row">
            <p className="eyebrow">{project.jam} · {project.year}</p>
            <span className="project-status">Game Jam</span>
          </div>
          <h1>{project.title}</h1>
          <p className="project-lead">{project.summary[locale]}</p>
          <dl>
            {project.engine && <div><dt>{locale === "es" ? "Motor" : "Engine"}</dt><dd><EngineIcon engine={project.engine} /></dd></div>}
            <div><dt>{locale === "es" ? "Género" : "Genre"}</dt><dd>{project.genre[locale]}</dd></div>
            <div><dt>Game Jam</dt><dd>{project.jam}</dd></div>
            <div><dt>{locale === "es" ? "Rol" : "Role"}</dt><dd>{project.role[locale]}</dd></div>
          </dl>
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag === project.engine ? <EngineIcon engine={tag} /> : tag}</span>)}</div>
          <ExternalProjectLink href={project.itch} locale={locale} kind="itch" />
        </div>
      </section>
      <ProjectStory
        locale={locale}
        title={locale === "es" ? "Sobre el proyecto" : "About the project"}
        description={project.description[locale]}
        isJam
      />
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
  const [isMuted, setIsMuted] = useState(true);
  const usesNativeVideo = Boolean(project.video && !videoId);

  return (
    <article className="project-detail-page game">
      <BackButton locale={locale} navigate={navigate} />
      <section className={`project-overview${usesNativeVideo ? " native-video-overview" : ""}`}>
        <div className={`project-featured-media${usesNativeVideo ? " native-video" : ""}`}>
          {videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0`}
              title={`${project.title} gameplay`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              tabIndex={-1}
            />
          ) : project.video ? (
            <video autoPlay muted={isMuted} loop playsInline preload="metadata" disablePictureInPicture poster={project.image}>
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <img src={project.image} alt={project.title} />
          )}
          {usesNativeVideo && (
            <button
              className="video-sound-toggle"
              type="button"
              onClick={() => setIsMuted((muted) => !muted)}
              aria-label={isMuted ? (locale === "es" ? "Activar sonido" : "Turn sound on") : (locale === "es" ? "Silenciar vídeo" : "Mute video")}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span>{isMuted ? (locale === "es" ? "Activar sonido" : "Sound on") : (locale === "es" ? "Silenciar" : "Mute")}</span>
            </button>
          )}
        </div>
        <div className="project-overview-copy">
          <div className="project-title-row">
            <p className="eyebrow project-engine-meta">
              {project.engine && <EngineIcon engine={project.engine} />}
              <span>{[project.platform, project.year].filter(Boolean).join(" · ")}</span>
            </p>
            <span className="project-status">{projectStatuses[project.status][locale]}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="project-lead">{project.summary[locale]}</p>
          <dl>
            {project.engine && <div><dt>{locale === "es" ? "Motor" : "Engine"}</dt><dd><EngineIcon engine={project.engine} /></dd></div>}
            {project.language?.length && <div><dt>{locale === "es" ? "Lenguajes" : "Languages"}</dt><dd>{project.language.join(" · ")}</dd></div>}
            <div><dt>{locale === "es" ? "Plataforma" : "Platform"}</dt><dd>{project.platform}</dd></div>
            <div><dt>{locale === "es" ? "Rol" : "Role"}</dt><dd>{project.role[locale]}</dd></div>
          </dl>
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag === project.engine ? <EngineIcon engine={tag} /> : tag}</span>)}</div>
          {project.award && <div className="award-card"><span>{locale === "es" ? "Reconocimiento" : "Award"}</span><strong>{project.award}</strong></div>}
          {project.github && <ExternalProjectLink href={project.github} locale={locale} kind="github" />}
          {project.itch && <ExternalProjectLink href={project.itch} locale={locale} kind="itch" />}
        </div>
      </section>
      <ProjectStory locale={locale} title={project.caseStudyTitle[locale]} description={project.description[locale]} />
      <ProjectGallery images={project.gallery} title={project.title} locale={locale} />
    </article>
  );
}

