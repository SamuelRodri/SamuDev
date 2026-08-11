import type { Locale } from "./content";

type LocalizedText = Record<Locale, string>;

export type GameJamProject = {
  title: string;
  jam: string;
  year: number;
  engine: string;
  genre: LocalizedText;
  summary: LocalizedText;
  tags: string[];
  image: string;
  itch: string;
};

export const gameJamProjects: GameJamProject[] = [
  {
    title: "Let's Make Spaghetti",
    jam: "Level Up Game Jam 2025",
    year: 2025,
    engine: "Godot",
    genre: { en: "Puzzle", es: "Puzles" },
    summary: {
      en: "Prepare a plate of spaghetti in 120 seconds using the most absurd utensils possible.",
      es: "Prepara un plato de espaguetis en 120 segundos usando los utensilios más absurdos posibles.",
    },
    tags: ["Godot", "Pixel Art", "Cooking"],
    image: "https://img.itch.zone/aW1nLzIyMTIwOTIxLnBuZw==/508x254%23mb/pl3K81.png",
    itch: "https://awereplays.itch.io/lets-make-spagu",
  },
  {
    title: "Feline Fashion Frenzy",
    jam: "Gran Canaria Game Island I",
    year: 2023,
    engine: "Unity",
    genre: { en: "Action / Stealth", es: "Acción / Sigilo" },
    summary: {
      en: "Change disguises and outsmart the mouse police to recover Frenzy's stolen ball of wool.",
      es: "Cambia de disfraz y burla a la policía ratón para recuperar el ovillo robado de Frenzy.",
    },
    tags: ["Unity", "2D", "Stealth", "Team project"],
    image: "https://img.itch.zone/aW1nLzExODgwNTQxLnBuZw==/508x254%23mb/xEmytP.png",
    itch: "https://thebestjamteamever.itch.io/feline-fashion-frenzy",
  },
  {
    title: "Monster Express",
    jam: "Gran Canaria Game Island Jam 3",
    year: 2024,
    engine: "Unity",
    genre: { en: "Arcade", es: "Arcade" },
    summary: {
      en: "Collect falling dough, avoid troublesome spiders and build three monsters before time runs out.",
      es: "Recoge la masa que cae, esquiva a las arañas y construye tres monstruos antes de que acabe el tiempo.",
    },
    tags: ["Unity", "HTML5", "Team project"],
    image: "https://img.itch.zone/aW1nLzE2OTE3NzY0LnBuZw==/508x254%23mb/pvBL8M.png",
    itch: "https://yamizs.itch.io/monster-express",
  },
];
