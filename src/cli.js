#!/usr/bin/env node

import { snapshot, formatTree, getStatistics, formatStatistics } from "./index.js";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packagePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../package.json"
);

const packageJson = JSON.parse(
  fs.readFileSync(packagePath, "utf-8")
);

function showHelp() {
  console.log(`
folder-snapshot - Generate directory tree snapshots

Usage:
  folder-snapshot [path] [options]

Options:
  --ignore <patterns>  Ignore comma-separated files/folders
  --depth <number>     Maximum directory depth
  --json               Output tree as JSON
  --stats              Display folder statistics
  --help               Display help
  --version            Display version

Examples:
  folder-snapshot
  folder-snapshot ./src
  folder-snapshot ./src --depth 2
  folder-snapshot . --ignore node_modules,dist
  folder-snapshot . --json
  folder-snapshot . --stats
  `);
}

function parseArguments(args) {
  const options = {
    directory: ".",
    ignore: [],
    maxDepth: Infinity,
    json: false,
    stats: false,
  };

  let directoryProvided = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--help":
      case "-h":
        options.help = true;
        break;

      case "--version":
      case "-v":
        options.version = true;
        break;

      case "--json":
        options.json = true;
        break;

      case "--stats":
        options.stats = true;
        break;

      case "--ignore": {
        const value = args[++i];

        if (!value) {
          throw new Error("--ignore requires a value");
        }

        options.ignore.push(
          ...value.split(",").filter(Boolean)
        );
        break;
      }

      case "--depth": {
        const value = args[++i];

        if (
          value === undefined ||
          !/^\d+$/.test(value)
        ) {
          throw new Error("--depth requires a non-negative integer");
        }

        options.maxDepth = Number(value);
        break;
      }

      default:
        if (arg.startsWith("-")) {
          throw new Error(`Unknown option: ${arg}`);
        }

        if (directoryProvided) {
          throw new Error(`Unexpected argument: ${arg}`);
        }

        options.directory = arg;
        directoryProvided = true;
    }
  }

  return options;
}

function main() {
  try {
    const options = parseArguments(process.argv.slice(2));

    if (options.help) {
      showHelp();
      return;
    }

    if (options.version) {
      console.log(packageJson.version);
      return;
    }

    const tree = snapshot(options.directory, {
      ignore: options.ignore,
      maxDepth: options.maxDepth,
    });

   if (options.json) {
  const output = options.stats
    ? {
        tree,
        statistics: getStatistics(tree),
      }
    : tree;

  console.log(JSON.stringify(output, null, 2));
} else {
  console.log(formatTree(tree));

  if (options.stats) {
    console.log(
      formatStatistics(getStatistics(tree))
    );
  }
}
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

main();