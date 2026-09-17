import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = readFileSync(new URL("../src/routing.ts", import.meta.url), "utf8");
for (const base of ["/SamuDev/", "/"]) {
  const { outputText } = ts.transpileModule(source.replace("import.meta.env.BASE_URL", JSON.stringify(base)), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  const routing = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  const prefix = base.replace(/\/$/, "");
  for (const locale of ["es", "en"]) {
    for (const path of ["/", "/dotnet", "/game", "/game/projects", "/game/projects/unity", "/game/projects/unreal-engine", "/game/projects/synastra", "/game/projects/jams/unity", "/game/projects/jams/godot", "/game/projects/jams/monster-express"]) {
      const url = routing.localizedPath(path, locale);
      assert.deepEqual(routing.parseRoute(url.slice(prefix.length)), { locale, path, search: "", hash: "" });
    }
  }
  assert.equal(routing.engineFromProjectsPath("/game/projects/unity"), "Unity");
  assert.equal(routing.engineFromProjectsPath("/game/projects/unreal-engine"), "Unreal Engine");
  assert.equal(routing.engineFromProjectsPath("/game/projects/synastra"), undefined);
  assert.equal(routing.gameProjectsByEnginePath("Godot"), "/game/projects/godot");
  assert.equal(routing.engineFromGameJamsPath("/game/projects/jams/unity"), "Unity");
  assert.equal(routing.engineFromGameJamsPath("/game/projects/jams/godot"), "Godot");
  assert.equal(routing.engineFromGameJamsPath("/game/projects/jams/monster-express"), undefined);
  assert.equal(routing.gameJamsByEnginePath("Unreal Engine"), "/game/projects/jams/unreal-engine");
  let location = new URL(`https://example.com${prefix}/?path=${encodeURIComponent("/es/game/projects/synastra?ref=share#details")}`);
  globalThis.window = {
    get location() { return location; },
    history: {
      state: { fromHub: true },
      replaceState(state, _, url) { this.state = state; location = new URL(url, location); },
    },
  };
  const route = routing.getInitialRoute();
  assert.equal(location.pathname, `${prefix}/es/game/projects/synastra`);
  assert.equal(location.search, "?ref=share");
  assert.equal(location.hash, "#details");
  assert.deepEqual(routing.getInitialRoute(), route); // Repeated initialization / reload.
  assert.deepEqual(window.history.state, { fromHub: true });
  location = new URL(`https://example.com${prefix}/game/projects/synastra`);
  assert.equal(routing.getInitialRoute().locale, "en");
  assert.equal(location.pathname, `${prefix}/en/game/projects/synastra`);
  location = new URL(`https://example.com${prefix}/es/`);
  assert.equal(routing.getInitialRoute().path, "/");
  assert.equal(location.pathname, `${prefix}/es`);
  location = new URL(`https://example.com${prefix}/en/game`);
  assert.equal(routing.routeFromLocation().locale, "en");
  location = new URL(`https://example.com${prefix}/es/game`);
  assert.equal(routing.routeFromLocation().locale, "es");
}
console.log("Routing checks passed for GitHub Pages and root hosting.");
