import type { Locale } from "./content";

export type LocalizedText = Record<Locale, string>;
export type Navigate = (path: string) => void;

