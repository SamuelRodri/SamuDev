import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const projectStatuses = read("src/projectStatuses.json");
const gameEngines = read("src/gameEngines.json");
const programmingLanguages = read("src/programmingLanguages.json");
const text = (v) => typeof v === "string" && v.trim().length > 0;
const media = (v) => text(v) && (/^https:\/\//.test(v) || /^\/(images|videos)\//.test(v)) && !v.includes("..");

function normalizeProject(project, kind) {
  const {
    publication = {}, media: mediaFields = {}, details = {}, links = {},
    spanish = {}, english = {}, ...base
  } = project;
  const localizedFields = kind === "games"
    ? ["summary", "caseStudyTitle", "description", "role", "development", "award"]
    : ["summary", "description", "role", "genre"];
  const localized = Object.fromEntries(localizedFields.map((field) => {
    const previousValue = base[field];
    return [field, typeof previousValue === "string"
      ? { es: previousValue, en: previousValue }
      : previousValue ?? { es: spanish[field], en: english[field] }];
  }));
  for (const field of localizedFields) delete base[field];
  const normalized = { ...base, ...publication, ...mediaFields, ...details, ...links, ...localized };
  if (kind === "games") for (const field of ["development", "award"]) {
    if (!text(normalized[field]?.es) && !text(normalized[field]?.en)) delete normalized[field];
  }
  if (kind === "games" && text(normalized.language)) normalized.language = [normalized.language];
  return normalized;
}

export function prepareContent(games, jams, settings) {
  games = games.map((project) => normalizeProject(project, "games"));
  jams = jams.map((project) => normalizeProject(project, "jams"));
  for (const [kind, entries] of [["games", games], ["jams", jams]]) {
    const slugs = new Set();
    const ids = new Set();
    for (const p of entries) {
      const fail = (field) => { throw new Error(`${kind}/${p.slug || "?"}: invalid ${field}`); };
      if (!text(p.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || p.slug === "jams" || slugs.has(p.slug)) fail("slug (must be unique)");
      slugs.add(p.slug);
      if (typeof p.published !== "boolean") fail("published");
      if (!text(p.title)) fail("title");
      if (p.engine && !gameEngines.includes(p.engine)) fail("engine (choose an available engine)");
      if (kind === "games" && p.language != null && (
        !Array.isArray(p.language)
        || !p.language.every((language) => programmingLanguages.includes(language))
        || new Set(p.language).size !== p.language.length
      )) fail("language (choose each available language at most once)");
      if (kind === "games" && p.status != null && !Object.hasOwn(projectStatuses, p.status)) fail("status");
      // Drafts may be incomplete and never enter the generated site data.
      if (!p.published) continue;
      if (kind === "games" && !Object.hasOwn(projectStatuses, p.status)) fail("status");
      for (const field of ["summary", "description", "role", ...(kind === "games" ? ["caseStudyTitle"] : ["genre"])]) {
        if (!["es", "en"].every((locale) => text(p[field]?.[locale]))) fail(`${field} (es/en)`);
      }
      if (kind === "games" && p.award && !["es", "en"].every((locale) => text(p.award[locale]))) fail("award (es/en)");
      if (kind === "games" && p.development && !["es", "en"].every((locale) => text(p.development[locale]))) fail("development (es/en)");
      for (const field of kind === "games" ? ["platform"] : ["jam", "engine", "itch"]) if (!text(p[field])) fail(field);
      if (kind === "games") {
        const id = p.id || p.slug;
        if (!text(id) || ids.has(id)) fail("id (must be unique)");
        ids.add(id);
      }
      if (!Number.isInteger(p.year) || p.year < 1900 || p.year > 2200) fail("year");
      if (!Array.isArray(p.tags) || !p.tags.every(text)) fail("tags");
      if (kind === "games" && typeof p.featured !== "boolean") fail("featured");
      if (!media(p.image)) fail("image");
      if (p.video && (!media(p.video) || !(/\.mp4(?:[?#]|$)/i.test(p.video) || /^https:\/\/(www\.)?youtube\.com\/watch\?/.test(p.video)))) fail("video (MP4 or YouTube watch URL)");
      for (const field of ["github", "itch"]) {
        if (p[field] && (!text(p[field]) || !/^https:\/\//.test(p[field]))) fail(field);
      }
      if (p.gallery && (!Array.isArray(p.gallery) || !p.gallery.every(media))) fail("gallery");
    }
  }
  const published = (entries, key) => {
    const order = settings[key] ?? [];
    if (!Array.isArray(order) || !order.every(text) || new Set(order).size !== order.length) {
      throw new Error(`${key}: select each project at most once`);
    }
    // Removed entries are harmless; new projects appear last until explicitly ordered.
    const rank = new Map(order.map((slug, index) => [slug, index]));
    return entries.filter((p) => p.published).sort((a, b) =>
      (rank.get(a.slug) ?? Infinity) - (rank.get(b.slug) ?? Infinity) || a.slug.localeCompare(b.slug));
  };
  return { games: published(games, "gameOrder").map((project) => ({ ...project, id: project.id || project.slug })), jams: published(jams, "jamOrder") };
}

export function generateContent() {
  const collection = (folder) => readdirSync(resolve(root, `content/${folder}`)).filter((file) => file.endsWith(".json")).map((file) => read(`content/${folder}/${file}`));
  const result = prepareContent(collection("games"), collection("jams"), read("content/settings.json"));
  mkdirSync(resolve(root, "src/generated"), { recursive: true });
  writeFileSync(resolve(root, "src/generated/projects.json"), JSON.stringify(result, null, 2) + "\n");
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = generateContent();
  console.log(`Content validated: ${result.games.length} games, ${result.jams.length} jams.`);
}
