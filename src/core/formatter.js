function formatTree(tree, options = {}) {
  const {
    showRoot = true,
    indent = "    ",
  } = options;

  const lines = [];

  if (showRoot) {
    lines.push(`${tree.name}/`);
  }

  function renderChildren(children, prefix = "") {
    children.forEach((node, index) => {
      const isLast = index === children.length - 1;

      const connector = isLast ? "└── " : "├── ";

      const suffix =
        node.type === "directory" ? "/" : "";

      lines.push(
        `${prefix}${connector}${node.name}${suffix}`
      );

      if (
        node.type === "directory" &&
        node.children?.length > 0
      ) {
        const nextPrefix = prefix + (
          isLast ? indent : "│   "
        );

        renderChildren(node.children, nextPrefix);
      }
    });
  }

  renderChildren(tree.children || []);

  return lines.join("\n");
}

export {
  formatTree,
};