import {
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  Gamepad2,
  GitBranch,
  Headset,
  MonitorPlay,
  ServerCog,
  ShieldCheck,
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
      featuredProject: {
        label: "Featured project",
        body: "Gameplay from the project currently taking the main spot in my GameDev portfolio.",
      },
      experience: "Experience",
      education: "Education",
      about: "About me",
      experienceIntro: "A first version of this section, ready to be replaced with exact roles, companies and dates.",
      educationIntro: "Training and learning paths related to this profile area.",
      experienceSection: {
        dotnet: {
          title: "Experience",
          intro: "Professional progression at Inerza, part of Grupo Inetel, from internship to .NET Developer.",
        },
        game: {
          title: "Practice and projects",
          intro: "Game development is presented here as training, practice and portfolio work, not as professional employment.",
        },
      },
      reel: "Media / demo reel",
      cv: "CV",
      contact: "Contact",
      availability: "Open to conversations and new ideas",
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
    aboutSection: {
      photoAlt: "Samuel Rodriguez looking through viewpoint binoculars over the ocean.",
      dotnet: {
        title: "Backend profile with an interactive side.",
        body: "I approach software development with a practical mindset: understand the problem, keep the codebase maintainable and build solutions that can evolve. In the .NET path, the focus is backend logic, APIs, Oracle-backed data flows and clean project structure.",
        highlights: ["Pragmatic backend development", "Readable and maintainable code", "Interest in tools, workflows and systems"],
      },
      game: {
        title: "Technical curiosity applied to play and interaction.",
        body: "My game development profile is currently built through training, prototypes and portfolio work. I am especially interested in how mechanics, input, feedback and spatial interaction come together in Unity, Unreal and VR/XR experiences.",
        highlights: ["Gameplay and interaction focus", "Prototype-driven learning", "Interest in VR/XR and real-time experiences"],
      },
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
    experienceItems: {
      dotnet: [
        {
          title: ".NET Developer",
          meta: "Inerza / Grupo Inetel · 2025 - Present",
          body: "Current role focused on .NET development, backend logic, application maintenance and collaboration on production software.",
          tags: ["C#", ".NET", "Oracle", "Backend"],
        },
        {
          title: "Junior .NET Developer",
          meta: "Inerza / Grupo Inetel · 2023 - 2025",
          body: "Progressed from the internship stage into a junior developer role, working on .NET codebases, data flows, issue resolution and incremental improvements.",
          tags: ["C#", ".NET", "Git", "Debugging"],
        },
        {
          title: "Software Development Intern",
          meta: "Inerza / Grupo Inetel · Jan 2023 - Aug 2023",
          body: "Internship period focused on learning the company's development workflow, supporting .NET projects and gaining practical experience in a professional environment.",
          tags: ["Internship", ".NET", "Learning", "Teamwork"],
        },
      ],
      game: [
        {
          title: "Game and interactive prototyping",
          meta: "Training and portfolio area",
          body: "Practice focused on mechanics, player input, quick iteration and playable ideas built with Unity or Unreal Engine.",
          tags: ["Unity", "Unreal", "Gameplay", "Prototyping"],
        },
        {
          title: "VR / XR interaction",
          meta: "Learning focus",
          body: "Exploration of immersive interfaces, spatial interaction, user guidance and real-time experience design.",
          tags: ["VR", "XR", "UX", "Realtime"],
        },
      ],
    },
    educationItems: {
      dotnet: [
        {
          title: "Degree in Computer Engineering",
          meta: "ULPGC / 2019-2023",
          body: "University training in software engineering, programming, databases, systems and computer science fundamentals.",
          tags: ["Software engineering", "Programming", "Databases", "Systems"],
        },
      ],
      game: [
        {
          title: "Master's Degree in Video Game Design and Development",
          meta: "UNIR / 2024-2026",
          body: "Specialized training in video game design, production, gameplay systems, real-time development and interactive experiences.",
          tags: ["Game design", "Game development", "Gameplay", "Production"],
        },
        {
          title: "Degree in Computer Engineering",
          meta: "ULPGC / 2019-2023",
          body: "University training in software engineering, programming, systems, computer graphics foundations and interactive technology fundamentals.",
          tags: ["Software engineering", "Programming", "Systems", "Interactive tech"],
        },
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
      featuredProject: {
        label: "Proyecto principal",
        body: "Gameplay del proyecto que ocupa actualmente el espacio principal de mi portfolio GameDev.",
      },
      experience: "Experiencia",
      education: "Formación",
      about: "Sobre mí",
      experienceIntro: "Primera versión de esta sección, preparada para sustituirse por cargos, empresas y fechas exactas.",
      educationIntro: "Formación y líneas de aprendizaje relacionadas con esta área del perfil.",
      experienceSection: {
        dotnet: {
          title: "Experiencia",
          intro: "Progresión profesional en Inerza, empresa del Grupo Inetel, desde prácticas hasta Programador .NET.",
        },
        game: {
          title: "Práctica y proyectos",
          intro: "El desarrollo de videojuegos se presenta aquí como formación, práctica y portfolio, no como experiencia profesional.",
        },
      },
      reel: "Media / demo reel",
      cv: "CV",
      contact: "Contacto",
      availability: "Disponible para conversar y explorar nuevas ideas",
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
    aboutSection: {
      photoAlt: "Samuel Rodriguez mirando por unos prismáticos en un mirador frente al océano.",
      dotnet: {
        title: "Perfil backend con una parte interactiva.",
        body: "Enfoco el desarrollo de software de forma práctica: entender el problema, mantener el código claro y construir soluciones que puedan evolucionar. En la rama .NET, el foco está en lógica backend, APIs, flujos de datos con Oracle y estructura de proyecto limpia.",
        highlights: ["Desarrollo backend pragmático", "Código legible y mantenible", "Interés por herramientas, flujos y sistemas"],
      },
      game: {
        title: "Curiosidad técnica aplicada al juego y la interacción.",
        body: "Mi perfil de desarrollo de videojuegos se está construyendo a través de formación, prototipos y portfolio. Me interesa especialmente cómo se combinan mecánicas, input, feedback e interacción espacial en experiencias con Unity, Unreal y VR/XR.",
        highlights: ["Foco en gameplay e interacción", "Aprendizaje mediante prototipos", "Interés en VR/XR y tiempo real"],
      },
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
    experienceItems: {
      dotnet: [
        {
          title: "Programador .NET",
          meta: "Inerza / Grupo Inetel · 2025 - Actualidad",
          body: "Rol actual centrado en desarrollo .NET, lógica backend, mantenimiento de aplicaciones y colaboración sobre software en producción.",
          tags: ["C#", ".NET", "Oracle", "Backend"],
        },
        {
          title: "Programador .NET Junior",
          meta: "Inerza / Grupo Inetel · 2023 - 2025",
          body: "Evolución desde la etapa de prácticas a un rol junior, trabajando en bases de código .NET, flujos de datos, resolución de incidencias y mejoras incrementales.",
          tags: ["C#", ".NET", "Git", "Debugging"],
        },
        {
          title: "Empleado en prácticas",
          meta: "Inerza / Grupo Inetel · Ene 2023 - Ago 2023",
          body: "Periodo de prácticas centrado en aprender el flujo de trabajo de la empresa, dar soporte a proyectos .NET y ganar experiencia práctica en un entorno profesional.",
          tags: ["Prácticas", ".NET", "Aprendizaje", "Equipo"],
        },
      ],
      game: [
        {
          title: "Prototipado de videojuegos e interacción",
          meta: "Área de formación y portfolio",
          body: "Práctica centrada en mecánicas, input del jugador, iteración rápida e ideas jugables construidas con Unity o Unreal Engine.",
          tags: ["Unity", "Unreal", "Gameplay", "Prototipado"],
        },
        {
          title: "Interacción VR / XR",
          meta: "Línea de aprendizaje",
          body: "Exploración de interfaces inmersivas, interacción espacial, guía de usuario y diseño de experiencias en tiempo real.",
          tags: ["VR", "XR", "UX", "Tiempo real"],
        },
      ],
    },
    educationItems: {
      dotnet: [
        {
          title: "Grado en Ingeniería Informática",
          meta: "ULPGC / 2019-2023",
          body: "Formación universitaria en ingeniería del software, programación, bases de datos, sistemas y fundamentos de informática.",
          tags: ["Ingeniería software", "Programación", "Bases de datos", "Sistemas"],
        },
      ],
      game: [
        {
          title: "Máster en Diseño y Desarrollo de Videojuegos",
          meta: "UNIR / 2024-2026",
          body: "Formación especializada en diseño de videojuegos, producción, sistemas de gameplay, desarrollo en tiempo real y experiencias interactivas.",
          tags: ["Game design", "Desarrollo", "Gameplay", "Producción"],
        },
        {
          title: "Grado en Ingeniería Informática",
          meta: "ULPGC / 2019-2023",
          body: "Formación universitaria en ingeniería del software, programación, sistemas, bases de gráficos por computador y fundamentos de tecnología interactiva.",
          tags: ["Ingeniería software", "Programación", "Sistemas", "Tecnología interactiva"],
        },
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
