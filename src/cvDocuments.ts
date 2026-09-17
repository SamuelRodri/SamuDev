import type { Locale } from "./content";

type CvDocument = {
  available: boolean;
  fileName: string;
  path: string;
};

export const cvDocuments: Record<Locale, CvDocument> = {
  es: {
    available: false,
    fileName: "CV-Samuel-Rodriguez-ES.pdf",
    path: "cv/CV-Samuel-Rodriguez-ES.pdf",
  },
  en: {
    available: false,
    fileName: "CV-Samuel-Rodriguez-EN.pdf",
    path: "cv/CV-Samuel-Rodriguez-EN.pdf",
  },
};

export const cvUrl = (locale: Locale) => `${import.meta.env.BASE_URL}${cvDocuments[locale].path}`;
