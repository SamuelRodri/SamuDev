import { ArrowLeft, ArrowRight, Download, ExternalLink, Gamepad2, Github, GraduationCap, Languages, Linkedin, Mail, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { content, Locale, Mode, modeDetails, profileLinks } from "./content";
import { featuredGameProject } from "./featuredGameProject";
import { GameProject, gameProjects } from "./gameProjects";

const basePath = "/SamuDev";

function getInitialPath() {
  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get("path");

  if (redirectedPath) {
    const cleanPath = redirectedPath.split("?")[0] || "/";
    window.history.replaceState({ fromHub: false }, "", `${basePath}${cleanPath}`);
    return normalizePath(cleanPath);
  }

  return normalizePath(window.location.pathname.replace(basePath, "") || "/");
}

function normalizePath(path: string) {
  if (path === "/dotnet" || path === "/game" || path.startsWith("/game/projects/")) {
    return path;
  }

  return "/";
}

function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [showConstructionNotice, setShowConstructionNotice] = useState(true);
  const [path, setPath] = useState(getInitialPath);
  const [fromHub, setFromHub] = useState(
    () => normalizePath(window.location.pathname.replace(basePath, "") || "/") === "/" || window.history.state?.fromHub === true,
  );
  const t = content[locale];

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const onPopState = () => {
      const nextPath = normalizePath(window.location.pathname.replace(basePath, "") || "/");
      setPath(nextPath);
      setFromHub(nextPath === "/" || window.history.state?.fromHub === true);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const navigate = (nextPath: string) => {
    const normalized = normalizePath(nextPath);
    const nextFromHub = path === "/" || fromHub;
    window.history.pushState({ fromHub: nextFromHub }, "", `${basePath}${normalized === "/" ? "/" : normalized}`);
    setPath(normalized);
    setFromHub(nextFromHub);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const activeMode = useMemo<Mode | null>(() => {
    if (path === "/dotnet") return "dotnet";
    if (path === "/game" || path.startsWith("/game/projects/")) return "game";
    return null;
  }, [path]);

  return (
    <div className="app-shell">
      <div className="grid-glow" aria-hidden="true" />
      {showConstructionNotice && (
        <aside className="construction-notice" role="status">
          <span className="construction-notice-dot" aria-hidden="true" />
          <p>
            <strong>{locale === "es" ? "Portfolio en construcción" : "Portfolio under construction"}</strong>
            <span>
              {locale === "es"
                ? "Estoy dando los últimos retoques. Algunas secciones seguirán creciendo próximamente."
                : "I'm adding the finishing touches. Some sections will continue to grow soon."}
            </span>
          </p>
          <button
            type="button"
            onClick={() => setShowConstructionNotice(false)}
            aria-label={locale === "es" ? "Cerrar aviso" : "Close notice"}
          >
            <X size={17} />
          </button>
        </aside>
      )}
      <Header
        locale={locale}
        path={path}
        setLocale={setLocale}
        navigate={navigate}
        showPortfolioNavigation={path === "/" || fromHub}
        labels={t.nav}
      />
      <main>{path.startsWith("/game/projects/") ? (
        <GameProjectPage locale={locale} slug={path.split("/").pop() || ""} navigate={navigate} />
      ) : activeMode ? (
        <ModePage locale={locale} mode={activeMode} navigate={navigate} showBack={fromHub} />
      ) : (
        <Hub locale={locale} navigate={navigate} />
      )}</main>
    </div>
  );
}

type HeaderProps = {
  locale: Locale;
  path: string;
  setLocale: (locale: Locale) => void;
  navigate: (path: string) => void;
  showPortfolioNavigation: boolean;
  labels: {
    home: string;
    dotnet: string;
    game: string;
    contact: string;
  };
};

function Header({ locale, path, setLocale, navigate, showPortfolioNavigation, labels }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="brand" onClick={showPortfolioNavigation ? () => navigate("/") : undefined} aria-label={showPortfolioNavigation ? "Go to hub" : undefined}>
        <span className="brand-mark">
          <img src={`${import.meta.env.BASE_URL}images/samudev-logo.png`} alt="" />
        </span>
        <span>Samuel Rodriguez</span>
      </button>
      {showPortfolioNavigation && <nav className="nav-links" aria-label="Primary navigation">
        <button className={path === "/" ? "active" : ""} onClick={() => navigate("/")}>
          {labels.home}
        </button>
        <button className={path === "/dotnet" ? "active" : ""} onClick={() => navigate("/dotnet")}>
          {labels.dotnet}
        </button>
        <button className={path.startsWith("/game") ? "active" : ""} onClick={() => navigate("/game")}>
          {labels.game}
        </button>
      </nav>}
      <button className="locale-toggle" onClick={() => setLocale(locale === "en" ? "es" : "en")}>
        <Languages size={18} />
        {locale.toUpperCase()}
      </button>
    </header>
  );
}

function Hub({ locale, navigate }: { locale: Locale; navigate: (path: string) => void }) {
  const t = content[locale];

  return (
    <section className="hub">
      <div className="hero-copy">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.body}</p>
      </div>

      <div className="mode-grid" aria-label="Portfolio mode selection">
        <ModeCard locale={locale} mode="dotnet" onSelect={() => navigate("/dotnet")} cta={t.hero.dotnetCta} />
        <ModeCard locale={locale} mode="game" onSelect={() => navigate("/game")} cta={t.hero.gameCta} />
      </div>

      <section className="hub-contact" aria-label={t.hero.contactLabel}>
        <span>{t.hero.contactLabel}</span>
        <div>
          <a href={profileLinks.github} target="_blank" rel="noreferrer">
            <Github size={17} />
            GitHub
          </a>
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={17} />
            LinkedIn
          </a>
          <a href={profileLinks.email}>
            <Mail size={17} />
            Email
          </a>
        </div>
      </section>
    </section>
  );
}

function ModeCard({ locale, mode, onSelect, cta }: { locale: Locale; mode: Mode; onSelect: () => void; cta: string }) {
  const details = modeDetails[mode];
  const Icon = details.icon;
  const AccentIcon = details.accentIcon;
  const copy = content[locale].modes[mode];

  return (
    <article className={`mode-card ${details.color}`}>
      <div className="mode-visual" aria-hidden="true">
        <Icon className="mode-icon" />
        <AccentIcon className="mode-accent" />
      </div>
      <div className="mode-card-copy">
        <span>{copy.label}</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      <div className="stat-row">
        {copy.stats.map((stat) => (
          <span key={stat}>{stat}</span>
        ))}
      </div>
      <button className="primary-action" onClick={onSelect}>
        {cta}
        <ArrowRight size={18} />
      </button>
    </article>
  );
}

function ModePage({ locale, mode, navigate, showBack }: { locale: Locale; mode: Mode; navigate: (path: string) => void; showBack: boolean }) {
  const t = content[locale];
  const details = modeDetails[mode];
  const copy = t.modes[mode];
  const Icon = details.icon;

  return (
    <section className={`mode-page ${details.color} ${mode}-mode-page`}>
      {showBack && <button className="back-action" onClick={() => navigate("/")}>
        <ArrowLeft size={17} />
        {t.nav.home}
      </button>}

      {mode === "game" && (
        <section className="game-intro" aria-labelledby="game-intro-title">
          <p className="eyebrow" id="game-intro-title">{t.gameIntro.role}</p>
          <div className="game-intro-content">
            <div className="game-intro-photo">
              <img src={`${import.meta.env.BASE_URL}images/samuel-profile.jpg`} alt={t.aboutSection.photoAlt} />
            </div>
            <p>{t.gameIntro.body}</p>
          </div>
        </section>
      )}

      <div className="mode-hero">
        <div>
          <p className="eyebrow">{copy.label}</p>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
        </div>
        {mode === "game" ? (
          <div className="signal-panel project-video-preview">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={featuredGameProject.poster}
              aria-label={`${featuredGameProject.title} gameplay preview`}
            >
              <source src={featuredGameProject.previewVideo} type="video/mp4" />
            </video>
            <div className="project-preview-copy">
              <span>{locale === "es" ? "Proyecto principal" : "Featured project"}</span>
              <strong>{featuredGameProject.title}</strong>
            </div>
          </div>
        ) : (
          <div className="signal-panel" aria-hidden="true">
            <Icon />
            <span>{t.modePage.signal[mode]}</span>
          </div>
        )}
      </div>

      {mode === "dotnet" && (
        <section className="content-band about-band">
          <div className="portrait-slot">
            <img src={`${import.meta.env.BASE_URL}images/samuel-profile.jpg`} alt={t.aboutSection.photoAlt} />
          </div>
          <div className="about-copy">
            <p className="eyebrow">{t.modePage.about}</p>
            <h2>{t.aboutSection.dotnet.title}</h2>
            <p>{t.aboutSection.dotnet.body}</p>
            <div className="about-highlights">
              {t.aboutSection.dotnet.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="content-band">
        <h2>{t.modePage.skills}</h2>
        <div className="skill-grid" key={`${mode}-${locale}-skills`}>
          {details.skills.map((skill) => {
            const SkillIcon = skill.icon;
            return (
              <div className="skill-tile" key={skill.label.en}>
                <SkillIcon size={20} />
                <span>{skill.label[locale]}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="content-band">
        <h2>{t.modePage.projects}</h2>
        {mode === "game" && (
          <article className="featured-project-showcase">
            <div className="featured-project-copy">
              <p className="eyebrow">{t.modePage.featuredProject.label}</p>
              <h3>{featuredGameProject.title}</h3>
              <p>{t.modePage.featuredProject.body}</p>
              <span>{featuredGameProject.engine}</span>
            </div>
            <video
              controls
              playsInline
              preload="metadata"
              poster={featuredGameProject.poster}
              aria-label={`${featuredGameProject.title} gameplay`}
            >
              <source src={featuredGameProject.video} type="video/mp4" />
            </video>
          </article>
        )}
        <div className="project-grid">
          {mode === "game" ? gameProjects.map((project) => (
            <article className="project-card game-project-card" key={project.id}>
              <div className="project-cover">
                <img src={project.image} alt={project.title} />
                <span>{project.status[locale]}</span>
              </div>
              <div className="project-meta">{project.engine} · {project.language} · {project.year}</div>
              <h3>{project.title}</h3>
              <p>{project.summary[locale]}</p>
              <small>{project.role[locale]}</small>
              <div className="tag-row">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <button className="project-link" onClick={() => navigate(`/game/projects/${project.slug}`)}>
                {locale === "es" ? "Ver proyecto" : "View project"}
                <ArrowRight size={16} />
              </button>
            </article>
          )) : t.projectSlots[mode].map((project, index) => (
            <article className="project-card" key={project.title}>
              <span>0{index + 1}</span>
              <h3>{project.title}</h3>
              <p>{project.body}</p>
              <button>
                {t.modePage.placeholders.links}
                <ExternalLink size={16} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {mode === "dotnet" && <section className="content-band experience-band">
        <div>
          <h2>{t.modePage.experienceSection[mode].title}</h2>
          <p>{t.modePage.experienceSection[mode].intro}</p>
        </div>
        <div className="experience-list">
          {t.experienceItems[mode].map((item) => (
            <article className="experience-item" key={item.title}>
              <span>{item.meta}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>}

      <section className="content-band experience-band education-band">
        <div>
          <h2>{t.modePage.education}</h2>
          <p>{t.modePage.educationIntro}</p>
        </div>
        <div className="experience-list">
          {t.educationItems[mode].map((item, index) => (
            <article className="experience-item education-item" key={item.title}>
              <div className="education-card-top">
                <span>{item.meta}</span>
                <div className="education-icon" aria-hidden="true">
                  <GraduationCap size={18} />
                </div>
              </div>
              <span className="education-index" aria-hidden="true">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div className="contact-copy">
          <div className="availability-status">
            <span aria-hidden="true" />
            {t.modePage.availability}
          </div>
          <h2>{t.modePage.contact}</h2>
          <p>{t.shared.contactBody}</p>
        </div>
        <div className="contact-actions">
          <a href={profileLinks.email}>
            <Mail size={17} />
            Email
          </a>
          <a href={profileLinks.github} target="_blank" rel="noreferrer">
            <Github size={17} />
            GitHub
          </a>
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={17} />
            LinkedIn
          </a>
          {mode === "game" && (
            <a href={profileLinks.itch} target="_blank" rel="noreferrer">
              <Gamepad2 size={17} />
              itch.io
            </a>
          )}
          <a className="disabled-link" aria-disabled="true">
            <Download size={17} />
            {t.modePage.placeholders.cv}
          </a>
        </div>
      </section>
    </section>
  );
}

function GameProjectPage({ locale, slug, navigate }: { locale: Locale; slug: string; navigate: (path: string) => void }) {
  const project = gameProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="project-detail-page project-not-found">
        <h1>{locale === "es" ? "Proyecto no encontrado" : "Project not found"}</h1>
        <button className="back-action" onClick={() => navigate("/game")}>
          <ArrowLeft size={17} />
          {locale === "es" ? "Volver a GameDev" : "Back to GameDev"}
        </button>
      </section>
    );
  }

  return <GameProjectDetail locale={locale} project={project} navigate={navigate} />;
}

function GameProjectDetail({ locale, project, navigate }: { locale: Locale; project: GameProject; navigate: (path: string) => void }) {
  const videoId = project.video?.includes("youtube.com") ? new URL(project.video).searchParams.get("v") : null;

  return (
    <article className="project-detail-page game">
      <button className="back-action" onClick={() => navigate("/game")}>
        <ArrowLeft size={17} />
        {locale === "es" ? "Todos los proyectos" : "All projects"}
      </button>

      <section className="project-overview">
        <div className="project-featured-media">
          {videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
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
          <span className="media-label">Gameplay</span>
        </div>

        <div className="project-overview-copy">
          <div className="project-title-row">
            <p className="eyebrow">{project.engine} · {project.platform} · {project.year}</p>
            <span className="project-status">{project.status[locale]}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="project-lead">{project.summary[locale]}</p>

          <dl>
            <div><dt>{locale === "es" ? "Motor" : "Engine"}</dt><dd>{project.engine}</dd></div>
            <div><dt>{locale === "es" ? "Lenguaje" : "Language"}</dt><dd>{project.language}</dd></div>
            <div><dt>{locale === "es" ? "Plataforma" : "Platform"}</dt><dd>{project.platform}</dd></div>
            <div><dt>{locale === "es" ? "Rol" : "Role"}</dt><dd>{project.role[locale]}</dd></div>
          </dl>
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {project.award && (
            <div className="award-card">
              <span>{locale === "es" ? "Reconocimiento" : "Award"}</span>
              <strong>{project.award}</strong>
            </div>
          )}
          {project.github && (
            <a className="project-repository-link" href={project.github} target="_blank" rel="noreferrer">
              <Github size={17} />
              {locale === "es" ? "Ver repositorio" : "View repository"}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </section>

      <section className="project-story">
        <div>
          <p className="eyebrow">{locale === "es" ? "El proyecto" : "The project"}</p>
          <h2>{project.caseStudyTitle[locale]}</h2>
        </div>
        <p>{project.description[locale]}</p>
      </section>
    </article>
  );
}

export default App;
