import { ArrowLeft, ArrowRight, Download, ExternalLink, Github, Languages, Linkedin, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { content, Locale, Mode, modeDetails, profileLinks } from "./content";

const basePath = "/SamuDev";

function getInitialPath() {
  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get("path");

  if (redirectedPath) {
    const cleanPath = redirectedPath.split("?")[0] || "/";
    window.history.replaceState({}, "", `${basePath}${cleanPath}`);
    return normalizePath(cleanPath);
  }

  return normalizePath(window.location.pathname.replace(basePath, "") || "/");
}

function normalizePath(path: string) {
  if (path === "/dotnet" || path === "/game") {
    return path;
  }

  return "/";
}

function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [path, setPath] = useState(getInitialPath);
  const t = content[locale];

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname.replace(basePath, "") || "/"));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath: string) => {
    const normalized = normalizePath(nextPath);
    window.history.pushState({}, "", `${basePath}${normalized === "/" ? "/" : normalized}`);
    setPath(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeMode = useMemo<Mode | null>(() => {
    if (path === "/dotnet") return "dotnet";
    if (path === "/game") return "game";
    return null;
  }, [path]);

  return (
    <div className="app-shell">
      <div className="grid-glow" aria-hidden="true" />
      <Header
        locale={locale}
        path={path}
        setLocale={setLocale}
        navigate={navigate}
        labels={t.nav}
      />
      <main>{activeMode ? <ModePage locale={locale} mode={activeMode} navigate={navigate} /> : <Hub locale={locale} navigate={navigate} />}</main>
    </div>
  );
}

type HeaderProps = {
  locale: Locale;
  path: string;
  setLocale: (locale: Locale) => void;
  navigate: (path: string) => void;
  labels: {
    home: string;
    dotnet: string;
    game: string;
    contact: string;
  };
};

function Header({ locale, path, setLocale, navigate, labels }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate("/")} aria-label="Go to hub">
        <span className="brand-mark">SR</span>
        <span>Samuel Rodriguez</span>
      </button>
      <nav className="nav-links" aria-label="Primary navigation">
        <button className={path === "/" ? "active" : ""} onClick={() => navigate("/")}>
          {labels.home}
        </button>
        <button className={path === "/dotnet" ? "active" : ""} onClick={() => navigate("/dotnet")}>
          {labels.dotnet}
        </button>
        <button className={path === "/game" ? "active" : ""} onClick={() => navigate("/game")}>
          {labels.game}
        </button>
      </nav>
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

function ModePage({ locale, mode, navigate }: { locale: Locale; mode: Mode; navigate: (path: string) => void }) {
  const t = content[locale];
  const details = modeDetails[mode];
  const copy = t.modes[mode];
  const Icon = details.icon;

  return (
    <section className={`mode-page ${details.color}`}>
      <button className="back-action" onClick={() => navigate("/")}>
        <ArrowLeft size={17} />
        {t.nav.home}
      </button>

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

      <section className="content-band about-band">
        <div className="portrait-slot" aria-label={t.aboutSection.photoLabel}>
          <span>SR</span>
          <small>{t.aboutSection.photoLabel}</small>
        </div>
        <div className="about-copy">
          <p className="eyebrow">{t.modePage.about}</p>
          <h2>{t.aboutSection[mode].title}</h2>
          <p>{t.aboutSection[mode].body}</p>
          <div className="about-highlights">
            {t.aboutSection[mode].highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </div>
      </section>

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

      <section className="content-band focus-band">
        <h2>{t.modePage.focus}</h2>
        <div className="focus-grid">
          {t.focusItems[mode].map((focusItem) => (
            <div className="focus-item" key={focusItem}>
              <span />
              {focusItem}
            </div>
          ))}
        </div>
      </section>

      <section className="content-band">
        <h2>{t.modePage.projects}</h2>
        <div className="project-grid">
          {t.projectSlots[mode].map((project, index) => (
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

      <section className="content-band experience-band">
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
      </section>

      <section className="content-band experience-band">
        <div>
          <h2>{t.modePage.education}</h2>
          <p>{t.modePage.educationIntro}</p>
        </div>
        <div className="experience-list">
          {t.educationItems[mode].map((item) => (
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
      </section>

      <section className="contact-band" id="contact">
        <div>
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
