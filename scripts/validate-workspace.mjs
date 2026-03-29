import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const workspaceFile = path.join(rootDir, "pnpm-workspace.yaml");
const rootPackageFile = path.join(rootDir, "package.json");
const requiredRootScripts = ["build", "lint", "typecheck", "test"];
const workspaceRoots = ["apps", "packages", "services", "tooling"];
const problems = [];

const fail = (message) => {
  problems.push(message);
};

const readJson = (filePath) => {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Invalid JSON in ${path.relative(rootDir, filePath)}: ${error.message}`);
    return null;
  }
};

const listWorkspacePackages = () => {
  const packageFiles = [];

  for (const workspaceRoot of workspaceRoots) {
    const workspacePath = path.join(rootDir, workspaceRoot);
    if (!existsSync(workspacePath)) {
      continue;
    }

    for (const entry of readdirSync(workspacePath)) {
      const entryPath = path.join(workspacePath, entry);
      if (!statSync(entryPath).isDirectory()) {
        continue;
      }

      const packageFile = path.join(entryPath, "package.json");
      if (existsSync(packageFile)) {
        packageFiles.push(packageFile);
      }
    }
  }

  return packageFiles.sort();
};

if (!existsSync(rootPackageFile)) {
  fail("Missing root package.json");
}

if (!existsSync(workspaceFile)) {
  fail("Missing pnpm-workspace.yaml");
}

const rootPackage = existsSync(rootPackageFile) ? readJson(rootPackageFile) : null;

if (rootPackage) {
  if (!rootPackage.private) {
    fail("Root package.json must set private=true");
  }

  const scripts = rootPackage.scripts ?? {};
  for (const scriptName of requiredRootScripts) {
    if (typeof scripts[scriptName] !== "string" || scripts[scriptName].trim() === "") {
      fail(`Root package.json is missing the ${scriptName} script`);
    }
  }
}

const workspacePackages = listWorkspacePackages();

for (const packageFile of workspacePackages) {
  const manifest = readJson(packageFile);
  if (!manifest) {
    continue;
  }

  const relativePath = path.relative(rootDir, packageFile);
  if (typeof manifest.name !== "string" || manifest.name.trim() === "") {
    fail(`${relativePath} is missing a package name`);
  }

  const scripts = manifest.scripts ?? {};
  for (const scriptName of ["build", "lint", "test"]) {
    if (scripts[scriptName] !== undefined && typeof scripts[scriptName] !== "string") {
      fail(`${relativePath} has a non-string ${scriptName} script`);
    }
  }
}

if (problems.length > 0) {
  console.error("Workspace validation failed:\n");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log(`Workspace validation passed for ${workspacePackages.length} package(s).`);
