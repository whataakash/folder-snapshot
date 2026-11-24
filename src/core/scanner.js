import fs from "node:fs";
import path from "node:path";

import {
  DEFAULT_IGNORES,
  isIgnored,
} from "../utils/filters.js";

function sortEntries(entries) {
  return entries.sort((a, b) => {
    // Directories appear before files.
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;

    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
}

function scanDirectory(directoryPath, options = {}) {
  const {
    ignore = [],
    maxDepth = Infinity,
  } = options;

  const absolutePath = path.resolve(directoryPath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Directory does not exist: ${absolutePath}`);
  }

  const rootStats = fs.statSync(absolutePath);

  if (!rootStats.isDirectory()) {
    throw new Error(`Path is not a directory: ${absolutePath}`);
  }

  if (
    maxDepth !== Infinity &&
    (!Number.isInteger(maxDepth) || maxDepth < 0)
  ) {
    throw new Error("maxDepth must be a non-negative integer");
  }

  const ignorePatterns = [
    ...DEFAULT_IGNORES,
    ...ignore,
  ];

  function buildTree(currentPath, depth, relativePath = "") {
    const entries = sortEntries(
      fs.readdirSync(currentPath, {
        withFileTypes: true,
      })
    );

    const children = [];

    if (depth >= maxDepth) {
      return children;
    }

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);

      const entryRelativePath = relativePath
        ? path.posix.join(relativePath, entry.name)
        : entry.name;

      if (
        isIgnored(
          entry.name,
          entryRelativePath,
          ignorePatterns
        )
      ) {
        continue;
      }

      let type;

      if (entry.isDirectory()) {
        type = "directory";
      } else if (entry.isFile()) {
        type = "file";
      } else if (entry.isSymbolicLink()) {
        type = "symlink";
      } else {
        type = "other";
      }

      const node = {
        name: entry.name,
        path: entryPath,
        type,
      };

      if (type === "directory") {
        node.children = buildTree(
          entryPath,
          depth + 1,
          entryRelativePath
        );
      }

      children.push(node);
    }

    return children;
  }

  return {
    name: path.basename(absolutePath),
    path: absolutePath,
    type: "directory",
    children: buildTree(absolutePath, 0),
  };
}

export {
  scanDirectory,
  sortEntries,
};