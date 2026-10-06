import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { createConfig, uniqueId } from "../dist/index.js";

const names = (config) => config.projects.map((project) => project.name);

describe("createConfig", () => {
  let saved;
  beforeEach(() => {
    saved = { CI: process.env.CI, ALL_BROWSERS: process.env.ALL_BROWSERS };
    delete process.env.CI;
    delete process.env.ALL_BROWSERS;
  });
  afterEach(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  it("runs Chromium only, without retries, locally", () => {
    const config = createConfig();
    assert.deepEqual(names(config), ["chromium"]);
    assert.equal(config.retries, 0);
    assert.equal(config.forbidOnly, false);
  });

  it("runs all browsers, with retries and forbidOnly, in CI", () => {
    process.env.CI = "true";
    const config = createConfig();
    assert.deepEqual(names(config), ["chromium", "firefox", "webkit"]);
    assert.equal(config.retries, 2);
    assert.equal(config.forbidOnly, true);
  });

  it("runs all browsers locally when ALL_BROWSERS=1", () => {
    process.env.ALL_BROWSERS = "1";
    assert.deepEqual(names(createConfig()), ["chromium", "firefox", "webkit"]);
  });

  it("lets a project override top-level defaults", () => {
    assert.equal(createConfig({ retries: 5 }).retries, 5);
  });

  it("merges `use`: project values win and platform defaults survive", () => {
    const config = createConfig({ use: { baseURL: "https://x.test" } });
    assert.equal(config.use.baseURL, "https://x.test");
    assert.equal(config.use.trace, "on-first-retry");
    assert.equal(createConfig({ use: { trace: "off" } }).use.trace, "off");
  });

  it("lets a project replace the browser list", () => {
    const config = createConfig({ projects: [{ name: "only" }] });
    assert.deepEqual(names(config), ["only"]);
  });
});

describe("uniqueId", () => {
  it("keeps the prefix and does not repeat", () => {
    assert.match(uniqueId("todo"), /^todo-[0-9a-f]{8}$/);
    assert.notEqual(uniqueId(), uniqueId());
  });
});
