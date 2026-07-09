import {
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  Gamepad2,
  Globe2,
  Headset,
  Layers3,
  MonitorPlay,
  ServerCog,
  Sparkles,
} from "lucide-react";

export type Locale = "en" | "es";
export type Mode = "dotnet" | "game";

export const profileLinks = {
  github: "https://github.com/SamuelRodri",
  linkedin: "https://www.linkedin.com/in/samuelrodri/",
  email: "mailto:samudev@outlook.com",
} as const;

export const content = {
  en: {
    nav: {
      home: "Hub",
      dotnet: ".NET Developer",
      game: "Game Developer",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Samuel Rodriguez / SamuDev",
      title: "Developer portfolio.",
      body: "Backend systems, game development and interactive experiences. Choose the area you want to explore.",
      dotnetCta: "Enter .NET mode",
      gameCta: "Enter game mode",
      contactLabel: "Profiles and contact",
    },
    modes: {
      dotnet: {
        label: ".NET Developer",
        title: "Reliable systems, clean APIs and pragmatic architecture.",
        body: "Backend-focused work with C#, .NET, SQL and cloud-ready services. This mode will collect projects, case studies and engineering notes.",
        stats: ["C# / .NET", "APIs", "Databases"],
      },
      game: {
        label: "Game Developer",
        title: "Interactive worlds, prototypes and real-time experiences.",
        body: "Unity, Unreal, VR and experimental interaction design. This mode will showcase playable ideas, reels and technical breakdowns.",
        stats: ["Unity", "Unreal", "VR / XR"],
      },
    },
    modePage: {
      overview: "Overview",
      skills: "Core stack",
      projects: "Project slots",
      experience: "Experience",
      education: "Education",
      reel: "Media / demo reel",
      cv: "CV",
      contact: "Contact",
      placeholders: {
        project: "Project details coming soon",
        links: "Links will be added later",
        cv: "Downloadable CV placeholder",
      },
    },
    shared: {
      aboutTitle: "About Samuel",
      aboutBody:
        "I build software from two complementary angles: backend systems with .NET and interactive experiences with game engines. This portfolio is organized so each area can grow with its own projects, notes and media.",
      contactBody:
        "You can reach me by email or follow my work through GitHub and LinkedIn while the project showcase grows.",
    },
  },
  es: {
    nav: {
      home: "Hub",
      dotnet: ".NET Developer",
      game: "Game Developer",
      contact: "Contacto",
    },
    hero: {
      eyebrow: "Samuel Rodriguez / SamuDev",
      title: "Portfolio de desarrollador.",
      body: "Sistemas backend, videojuegos y experiencias interactivas. Elige el área que quieres explorar.",
      dotnetCta: "Entrar en modo .NET",
      gameCta: "Entrar en modo juegos",
      contactLabel: "Perfiles y contacto",
    },
    modes: {
      dotnet: {
        label: ".NET Developer",
        title: "Sistemas fiables, APIs limpias y arquitectura pragmática.",
        body: "Trabajo orientado a backend con C#, .NET, SQL y servicios preparados para cloud. Este modo reunirá proyectos, casos de estudio y notas técnicas.",
        stats: ["C# / .NET", "APIs", "Bases de datos"],
      },
      game: {
        label: "Game Developer",
        title: "Mundos interactivos, prototipos y experiencias en tiempo real.",
        body: "Unity, Unreal, VR y diseño de interacción experimental. Este modo mostrará ideas jugables, reels y desgloses técnicos.",
        stats: ["Unity", "Unreal", "VR / XR"],
      },
    },
    modePage: {
      overview: "Resumen",
      skills: "Stack principal",
      projects: "Espacios de proyectos",
      experience: "Experiencia",
      education: "Formación",
      reel: "Media / demo reel",
      cv: "CV",
      contact: "Contacto",
      placeholders: {
        project: "Detalles del proyecto próximamente",
        links: "Los enlaces se añadirán más adelante",
        cv: "Espacio reservado para CV descargable",
      },
    },
    shared: {
      aboutTitle: "Sobre Samuel",
      aboutBody:
        "Construyo software desde dos enfoques complementarios: sistemas backend con .NET y experiencias interactivas con motores de videojuegos. Este portfolio está organizado para que cada área pueda crecer con sus propios proyectos, notas y media.",
      contactBody:
        "Puedes contactarme por email o seguir mi trabajo en GitHub y LinkedIn mientras el portfolio crece con proyectos reales.",
    },
  },
} as const;

export const modeDetails = {
  dotnet: {
    icon: ServerCog,
    accentIcon: Database,
    color: "cyan",
    route: "/dotnet",
    skills: [
      { icon: Code2, label: "C# / .NET" },
      { icon: Braces, label: "REST APIs" },
      { icon: Database, label: "SQL Server" },
      { icon: Boxes, label: "Architecture" },
    ],
  },
  game: {
    icon: Gamepad2,
    accentIcon: Headset,
    color: "violet",
    route: "/game",
    skills: [
      { icon: Gamepad2, label: "Unity" },
      { icon: Cpu, label: "Unreal" },
      { icon: Headset, label: "VR / XR" },
      { icon: MonitorPlay, label: "Realtime UX" },
    ],
  },
} as const;

export const foundationSections = [
  { icon: Sparkles, key: "overview" },
  { icon: Layers3, key: "experience" },
  { icon: Globe2, key: "education" },
] as const;
