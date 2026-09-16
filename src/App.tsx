import { ArrowRight, Download, ExternalLink, GraduationCap, Languages, Mail, X } from "lucide-react";
import { FaGithub, FaItchIo, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { content, Locale, Mode, modeDetails, profileLinks } from "./content";
import { featuredGameProject } from "./featuredGameProject";
import { gameProjects } from "./gameProjects";
import { GameProjectCard } from "./components/ProjectCards";
import { AllGameProjectsPage, GameJamProjectPage, GameProjectPage } from "./pages/GameProjectsPages";
import { ROUTES, gameProjectPath } from "./routing";
import type { Navigate } from "./types";
import { usePortfolioNavigation } from "./hooks/usePortfolioNavigation";

const featuredProjects = gameProjects.filter((project) => project.featured);

function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [showConstructionNotice, setShowConstructionNotice] = useState(true);
  const { path, fromHub, navigate } = usePortfolioNavigation();
  const t = content[locale];
  const activeMode: Mode | null = path === ROUTES.dotnet
    ? "dotnet"
    : (path === ROUTES.game || path.startsWith(ROUTES.gameProjects) ? "game" : null);

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
        showPortfolioNavigation={path === ROUTES.home || fromHub}
        labels={t.nav}
      />
      <main key={path} className="page-transition">{path === ROUTES.gameProjects ? (
        <AllGameProjectsPage locale={locale} navigate={navigate} />
      ) : path.startsWith("/game/projects/jams/") ? (
        <GameJamProjectPage locale={locale} slug={path.split("/").pop() || ""} navigate={navigate} />
      ) : path.startsWith("/game/projects/") ? (
        <GameProjectPage locale={locale} slug={path.split("/").pop() || ""} navigate={navigate} />
      ) : activeMode ? (
        <ModePage locale={locale} mode={activeMode} navigate={navigate} />
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
  navigate: Navigate;
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

function Hub({ locale, navigate }: { locale: Locale; navigate: Navigate }) {
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
            <FaGithub size={17} />
            GitHub
          </a>
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin size={17} />
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

function ModePage({ locale, mode, navigate }: { locale: Locale; mode: Mode; navigate: Navigate }) {
  const t = content[locale];
  const details = modeDetails[mode];
  const copy = t.modes[mode];
  const Icon = details.icon;
  const skillsSection = (
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
  );

  return (
    <section className={`mode-page ${details.color} ${mode}-mode-page`}>
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

      {mode === "dotnet" && (
        <div className="mode-hero">
          <div>
            <p className="eyebrow">{copy.label}</p>
            <h1>{copy.title}</h1>
            <p>{copy.body}</p>
          </div>
          <div className="signal-panel" aria-hidden="true">
            <Icon />
            <span>{t.modePage.signal[mode]}</span>
          </div>
        </div>
      )}

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

      {mode === "dotnet" && skillsSection}

      <section className="content-band">
        <h2>{mode === "game" ? t.modePage.featuredProjects : t.modePage.projects}</h2>
        {mode === "game" && (
          <article className="featured-project-showcase">
            <div className="featured-project-copy">
              <p className="eyebrow">{t.modePage.featuredProject.label}</p>
              <h3>{featuredGameProject.title}</h3>
              <p>{t.modePage.featuredProject.body}</p>
              <span>{featuredGameProject.platform} · Roguelike</span>
              <button className="project-repository-link" type="button" onClick={() => navigate(gameProjectPath(featuredGameProject.slug))}>
                {locale === "es" ? "Ver proyecto" : "View project"} <ArrowRight size={17} />
              </button>
              <a className="project-repository-link" href={featuredGameProject.itch} target="_blank" rel="noreferrer">
                <FaItchIo size={17} /> {locale === "es" ? "Jugar en itch.io" : "Play on itch.io"} <ExternalLink size={14} />
              </a>
            </div>
            <img src={featuredGameProject.poster} alt={locale === "es" ? "Portada de Synastra" : "Synastra cover art"} />
          </article>
        )}
        <div className={`project-grid${mode === "game" ? " featured-project-grid" : ""}`}>
          {mode === "game" ? featuredProjects.map((project) => (
            <GameProjectCard key={project.id} project={project} locale={locale} navigate={navigate} />
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
        {mode === "game" && (
          <button className="view-all-projects" type="button" onClick={() => navigate("/game/projects")}>
            {t.modePage.viewAllProjects}
            <ArrowRight size={18} />
          </button>
        )}
      </section>

      {mode === "game" && skillsSection}

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
            <FaGithub size={17} />
            GitHub
          </a>
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin size={17} />
            LinkedIn
          </a>
          {mode === "game" && (
            <a href={profileLinks.itch} target="_blank" rel="noreferrer">
              <FaItchIo size={17} />
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

export default App;
