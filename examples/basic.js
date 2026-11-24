import {
  snapshot,
  formatTree,
  getStatistics,
  formatStatistics,
} from "../src/index.js";

// Scan current project
const tree = snapshot("./", {
  ignore: ["examples", "test"],
  maxDepth: 3,
});

// Generate directory tree
const output = formatTree(tree);

console.log(output);

// Generate statistics
const stats = getStatistics(tree);

console.log(formatStatistics(stats));

// Access raw JSON
console.log(JSON.stringify(tree, null, 2));