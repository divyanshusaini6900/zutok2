// Publishes the site to GitHub Pages (www.zutok.in).
//
//   npm run deploy                       builds the static export, then runs this script
//   node scripts/deploy.mjs              publishes an existing ./out folder
//   node scripts/deploy.mjs --fix-only   only repairs ./out (to preview it locally)
//
// `main` receives the built site (Pages serves it from the branch root) and
// `source` receives this project's code. Extra CLI arguments are appended to
// both commit messages as additional paragraphs.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, sep } from "node:path";

const REPO = "https://github.com/divyanshusaini6900/zutok2.git";
const DOMAIN = "www.zutok.in";
const root = process.cwd();
const out = join(root, "out");
const notSource = new Set(["node_modules", ".next", "out", ".claude", ".git"]);
const extra = process.argv.slice(2);
const today = new Date().toISOString().slice(0, 10);

const git = (cwd, ...args) => execFileSync("git", args, { cwd, stdio: "inherit" });
const gitOut = (cwd, ...args) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();

function publish(branch, fill, subject) {
  const dir = mkdtempSync(join(tmpdir(), `zutok-${branch}-`));
  try {
    if (gitOut(root, "ls-remote", "--heads", REPO, branch)) {
      git(root, "clone", "--depth", "1", "--branch", branch, REPO, dir);
    } else {
      git(root, "clone", "--depth", "1", REPO, dir);
      git(dir, "checkout", "--orphan", branch);
    }
    for (const name of readdirSync(dir)) {
      if (name !== ".git") rmSync(join(dir, name), { recursive: true, force: true });
    }
    fill(dir);
    git(dir, "add", "-A");
    if (!gitOut(dir, "status", "--porcelain")) {
      console.log(`${branch}: already up to date`);
      return;
    }
    const message = [subject, ...extra].flatMap((p) => ["-m", p]);
    git(dir, "commit", ...message);
    git(dir, "push", "origin", `HEAD:${branch}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const filesIn = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? filesIn(join(dir, e.name)) : [join(dir, e.name)],
  );

// On Windows, Next's static export writes route segment data into folders
// (`pricing/__next.pricing/__PAGE__.txt`), but the client router requests the
// flat name (`pricing/__next.pricing.__PAGE__.txt`). Flatten them to match.
function flattenSegmentFiles(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const full = join(dir, e.name);
    if (!e.name.startsWith("__next.")) {
      flattenSegmentFiles(full);
      continue;
    }
    for (const file of filesIn(full)) {
      renameSync(file, join(dir, [e.name, ...relative(full, file).split(sep)].join(".")));
    }
    rmSync(full, { recursive: true, force: true });
  }
}

if (!existsSync(join(out, "index.html"))) {
  console.error("No build found in ./out. Run `npm run deploy` (or `npm run build` first).");
  process.exit(1);
}
flattenSegmentFiles(out);
if (process.argv.includes("--fix-only")) process.exit(0);

publish(
  "main",
  (dir) => {
    cpSync(out, dir, { recursive: true });
    writeFileSync(join(dir, "CNAME"), DOMAIN);
    writeFileSync(join(dir, ".nojekyll"), "");
  },
  `Deploy website (${today})`,
);

publish(
  "source",
  (dir) => {
    cpSync(root, dir, {
      recursive: true,
      filter: (src) => !notSource.has(relative(root, src).split(sep)[0]),
    });
  },
  `Update website source (${today})`,
);

console.log(`\nPublished. GitHub Pages will serve https://${DOMAIN} in a minute or two.`);
