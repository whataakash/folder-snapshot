# 📁 Folder Snapshot

**A lightweight Node.js CLI tool to generate clean directory tree snapshots of any project.**

Folder Snapshot helps developers visualize, understand, and document project structures without manually navigating through folders.

Whether you're exploring an unfamiliar codebase, documenting a project, or sharing your folder structure with an AI coding assistant, Folder Snapshot makes it simple.

## ✨ Features

- **Recursive Scanning:** Automatically scans nested directories.
- **Clean Tree Output:** Generates readable directory structures.
- **Smart Filtering:** Automatically ignores unnecessary directories like `node_modules`, `.git`, and `dist`.
- **Custom Ignore Patterns:** Exclude files and folders of your choice.
- **Depth Control:** Limit how deep the scanner explores.
- **JSON Export:** Generate structured JSON output.
- **Folder Statistics:** Get counts of files, directories, and other entries.
- **Zero Dependencies:** Built entirely with native Node.js modules.

## 📦 Installation

Install globally to access the command from anywhere:

```bash
npm install -g folder-snapshot
```

Alternatively, use it without a global installation:

```bash
npx folder-snapshot
```

## 🚀 Getting Started

### Step 1: Open your project

Navigate to the directory you want to scan:

```bash
cd path/to/your-project
```

### Step 2: Run Folder Snapshot

```bash
folder-snapshot
```

That's it! Your project's directory structure will be displayed in the terminal.

## 💻 Usage

### 1. Scan the current directory

```bash
folder-snapshot
```

### 2. Scan a specific directory

```bash
folder-snapshot ./src
```

### 3. Limit directory depth

Useful when working with large projects.

```bash
folder-snapshot . --depth 2
```

### 4. Ignore specific files or folders

```bash
folder-snapshot . --ignore node_modules,dist,build
```

### 5. Generate JSON output

```bash
folder-snapshot . --json
```

### 6. Display folder statistics

```bash
folder-snapshot . --stats
```

### 7. Display help

```bash
folder-snapshot --help
```

## 📸 Example Output

For a project with the following structure:

```text
my-project/
├── src/
│   ├── components/
│   │   └── Header.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── favicon.ico
├── package.json
└── README.md
```

Folder Snapshot generates:

```text
my-project/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Header.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## ⚙️ Default Ignored Entries

To keep the output clean, Folder Snapshot automatically ignores:

| Entry | Reason |
|---|---|
| `node_modules` | Installed dependencies |
| `.git` | Git metadata |
| `.DS_Store` | macOS system file |
| `dist` | Build output |
| `build` | Build output |
| `coverage` | Test coverage reports |
| `.next` | Next.js build directory |

You can provide additional ignore patterns using `--ignore`.

## 🔌 Programmatic Usage

Folder Snapshot can also be integrated into your own Node.js applications.

Install it locally:

```bash
npm install folder-snapshot
```

Import the functions:

```javascript
import {
  snapshot,
  formatTree,
  getStatistics
} from "folder-snapshot";

// Scan a directory
const tree = snapshot("./");

// Generate readable output
console.log(formatTree(tree));

// Get folder statistics
console.log(getStatistics(tree));
```

### Available API

| Function | Description |
|---|---|
| `snapshot(path, options)` | Scans a directory and returns its tree |
| `scanDirectory(path, options)` | Direct access to the scanner |
| `formatTree(tree, options)` | Converts the tree into readable text |
| `getStatistics(tree)` | Calculates folder statistics |
| `formatStatistics(stats)` | Formats statistics for display |
| `isIgnored(name, path, patterns)` | Checks ignore patterns |

### Scanner Options

| Option | Type | Default | Description |
|---|---|---|---|
| `ignore` | `string[]` | `[]` | Additional ignored patterns |
| `maxDepth` | `number` | `Infinity` | Maximum directory depth |

## 🛠️ Requirements

- Node.js 18 or later
- npm

No additional dependencies are required.

## 🧪 Development

Clone the repository:

```bash
git clone https://github.com/whataakash/folder-snapshot.git
```

Navigate into the project:

```bash
cd folder-snapshot
```

Run the test suite:

```bash
npm test
```

Test the CLI locally:

```bash
npm link
folder-snapshot .
```

## 🗺️ Roadmap

Potential features planned for future releases:

- [ ] Save snapshots directly to `.txt` or `.md` files.
- [ ] Calculate file and directory sizes.
- [ ] Support `.foldersnapshotignore`.
- [ ] Watch mode for automatic snapshot updates.
- [ ] Copy snapshots directly to clipboard.
- [ ] Markdown-formatted output.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run the test suite.
5. Submit a pull request.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Node.js.**

If you find Folder Snapshot useful, consider giving the repository a ⭐ on GitHub.