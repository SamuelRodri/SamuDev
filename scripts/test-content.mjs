import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { prepareContent, generateContent } from "./content.mjs";

const actual = generateContent();
assert.ok(actual.games.every((p) => p.published));
assert.ok(actual.jams.every((p) => p.published));
const translated = { es: "Texto", en: "Text" };
const game = { id: "test", slug: "test", title: "Test", published: true,
  year: 2026, platform: "PC", featured: true, image: "/images/test.png", tags: [],
  summary: translated, description: translated, role: translated, status: "prototype", caseStudyTitle: translated };
const other = { ...game, id: "other", slug: "other" };
const draft = { title: "Private draft marker", slug: "draft", published: false };
const result = prepareContent([game, other, draft], actual.jams, { gameOrder: [other.slug, game.slug] });
assert.equal(result.games[0].slug, "other");
assert.ok(!JSON.stringify(result).includes(draft.title));
assert.equal(prepareContent([draft], [], {}).games.length, 0);
assert.throws(() => prepareContent([game, game], [], {}), /slug/);
assert.throws(() => prepareContent([game, { ...other, id: game.id }], [], {}), /id/);
assert.equal(prepareContent([{ ...game, id: undefined }], [], {}).games[0].id, game.slug);
assert.throws(() => prepareContent([{ ...game, summary: { en: "Missing Spanish" } }], [], {}), /summary/);
assert.throws(() => prepareContent([{ ...game, image: "javascript:alert(1)" }], [], {}), /image/);
assert.throws(() => prepareContent([{ ...game, itch: "javascript:alert(1)" }], [], {}), /itch/);
assert.equal(Object.hasOwn(prepareContent([], [], {}), "featuredGame"), false);
const config = JSON.parse(readFileSync(new URL("../.pages.yml", import.meta.url), "utf8"));
assert.deepEqual(config.content.map((item) => item.name), ["games", "jams", "settings"]);
assert.deepEqual(config.actions?.map((action) => action.name), ["publish-portfolio"]);
assert.equal(config.actions[0].workflow, "deploy.yml");
assert.deepEqual(config.content.find((item) => item.name === "settings").fields.map((field) => field.name), ["gameOrder", "jamOrder"]);
for (const collection of config.content.filter((item) => item.type === "collection")) {
  assert.equal(collection.fields.find((item) => item.name === "publication").fields.find((item) => item.name === "published").default, false);
  assert.deepEqual(collection.fields.slice(1, 7).map((field) => field.name),
    ["publication", "media", "spanish", "english", "details", "links"]);
}
console.log("Content checks passed: migration, sorting, drafts, validation and CMS configuration.");

const statuses = JSON.parse(readFileSync(new URL('../src/projectStatuses.json', import.meta.url), 'utf8'));
for (const status of Object.keys(statuses)) assert.equal(prepareContent([{ ...game, status }], [], {}).games[0].status, status);
for (const status of ['custom', '', null, { es: 'Prototipo', en: 'Prototype' }]) assert.throws(() => prepareContent([{ ...game, status }], [], {}), /status/);
assert.deepEqual(config.content[0].fields.find((field) => field.name === 'publication').fields.find((field) => field.name === 'status').options.values, Object.entries(statuses).map(([name, label]) => ({ name, label: label.es })));
const engines = JSON.parse(readFileSync(new URL('../src/gameEngines.json', import.meta.url), 'utf8'));
for (const engine of engines) assert.equal(prepareContent([{ ...game, engine }], [], {}).games[0].engine, engine);
assert.throws(() => prepareContent([{ ...game, engine: 'Unknown engine' }], [], {}), /engine/);
for (const collection of config.content.filter((entry) => entry.type === 'collection')) {
  const engine = collection.fields.find((field) => field.name === 'details').fields.find((field) => field.name === 'engine');
  assert.equal(engine.type, 'select');
  assert.deepEqual(engine.options.values, engines);
}
const languages = JSON.parse(readFileSync(new URL('../src/programmingLanguages.json', import.meta.url), 'utf8'));
assert.deepEqual(prepareContent([{ ...game, language: languages }], [], {}).games[0].language, languages);
assert.deepEqual(prepareContent([{ ...game, language: 'C#' }], [], {}).games[0].language, ['C#']);
assert.throws(() => prepareContent([{ ...game, language: ['Java'] }], [], {}), /language/);
assert.throws(() => prepareContent([{ ...game, language: ['C#', 'C#'] }], [], {}), /language/);
const languageField = config.content[0].fields.find((field) => field.name === 'details').fields.find((field) => field.name === 'language');
assert.equal(languageField.type, 'select');
assert.equal(languageField.options.multiple, true);
assert.deepEqual(languageField.options.values, languages);

const nestedGame = {
  title: game.title, slug: game.slug, id: game.id,
  publication: { status: game.status, published: true, featured: true },
  media: { image: game.image },
  spanish: { summary: translated.es, caseStudyTitle: translated.es, description: translated.es, role: translated.es },
  english: { summary: translated.en, caseStudyTitle: translated.en, description: translated.en, role: translated.en },
  details: { year: game.year, platform: game.platform, tags: [] },
  links: {},
};
assert.deepEqual(prepareContent([nestedGame], [], {}).games[0].summary, translated);
const localizedAward = prepareContent([{ ...nestedGame, spanish: { ...nestedGame.spanish, award: "Premio" }, english: { ...nestedGame.english, award: "Award" } }], [], {}).games[0].award;
assert.deepEqual(localizedAward, { es: "Premio", en: "Award" });
assert.throws(() => prepareContent([{ ...nestedGame, spanish: { ...nestedGame.spanish, award: "Premio" } }], [], {}), /award \(es\/en\)/);
const localizedDevelopment = prepareContent([{ ...nestedGame, spanish: { ...nestedGame.spanish, development: "Aprendizaje" }, english: { ...nestedGame.english, development: "Learning" } }], [], {}).games[0].development;
assert.deepEqual(localizedDevelopment, { es: "Aprendizaje", en: "Learning" });
assert.throws(() => prepareContent([{ ...nestedGame, spanish: { ...nestedGame.spanish, development: "Aprendizaje" } }], [], {}), /development \(es\/en\)/);
assert.deepEqual(prepareContent([{ ...game, award: "Legacy award" }], [], {}).games[0].award, { es: "Legacy award", en: "Legacy award" });
const gameFields = config.content.find((entry) => entry.name === "games").fields;
assert.ok(gameFields.find((field) => field.name === "spanish").fields.some((field) => field.name === "award"));
assert.ok(gameFields.find((field) => field.name === "english").fields.some((field) => field.name === "award"));
assert.ok(gameFields.find((field) => field.name === "spanish").fields.some((field) => field.name === "development"));
assert.ok(gameFields.find((field) => field.name === "english").fields.some((field) => field.name === "development"));
assert.ok(!gameFields.find((field) => field.name === "links").fields.some((field) => field.name === "award"));

assert.deepEqual(prepareContent([other, game], [], {gameOrder: [game.slug, other.slug]}).games.map(p=>p.slug), [game.slug,other.slug]);
assert.deepEqual(prepareContent([other, game], [], {gameOrder: [game.slug]}).games.map(p=>p.slug), [game.slug,other.slug]);
assert.throws(()=>prepareContent([game],[],{gameOrder:[game.slug,game.slug]}),/gameOrder/);
assert.throws(()=>prepareContent([],[],{jamOrder:'wrong'}),/jamOrder/);
assert.equal(prepareContent([game],[],{gameOrder:['deleted',game.slug]}).games[0].slug,game.slug);
const orderedFeatured = prepareContent([{ ...other, featured: false }, game], [], { gameOrder: [other.slug, game.slug] }).games;
assert.equal(orderedFeatured.find((project) => project.featured)?.slug, game.slug);
