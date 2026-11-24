import { test } from "node:test";
import assert from "node:assert/strict";

import {
  isIgnored,
  globToRegex,
  DEFAULT_IGNORES,
} from "../src/utils/filters.js";

test("ignores default directories", () => {
  assert.equal(
    isIgnored("node_modules", "node_modules"),
    true
  );

  assert.equal(
    isIgnored(".git", ".git"),
    true
  );
});

test("does not ignore normal files", () => {
  assert.equal(
    isIgnored("index.js", "src/index.js"),
    false
  );
});

test("supports wildcard patterns", () => {
  assert.equal(
    isIgnored("test.log", "test.log", ["*.log"]),
    true
  );

  assert.equal(
    isIgnored("app.js", "app.js", ["*.log"]),
    false
  );
});

test("supports recursive wildcard patterns", () => {
  assert.equal(
    isIgnored(
      "index.js",
      "src/components/index.js",
      ["**/*.js"]
    ),
    true
  );
});

test("exports default ignore patterns", () => {
  assert.ok(DEFAULT_IGNORES.includes("node_modules"));
  assert.ok(DEFAULT_IGNORES.includes(".git"));
});

test("converts glob patterns to regular expressions", () => {
  const regex = globToRegex("*.js");

  assert.equal(regex.test("index.js"), true);
  assert.equal(regex.test("index.txt"), false);
});