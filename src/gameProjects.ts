import type { Locale } from "./content";

type LocalizedText = Record<Locale, string>;

export type GameProject = {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  engine: string;
  language: string;
  year: number;
  platform: string;
  status: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  caseStudyTitle: LocalizedText;
  role: LocalizedText;
  tags: string[];
  image: string;
  video?: string;
  github?: string;
  award?: string;
  sourceUrl: string;
};

export const gameProjects: GameProject[] = [
  {
    id: "W3LaGTNAzZ901JWaAAD7",
    slug: "columna-vertebral-vr",
    featured: false,
    title: "Columna Vertebral VR",
    engine: "Unity",
    language: "C#",
    year: 2023,
    platform: "Meta Quest 2",
    status: { en: "Completed", es: "Terminado" },
    summary: {
      en: "A virtual reality application for physiotherapy students to study the human spine.",
      es: "Aplicación de realidad virtual para que estudiantes de Fisioterapia estudien la columna vertebral.",
    },
    description: {
      en: "A virtual reality application created for physiotherapy students to explore and study the human spine in an immersive environment. It was developed as a Computer Engineering final project at the University of Las Palmas de Gran Canaria, in collaboration with the School of Physiotherapy.",
      es: "Aplicación de realidad virtual creada para que estudiantes del grado de Fisioterapia puedan explorar y estudiar la columna vertebral en un entorno inmersivo. Fue desarrollada como TFG de Ingeniería Informática en la Universidad de Las Palmas de Gran Canaria, en colaboración con la Escuela de Fisioterapia.",
    },
    caseStudyTitle: { en: "Immersive learning applied to anatomy.", es: "Aprendizaje inmersivo aplicado a la anatomía." },
    role: { en: "Solo developer · Computer Engineering final project", es: "Solo developer · TFG de Ingeniería Informática" },
    tags: ["VR", "Unity", "C#", "Healthcare"],
    image: "https://res.cloudinary.com/djcd2rpvx/image/upload/v1772475471/projects/W3LaGTNAzZ901JWaAAD7/images/vertebral-column-vr_alrcnl.jpg",
    video: "https://www.youtube.com/watch?v=BTNumYcCQ3U&t=7s",
    award: "Premio Accésit Cátedra Telefónica a la Innovación Educativa",
    sourceUrl: "https://samuelrodri.github.io/SamuDev/project/W3LaGTNAzZ901JWaAAD7",
  },
  {
    id: "dTNNhEe8uRbJWdIllmrp",
    slug: "factory-metroidvania",
    featured: false,
    title: "Factory Metroidvania",
    engine: "Unreal Engine",
    language: "Blueprints",
    year: 2025,
    platform: "PC",
    status: { en: "Prototype", es: "Prototipo" },
    summary: {
      en: "Escape a burning factory by finding new abilities and opening the path to previously unreachable areas.",
      es: "Escapa de una fábrica en llamas adquiriendo habilidades que permiten acceder a nuevas zonas.",
    },
    description: {
      en: "A small metroidvania prototype developed in Unreal Engine as part of the Master's Degree in Video Game Design and Development. The player controls a robot trapped inside a burning factory and must find the emergency exit key. Power-ups unlock new areas, while enemy turrets can be destroyed with ranged attacks or avoided.",
      es: "Pequeño prototipo de metroidvania desarrollado en Unreal Engine como trabajo del Máster en Diseño y Desarrollo de Videojuegos. El jugador controla un robot atrapado en una fábrica en llamas y debe encontrar la llave de la salida de emergencia. Los power-ups permiten acceder a nuevas zonas, mientras que las torretas enemigas pueden destruirse con disparos o evitarse.",
    },
    caseStudyTitle: { en: "Abilities turn the factory into an interconnected challenge.", es: "Habilidades que convierten la fábrica en un desafío interconectado." },
    role: { en: "Solo developer · Master's project", es: "Solo developer · Proyecto de máster" },
    tags: ["Unreal Engine", "Blueprints", "Metroidvania", "Gameplay"],
    image: "https://res.cloudinary.com/djcd2rpvx/image/upload/v1780768138/projects/dTNNhEe8uRbJWdIllmrp/images/metroidvania-unreal_rqhvd1.png",
    video: "https://www.youtube.com/watch?v=FS5Cg6a4TqY",
    github: "https://github.com/SamuelRodri/Plataformas-Unreal",
    sourceUrl: "https://samuelrodri.github.io/SamuDev/project/dTNNhEe8uRbJWdIllmrp",
  },
  {
    id: "u5OyDzwJBZa9pB0gZ1nI",
    slug: "proyecto-van-damme",
    featured: false,
    title: "Proyecto Van Damme",
    engine: "Unity",
    language: "C#",
    year: 2025,
    platform: "PC",
    status: { en: "In development", es: "En desarrollo" },
    summary: {
      en: "A strategy and card-combat game where countries can be merged and divided to reshape the map.",
      es: "Videojuego de estrategia y combate con cartas en el que puedes fusionar y dividir países para alterar el mapa.",
    },
    description: {
      en: "Strategy drives every decision: players reshape geography by merging and dividing countries, while a dynamic card-combat system determines conquests and defeats. Territories are generated procedurally from GeoJSON data. The codebase uses the Command pattern for player actions, an Event Bus for communication between systems and VContainer for dependency injection.",
      es: "La estrategia guía cada decisión: el jugador puede modificar la geografía fusionando y dividiendo países, mientras un sistema dinámico de combate con cartas decide las conquistas y derrotas. Los territorios se generan proceduralmente desde datos GeoJSON. La arquitectura utiliza el patrón Command para las acciones, un Event Bus para comunicar sistemas y VContainer para la inyección de dependencias.",
    },
    caseStudyTitle: { en: "Reshaping geography through systems-driven strategy.", es: "Transformar la geografía mediante estrategia y sistemas." },
    role: { en: "Solo developer", es: "Solo developer" },
    tags: ["Unity", "C#", "Strategy", "GeoJSON", "Event Bus", "VContainer"],
    image: "https://res.cloudinary.com/djcd2rpvx/image/upload/v1773249721/projects/u5OyDzwJBZa9pB0gZ1nI/images/D2_SistemaBotones_yivtfd.png",
    video: "https://www.youtube.com/watch?v=CblftVzAZXE",
    sourceUrl: "https://samuelrodri.github.io/SamuDev/project/u5OyDzwJBZa9pB0gZ1nI",
  },
];
