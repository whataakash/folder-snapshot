const DEFAULT_IGNORES = [
  "node_modules",
  ".git",
  ".DS_Store",
  "dist",
  "build",
  "coverage",
  ".next",
];

function globToRegex(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "§")
    .replace(/\*/g, "[^/]*")
    .replace(/§/g, ".*")
    .replace(/\?/g, "[^/]");

  return new RegExp(`^${escaped}$`);
}

function isIgnored(name, relativePath, patterns = DEFAULT_IGNORES) {
  return patterns.some((pattern) => {
    const regex = globToRegex(pattern);

    return (
      regex.test(name) ||
      regex.test(relativePath)
    );
  });
}

export {
  DEFAULT_IGNORES,
  globToRegex,
  isIgnored,
};