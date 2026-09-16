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
const result = prepareContent([game, other, draft], actual.jams, { featuredGame: game.slug, gameOrder: [other.slug, game.slug] });
assert.equal(result.games[0].slug, "other");
assert.ok(!JSON.stringify(result).includes(draft.title));
assert.equal(prepareContent([draft], [], { featuredGame: "draft" }).games.length, 0);
assert.throws(() => prepareContent([game, game], [], {}), /slug/);
assert.throws(() => prepareContent([game, { ...other, id: game.id }], [], {}), /id/);
assert.equal(prepareContent([{ ...game, id: undefined }], [], {}).games[0].id, game.slug);
assert.throws(() => prepareContent([{ ...game, summary: { en: "Missing Spanish" } }], [], {}), /summary/);
assert.throws(() => prepareContent([{ ...game, image: "javascript:alert(1)" }], [], {}), /image/);
assert.throws(() => prepareContent([{ ...game, itch: "javascript:alert(1)" }], [], {}), /itch/);
assert.throws(() => prepareContent([game], [], { featuredGame: "missing" }), /does not exist/);
assert.equal(prepareContent([], [], {}).featuredGame, "");
const config = JSON.parse(readFileSync(new URL("../.pages.yml", import.meta.url), "utf8"));
assert.deepEqual(config.content.map((item) => item.name), ["games", "jams", "settings"]);
for (const collection of config.content.filter((item) => item.type === "collection")) {
  assert.equal(collection.fields.find((item) => item.name === "published").default, false);
}
console.log("Content checks passed: migration, sorting, drafts, validation and CMS configuration.");

const statuses = JSON.parse(readFileSync(new URL('../src/projectStatuses.json', import.meta.url), 'utf8'));
for (const status of Object.keys(statuses)) assert.equal(prepareContent([{ ...game, status }], [], {}).games[0].status, status);
for (const status of ['custom', '', null, { es: 'Prototipo', en: 'Prototype' }]) assert.throws(() => prepareContent([{ ...game, status }], [], {}), /status/);
assert.deepEqual(config.content[0].fields.find((field) => field.name === 'status').options.values, Object.entries(statuses).map(([name, label]) => ({ name, label: label.es })));
const engines = JSON.parse(readFileSync(new URL('../src/gameEngines.json', import.meta.url), 'utf8'));
for (const engine of engines) assert.equal(prepareContent([{ ...game, engine }], [], {}).games[0].engine, engine);
assert.throws(() => prepareContent([{ ...game, engine: 'Unknown engine' }], [], {}), /engine/);
for (const collection of config.content.filter((entry) => entry.type === 'collection')) {
  const engine = collection.fields.find((field) => field.name === 'engine');
  assert.equal(engine.type, 'select');
  assert.deepEqual(engine.options.values, engines);
}

assert.deepEqual(prepareContent([other, game], [], {gameOrder: [game.slug, other.slug]}).games.map(p=>p.slug), [game.slug,other.slug]);
assert.deepEqual(prepareContent([other, game], [], {gameOrder: [game.slug]}).games.map(p=>p.slug), [game.slug,other.slug]);
assert.throws(()=>prepareContent([game],[],{gameOrder:[game.slug,game.slug]}),/gameOrder/);
assert.throws(()=>prepareContent([],[],{jamOrder:'wrong'}),/jamOrder/);
assert.equal(prepareContent([game],[],{gameOrder:['deleted',game.slug]}).games[0].slug,game.slug);
