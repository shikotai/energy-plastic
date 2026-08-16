import { copyFile, mkdir } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await copyFile("public/.htaccess", "dist/.htaccess");
await copyFile("dist/index.html", "dist/404.html");
console.log("SPA routing files copied to dist/.");
