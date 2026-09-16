import type { Locale } from "./content";
import type { LocalizedText } from "./types";

export type GameJamProject = {
  slug: string;
  title: string;
  jam: string;
  year: number;
  engine: string;
  genre: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  tags: string[];
  image: string;
  itch: string;
};

export const gameJamProjects: GameJamProject[] = [
  {
    slug: "lets-make-spaghetti",
    title: "Let's Make Spaghetti",
    jam: "Level Up Game Jam 2025",
    year: 2025,
    engine: "Godot",
    genre: { en: "Puzzle", es: "Puzles" },
    summary: {
      en: "Prepare a plate of spaghetti in 120 seconds using the most absurd utensils possible.",
      es: "Prepara un plato de espaguetis en 120 segundos usando los utensilios más absurdos posibles.",
    },
    description: {
      en: "A fast-paced cooking puzzle created during the Level Up Game Jam 2025. The challenge was to turn a deliberately chaotic set of utensils and interactions into a short, readable and entertaining experience under the constraints of a game jam.",
      es: "Un puzle de cocina contrarreloj creado durante la Level Up Game Jam 2025. El reto consistió en convertir un conjunto deliberadamente caótico de utensilios e interacciones en una experiencia corta, clara y entretenida dentro de las limitaciones de una game jam.",
    },
    role: { en: "Team member", es: "Miembro del equipo" },
    tags: ["Godot", "Pixel Art", "Cooking"],
    image: "https://img.itch.zone/aW1nLzIyMTIwOTIxLnBuZw==/508x254%23mb/pl3K81.png",
    itch: "https://awereplays.itch.io/lets-make-spagu",
  },
  {
    slug: "feline-fashion-frenzy",
    title: "Feline Fashion Frenzy",
    jam: "Gran Canaria Game Island I",
    year: 2023,
    engine: "Unity",
    genre: { en: "Action / Stealth", es: "Acción / Sigilo" },
    summary: {
      en: "Change disguises and outsmart the mouse police to recover Frenzy's stolen ball of wool.",
      es: "Cambia de disfraz y burla a la policía ratón para recuperar el ovillo robado de Frenzy.",
    },
    description: {
      en: "A 2D action and stealth game made as a team for Gran Canaria Game Island I. Its central mechanic combines disguises, evasion and quick decisions as Frenzy tries to recover a stolen ball of wool.",
      es: "Un juego 2D de acción y sigilo creado en equipo para Gran Canaria Game Island I. Su mecánica central combina disfraces, evasión y decisiones rápidas mientras Frenzy intenta recuperar su ovillo robado.",
    },
    role: { en: "Team member", es: "Miembro del equipo" },
    tags: ["Unity", "2D", "Stealth", "Team project"],
    image: "https://img.itch.zone/aW1nLzExODgwNTQxLnBuZw==/508x254%23mb/xEmytP.png",
    itch: "https://thebestjamteamever.itch.io/feline-fashion-frenzy",
  },
  {
    slug: "monster-express",
    title: "Monster Express",
    jam: "Gran Canaria Game Island Jam 3",
    year: 2024,
    engine: "Unity",
    genre: { en: "Arcade", es: "Arcade" },
    summary: {
      en: "Collect falling dough, avoid troublesome spiders and build three monsters before time runs out.",
      es: "Recoge la masa que cae, esquiva a las arañas y construye tres monstruos antes de que acabe el tiempo.",
    },
    description: {
      en: "An arcade game developed as a team during Gran Canaria Game Island Jam 3. Players must collect ingredients, avoid hazards and assemble three monsters against the clock in a compact browser experience.",
      es: "Un juego arcade desarrollado en equipo durante la Gran Canaria Game Island Jam 3. El jugador debe recoger ingredientes, evitar peligros y montar tres monstruos contrarreloj en una experiencia compacta para navegador.",
    },
    role: { en: "Team member", es: "Miembro del equipo" },
    tags: ["Unity", "HTML5", "Team project"],
    image: "https://img.itch.zone/aW1nLzE2OTE3NzY0LnBuZw==/508x254%23mb/pvBL8M.png",
    itch: "https://yamizs.itch.io/monster-express",
  },
];
