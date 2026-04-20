import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const generatedSitesDir = path.join(rootDir, "generated-sites");
const publishDir = path.join(rootDir, ".publish");

const removeNestedGitDirs = (dirPath) => {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory() && entry.name === ".git") {
      fs.rmSync(entryPath, { recursive: true, force: true });
      continue;
    }

    if (entry.isDirectory()) {
      removeNestedGitDirs(entryPath);
    }
  }
};

const requiredDirs = [distDir, generatedSitesDir];
const missingDirs = requiredDirs.filter((dirPath) => !fs.existsSync(dirPath));

if (missingDirs.length > 0) {
  console.error("Missing required build output:");
  missingDirs.forEach((dirPath) => {
    console.error(`- ${path.relative(rootDir, dirPath)}`);
  });
  process.exit(1);
}

fs.rmSync(publishDir, { recursive: true, force: true });
fs.mkdirSync(publishDir, { recursive: true });

fs.cpSync(distDir, publishDir, { recursive: true });

for (const entry of fs.readdirSync(generatedSitesDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) {
    continue;
  }

  fs.cpSync(
    path.join(generatedSitesDir, entry.name),
    path.join(publishDir, entry.name),
    { recursive: true }
  );
}

removeNestedGitDirs(publishDir);

console.log("Prepared .publish with:");
console.log("- main site at /");
console.log("- generated clinic sites in subfolders");
