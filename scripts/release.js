// scripts/release.js
// Usage: node scripts/release.js 1.2.2

import { execSync } from "child_process";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.argv.length < 3) {
  console.error("Usage: node scripts/release.js <version>");
  process.exit(1);
}

const newVersion = process.argv[2];

function run(cmd) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

async function main() {
  // 1. Run the version update script and await completion
  await new Promise((resolve, reject) => {
    const child = exec(
      `node "${path.resolve(__dirname, "set-version.js")}" ${newVersion}`
    );
    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`set-version.js exited with code ${code}`))
    );
  });

  // 2. Stage all changes
  run("git add -A");

  // 3. Commit
  run(`git commit -m "release: v${newVersion}"`);

  // 4. Push to all remotes
  run("git push --all");

  // 5. Tag
  run(`git tag v${newVersion}`);

  // 6. Push tag to origin
  run(`git push origin v${newVersion}`);

  console.log(`Release v${newVersion} pushed and tagged!`);
}

main();
