import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vite = path.join(root, "node_modules", "vite", "bin", "vite.js");

execFileSync(process.execPath, [vite, "build"], {
  cwd: root,
  stdio: "inherit",
});
execFileSync(
  process.execPath,
  [vite, "build", "--ssr", "src/prerender.tsx", "--outDir", ".prerender"],
  { cwd: root, stdio: "inherit" },
);
execFileSync(process.execPath, ["scripts/prerender.mjs"], {
  cwd: root,
  stdio: "inherit",
});
execFileSync(process.execPath, ["scripts/verify-prerender.mjs"], {
  cwd: root,
  stdio: "inherit",
});
