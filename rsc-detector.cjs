const fs = require("fs");

console.log("🔍 Checking for frameworks that may include vulnerable RSC packages...\n");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };

const FRAMEWORKS = [
  "next",
  "react-router",
  "@vitejs/plugin-rsc",
  "@parcel/rsc",
  "waku",
  "rwsdk"
];

const found = FRAMEWORKS.filter(f => deps[f]);

if (found.length === 0) {
  console.log("✔ SAFE: No frameworks with built-in RSC detected.");
  console.log("Your project is a standard client-side React app.");
  process.exit(0);
}

console.log("⚠️ These frameworks may include RSC internally:");
found.forEach(f => console.log(" - " + f));

console.log(`
⚠️ Even if you did not install react-server-dom-*, these frameworks may bundle RSC internally.
You should check whether these packages have patched releases (Dec 2025 security patch).
`);
