function getStatistics(tree) {
  const stats = {
    directories: 0,
    files: 0,
    symlinks: 0,
    other: 0,
    total: 0,
  };

  function traverse(node) {
    stats.total++;

    switch (node.type) {
      case "directory":
        stats.directories++;

        for (const child of node.children || []) {
          traverse(child);
        }
        break;

      case "file":
        stats.files++;
        break;

      case "symlink":
        stats.symlinks++;
        break;

      default:
        stats.other++;
    }
  }

  traverse(tree);

  return stats;
}

function formatStatistics(stats) {
  return [
    "",
    "Folder Statistics",
    "─────────────────",
    `Directories : ${stats.directories}`,
    `Files       : ${stats.files}`,
    `Symlinks    : ${stats.symlinks}`,
    `Other       : ${stats.other}`,
    `Total       : ${stats.total}`,
  ].join("\n");
}

export {
  getStatistics,
  formatStatistics,
};