#!/usr/bin/env node
/**
 * Dates de modification (lastmod) des pages du sitemap hors blog et études de
 * cas (elles ont leur `updatedDate`). Chaque page est rendue par le build de
 * production ; si l'empreinte de son contenu (<main>) change, sa date passe à
 * aujourd'hui (heure de Montréal). Composants, données et prix partagés sont
 * donc pris en compte sans liste de fichiers à tenir à jour.
 *
 *   pnpm lastmod                       build puis mise à jour de data/lastmod.json
 *   node scripts/lastmod.mjs --check   CI : échoue si une date n'est plus à jour
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequestHandler } from "react-router";

const FILE = "data/lastmod.json";
const check = process.argv.includes("--check");

const pages = JSON.parse(readFileSync(FILE, "utf-8"));
const build = await import(new URL("../build/server/index.js", import.meta.url).href);
const handle = createRequestHandler(build, "production");
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto" }).format(new Date());

const stale = [];
for (const [path, entry] of Object.entries(pages)) {
  const res = await handle(new Request(`https://pierrebarbe.ca${path}`));
  const html = await res.text();
  const main = html.match(/<main id="main-content">([\s\S]*)<\/main>/)?.[1];
  if (res.status !== 200 || !main) throw new Error(`${path} : HTTP ${res.status} ou <main> introuvable`);

  const hash = createHash("sha256").update(main).digest("hex").slice(0, 16);
  if (entry.hash !== hash) {
    stale.push(path);
    pages[path] = { lastmod: today, hash };
  }
}

if (check) {
  if (stale.length) {
    console.error(`lastmod pas à jour pour : ${stale.join(", ")}\nLancer « pnpm lastmod » et committer ${FILE}.`);
    process.exit(1);
  }
  console.log(`lastmod à jour (${Object.keys(pages).length} pages)`);
} else {
  writeFileSync(FILE, JSON.stringify(pages, null, 2) + "\n");
  console.log(stale.length ? `Mis à jour (${today}) : ${stale.join(", ")}` : "Aucun changement");
}
