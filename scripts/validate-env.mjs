import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const manifestPath = path.join(rootDir, "config", "environment.manifest.json");

if (!existsSync(manifestPath)) {
  console.error("Missing environment manifest: config/environment.manifest.json");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const results = [];

const parseEnv = (contents) => {
  const values = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    values[key] = value;
  }

  return values;
};

const ensureExampleFile = (appName, appPath, exampleFile, required, optional) => {
  const fullPath = path.join(appPath, exampleFile);

  if (existsSync(fullPath)) {
    return { created: false, keys: parseEnv(readFileSync(fullPath, "utf8")) };
  }

  const templateLines = [
    `# ${appName} environment template`,
    ""
  ];

  for (const key of required) {
    templateLines.push(`${key}=`);
  }

  if (optional.length > 0) {
    templateLines.push("", "# Optional");
    for (const key of optional) {
      templateLines.push(`${key}=`);
    }
  }

  mkdirSync(appPath, { recursive: true });
  writeFileSync(fullPath, `${templateLines.join("\n")}\n`, "utf8");

  return {
    created: true,
    keys: parseEnv(templateLines.join("\n"))
  };
};

for (const [appName, appConfig] of Object.entries(manifest.apps ?? {})) {
  const appPath = path.join(rootDir, appConfig.path);
  const appExists = existsSync(appPath);

  if (!appExists) {
    results.push(`${appName}: skipped (missing ${appConfig.path})`);
    continue;
  }

  const example = ensureExampleFile(
    appName,
    appPath,
    appConfig.exampleFile,
    appConfig.required ?? [],
    appConfig.optional ?? []
  );

  const envPath = path.join(appPath, ".env");
  const actualValues = existsSync(envPath) ? parseEnv(readFileSync(envPath, "utf8")) : {};
  const missingKeys = [];

  for (const key of appConfig.required ?? []) {
    const inExample = Object.prototype.hasOwnProperty.call(example.keys, key);
    if (!inExample) {
      missingKeys.push(`${key} missing from ${path.join(appConfig.path, appConfig.exampleFile)}`);
      continue;
    }

    if (existsSync(envPath) && !actualValues[key]) {
      missingKeys.push(`${key} missing from ${path.join(appConfig.path, ".env")}`);
    }
  }

  if (missingKeys.length > 0) {
    console.error(`${appName}: environment validation failed`);
    for (const key of missingKeys) {
      console.error(`- ${key}`);
    }
    process.exitCode = 1;
    continue;
  }

  const createdNote = example.created ? " (created example file)" : "";
  const envNote = existsSync(envPath) ? "validated .env" : "validated template only";
  results.push(`${appName}: ok - ${envNote}${createdNote}`);
}

if (results.length === 0) {
  console.log("No configured apps found for environment validation.");
} else {
  for (const result of results) {
    console.log(result);
  }
}

if (process.exitCode && process.exitCode !== 0) {
  process.exit(process.exitCode);
}
