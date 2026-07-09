import {
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  Gamepad2,
  GitBranch,
  Globe2,
  Headset,
  Layers3,
  MonitorPlay,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
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
        body: "Backend-focused work with C#, .NET, Oracle and cloud-ready services. This mode will collect projects, case studies and engineering notes.",
        stats: ["C# / .NET", "APIs", "Databases"],
      },
      game: {
        label: "Game Developer",
        title: "Gameplay systems, prototypes and interactive experiences.",
        body: "Unity, Unreal and VR/XR work focused on mechanics, interaction and real-time prototypes. This mode will grow with gameplay clips, demos and technical notes.",
        stats: ["Unity", "Unreal", "VR / XR"],
      },
    },
    modePage: {
      overview: "Overview",
      skills: "Core stack",
      focus: "Technical focus",
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
      signal: {
        dotnet: "SYSTEMS ONLINE",
        game: "WORLD READY",
      },
    },
    shared: {
      aboutTitle: "About Samuel",
      aboutBody:
        "I build software from two complementary angles: backend systems with .NET and interactive experiences with game engines. This portfolio is organized so each area can grow with its own projects, notes and media.",
      contactBody:
        "You can reach me by email or follow my work through GitHub and LinkedIn while the project showcase grows.",
    },
    projectSlots: {
      dotnet: [
        {
          title: "Backend API",
          body: "Space reserved for a C#/.NET API project with endpoints, persistence, validation and deployment notes.",
        },
        {
          title: "Data-driven service",
          body: "A future case study for Oracle, data modelling, business rules and maintainable backend logic.",
        },
        {
          title: "Cloud-ready system",
          body: "A slot for an architecture-oriented project: authentication, configuration, monitoring or CI/CD.",
        },
      ],
      game: [
        {
          title: "Gameplay prototype",
          body: "Space reserved for a Unity or Unreal prototype with mechanics, controls, iteration notes and media.",
        },
        {
          title: "VR / XR experience",
          body: "A future case study for immersive interaction, player guidance, spatial UI or simulation-oriented scenes.",
        },
        {
          title: "Technical breakdown",
          body: "A slot for documenting engine-side systems, implementation decisions, performance notes or lessons learned.",
        },
      ],
    },
    focusItems: {
      dotnet: [
        "API design and backend workflows",
        "Oracle and relational data modelling",
        "Maintainable C# codebases",
        "Deployment-ready project structure",
      ],
      game: [
        "Gameplay mechanics and player input",
        "Unity and Unreal prototyping",
        "VR / XR interaction patterns",
        "Technical notes, clips and demos",
      ],
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
        body: "Trabajo orientado a backend con C#, .NET, Oracle y servicios preparados para cloud. Este modo reunirá proyectos, casos de estudio y notas técnicas.",
        stats: ["C# / .NET", "APIs", "Bases de datos"],
      },
      game: {
        label: "Game Developer",
        title: "Sistemas de gameplay, prototipos y experiencias interactivas.",
        body: "Trabajo con Unity, Unreal y VR/XR centrado en mecánicas, interacción y prototipos en tiempo real. Este modo crecerá con clips, demos y notas técnicas.",
        stats: ["Unity", "Unreal", "VR / XR"],
      },
    },
    modePage: {
      overview: "Resumen",
      skills: "Stack principal",
      focus: "Foco técnico",
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
      signal: {
        dotnet: "SISTEMAS LISTOS",
        game: "MUNDO LISTO",
      },
    },
    shared: {
      aboutTitle: "Sobre Samuel",
      aboutBody:
        "Construyo software desde dos enfoques complementarios: sistemas backend con .NET y experiencias interactivas con motores de videojuegos. Este portfolio está organizado para que cada área pueda crecer con sus propios proyectos, notas y media.",
      contactBody:
        "Puedes contactarme por email o seguir mi trabajo en GitHub y LinkedIn mientras el portfolio crece con proyectos reales.",
    },
    projectSlots: {
      dotnet: [
        {
          title: "API backend",
          body: "Espacio reservado para un proyecto de API en C#/.NET con endpoints, persistencia, validación y notas de despliegue.",
        },
        {
          title: "Servicio orientado a datos",
          body: "Futuro caso de estudio para Oracle, modelado de datos, reglas de negocio y lógica backend mantenible.",
        },
        {
          title: "Sistema preparado para cloud",
          body: "Un espacio para un proyecto de arquitectura: autenticación, configuración, monitorización o CI/CD.",
        },
      ],
      game: [
        {
          title: "Prototipo jugable",
          body: "Espacio reservado para un prototipo en Unity o Unreal con mecánicas, controles, notas de iteración y media.",
        },
        {
          title: "Experiencia VR / XR",
          body: "Futuro caso de estudio sobre interacción inmersiva, guía de usuario, UI espacial o escenas orientadas a simulación.",
        },
        {
          title: "Desglose técnico",
          body: "Un espacio para documentar sistemas dentro del motor, decisiones de implementación, rendimiento o aprendizajes.",
        },
      ],
    },
    focusItems: {
      dotnet: [
        "Diseño de APIs y flujos backend",
        "Oracle y modelado relacional",
        "Bases de código C# mantenibles",
        "Estructura preparada para despliegue",
      ],
      game: [
        "Mecánicas de gameplay e input",
        "Prototipado en Unity y Unreal",
        "Patrones de interacción VR / XR",
        "Notas técnicas, clips y demos",
      ],
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
      { icon: Code2, label: { en: "C# / .NET", es: "C# / .NET" } },
      { icon: Braces, label: { en: "ASP.NET Core APIs", es: "APIs ASP.NET Core" } },
      { icon: Database, label: { en: "Oracle", es: "Oracle" } },
      { icon: GitBranch, label: { en: "Git / CI", es: "Git / CI" } },
      { icon: ShieldCheck, label: { en: "Clean code", es: "Código limpio" } },
      { icon: Workflow, label: { en: "Backend logic", es: "Lógica backend" } },
    ],
  },
  game: {
    icon: Gamepad2,
    accentIcon: Headset,
    color: "violet",
    route: "/game",
    skills: [
      { icon: Gamepad2, label: { en: "Unity", es: "Unity" } },
      { icon: Cpu, label: { en: "Unreal Engine", es: "Unreal Engine" } },
      { icon: Headset, label: { en: "VR / XR", es: "VR / XR" } },
      { icon: MonitorPlay, label: { en: "Interactive UX", es: "UX interactiva" } },
      { icon: Boxes, label: { en: "Gameplay systems", es: "Sistemas de gameplay" } },
      { icon: Workflow, label: { en: "Prototyping", es: "Prototipado" } },
    ],
  },
} as const;

export const foundationSections = [
  { icon: Sparkles, key: "overview" },
  { icon: Layers3, key: "experience" },
  { icon: Globe2, key: "education" },
] as const;
