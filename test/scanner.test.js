import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { scanDirectory } from "../src/core/scanner.js";

test("scans directory recursively", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "snapshot-")
  );

  try {
    fs.mkdirSync(path.join(tempDir, "src"));
    fs.writeFileSync(
      path.join(tempDir, "src", "index.js"),
      "console.log('hello');"
    );

    const tree = scanDirectory(tempDir);

    assert.equal(tree.type, "directory");
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].name, "src");
    assert.equal(tree.children[0].children[0].name, "index.js");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("ignores default directories", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "snapshot-")
  );

  try {
    fs.mkdirSync(path.join(tempDir, "node_modules"));
    fs.mkdirSync(path.join(tempDir, "src"));

    const tree = scanDirectory(tempDir);

    const names = tree.children.map((item) => item.name);

    assert.deepEqual(names, ["src"]);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("supports custom ignore patterns", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "snapshot-")
  );

  try {
    fs.writeFileSync(path.join(tempDir, "secret.txt"), "");
    fs.writeFileSync(path.join(tempDir, "public.txt"), "");

    const tree = scanDirectory(tempDir, {
      ignore: ["*.txt"],
    });

    assert.equal(tree.children.length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("respects maximum depth", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "snapshot-")
  );

  try {
    fs.mkdirSync(path.join(tempDir, "src"));
    fs.mkdirSync(path.join(tempDir, "src", "core"));

    fs.writeFileSync(
      path.join(tempDir, "src", "core", "index.js"),
      ""
    );

    const tree = scanDirectory(tempDir, {
      maxDepth: 1,
    });

    assert.equal(tree.children[0].name, "src");
    assert.equal(tree.children[0].children.length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("throws error for nonexistent directory", () => {
  assert.throws(
    () => scanDirectory("/this/path/does/not/exist"),
    /Directory does not exist/
  );
});

test("rejects negative maximum depth", () => {
  assert.throws(
    () => scanDirectory(".", { maxDepth: -1 }),
    /maxDepth must be/
  );
});