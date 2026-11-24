import { test } from "node:test";
import assert from "node:assert/strict";

import { formatTree } from "../src/core/formatter.js";

test("formats directory tree correctly", () => {
  const tree = {
    name: "project",
    type: "directory",
    children: [
      {
        name: "src",
        type: "directory",
        children: [
          {
            name: "index.js",
            type: "file",
          },
        ],
      },
      {
        name: "README.md",
        type: "file",
      },
    ],
  };

  const output = formatTree(tree);

  const expected = [
    "project/",
    "├── src/",
    "│   └── index.js",
    "└── README.md",
  ].join("\n");

  assert.equal(output, expected);
});

test("formats empty directories", () => {
  const tree = {
    name: "empty",
    type: "directory",
    children: [],
  };

  assert.equal(formatTree(tree), "empty/");
});

test("supports hiding root directory", () => {
  const tree = {
    name: "project",
    type: "directory",
    children: [
      {
        name: "index.js",
        type: "file",
      },
    ],
  };

  assert.equal(
    formatTree(tree, { showRoot: false }),
    "└── index.js"
  );
});