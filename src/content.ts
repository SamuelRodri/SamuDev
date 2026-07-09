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
      body: "A bilingual space for backend systems, game development and interactive experiences. Choose the area you want to explore.",
      dotnetCta: "Enter .NET mode",
      gameCta: "Enter game mode",
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
        "Developer profile in progress. The structure is ready to evolve as real projects, links, media and case studies are added.",
      contactBody:
        "Contact channels will be added in the next pass. For now, the portfolio keeps the layout prepared for GitHub, LinkedIn, email and external showcases.",
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
      body: "Un espacio bilingüe para sistemas backend, videojuegos y experiencias interactivas. Elige el área que quieres explorar.",
      dotnetCta: "Entrar en modo .NET",
      gameCta: "Entrar en modo juegos",
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
        "Perfil de desarrollador en construcción. La estructura está lista para crecer con proyectos reales, enlaces, media y casos de estudio.",
      contactBody:
        "Los canales de contacto se añadirán en la siguiente pasada. Por ahora, el portfolio deja preparado el espacio para GitHub, LinkedIn, email y showcases externos.",
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
