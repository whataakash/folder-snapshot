import { scanDirectory } from "./core/scanner.js";
import { formatTree } from "./core/formatter.js";

import {
  getStatistics,
  formatStatistics,
} from "./utils/statistics.js";

import {
  DEFAULT_IGNORES,
  isIgnored,
} from "./utils/filters.js";

function snapshot(directoryPath, options = {}) {
  return scanDirectory(directoryPath, options);
}

export {
  snapshot,
  scanDirectory,
  formatTree,
  getStatistics,
  formatStatistics,
  DEFAULT_IGNORES,
  isIgnored,
};