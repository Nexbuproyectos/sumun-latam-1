/*
 * `npm start` en producción (Render): levanta `next start` y, cuando ya responde,
 * precalienta el caché de imágenes en segundo plano (scripts/warm-images.mjs).
 * Si el precalentamiento falla, el sitio sigue funcionando igual.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const port = process.env.PORT || "3000";
const nextBin = require.resolve("next/dist/bin/next");

const server = spawn(process.execPath, [nextBin, "start", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
});

// Render detiene el servicio con SIGTERM: se lo pasamos a Next para que cierre bien.
for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => server.kill(signal));
}
server.on("exit", (code) => process.exit(code ?? 0));

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) {
        return true;
      }
    } catch {
      // Todavía no escucha.
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
}

if (process.env.WARM_IMAGES !== "0" && (await waitForServer())) {
  const warm = spawn(process.execPath, ["scripts/warm-images.mjs", `http://127.0.0.1:${port}`], {
    stdio: "inherit",
    env: process.env,
  });
  warm.unref();
}
