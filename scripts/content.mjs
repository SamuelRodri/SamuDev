import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const text = (v) => typeof v === "string" && v.trim().length > 0;
const media = (v) => text(v) && (/^https:\/\//.test(v) || /^\/(images|videos)\//.test(v)) && !v.includes("..");

export function prepareContent(games, jams, settings) {
  for (const [kind, entries] of [["games", games], ["jams", jams]]) {
    const slugs = new Set();
    const ids = new Set();
    for (const p of entries) {
      const fail = (field) => { throw new Error(`${kind}/${p.slug || "?"}: invalid ${field}`); };
      if (!text(p.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || p.slug === "jams" || slugs.has(p.slug)) fail("slug (must be unique)");
      slugs.add(p.slug);
      if (typeof p.published !== "boolean") fail("published");
      if (!Number.isFinite(p.order)) fail("order");
      if (!text(p.title)) fail("title");
      // Drafts may be incomplete and never enter the generated site data.
      if (!p.published) continue;
      for (const field of ["summary", "description", "role", ...(kind === "games" ? ["status", "caseStudyTitle"] : ["genre"])]) {
        if (!["es", "en"].every((locale) => text(p[field]?.[locale]))) fail(`${field} (es/en)`);
      }
      for (const field of kind === "games" ? ["id", "platform"] : ["jam", "engine", "itch"]) if (!text(p[field])) fail(field);
      if (kind === "games") {
        if (ids.has(p.id)) fail("id (must be unique)");
        ids.add(p.id);
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
  if (settings.featuredGame && !games.some((p) => p.slug === settings.featuredGame)) throw new Error("Selected featured game does not exist; clear or update it in settings first.");
  const published = (entries) => entries.filter((p) => p.published).sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
  return { games: published(games), jams: published(jams), featuredGame: settings.featuredGame || "" };
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
