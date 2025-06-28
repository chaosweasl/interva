// scripts/set-version.js
// Usage: node scripts/set-version.js 1.2.3

import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.argv.length < 3) {
  console.error("Usage: node scripts/set-version.js <version>");
  process.exit(1);
}

const newVersion = process.argv[2];

async function updateVersions() {
  // 1. Update package.json
  const pkgPath = path.resolve(__dirname, "../package.json");
  const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
  pkg.version = newVersion;
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log("Updated package.json");

  // 2. Update src-tauri/tauri.conf.json
  const tauriConfPath = path.resolve(__dirname, "../src-tauri/tauri.conf.json");
  const tauriConf = JSON.parse(await readFile(tauriConfPath, "utf8"));
  if (tauriConf.package) {
    tauriConf.package.version = newVersion;
  } else if (
    tauriConf.tauri &&
    tauriConf.tauri.bundle &&
    tauriConf.tauri.bundle.version
  ) {
    tauriConf.tauri.bundle.version = newVersion;
  }
  await writeFile(tauriConfPath, JSON.stringify(tauriConf, null, 2) + "\n");
  console.log("Updated tauri.conf.json");

  // 3. Update src-tauri/Cargo.toml
  const cargoPath = path.resolve(__dirname, "../src-tauri/Cargo.toml");
  let cargoToml = await readFile(cargoPath, "utf8");
  cargoToml = cargoToml.replace(
    /version\s*=\s*"[^"]+"/,
    `version = "${newVersion}"`
  );
  await writeFile(cargoPath, cargoToml);
  console.log("Updated Cargo.toml");

  // 4. Update version in about page (src/pages/about.tsx)
  const aboutPath = path.resolve(__dirname, "../src/pages/about.tsx");
  let aboutContent = await readFile(aboutPath, "utf8");
  aboutContent = aboutContent.replace(
    /version\s*[:=]\s*['"][^'"]+['"]/,
    `version: '${newVersion}'`
  );
  aboutContent = aboutContent.replace(
    /Version\s*[vV]?\d+\.\d+\.\d+/,
    `Version v${newVersion}`
  );
  aboutContent = aboutContent.replace(
    /interva v\d+\.\d+\.\d+/i,
    `interva v${newVersion}`
  );
  await writeFile(aboutPath, aboutContent);
  console.log("Updated about.tsx");

  console.log(`All files updated to version ${newVersion}`);
}

updateVersions();
