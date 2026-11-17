import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

const origin = new URL(process.argv[2] || "http://127.0.0.1:3067");
const expectedAssets = new Map([
  ["/favicon.ico", "../src/app/favicon.ico"],
  ["/icon.svg", "../src/app/icon.svg"],
  ["/apple-icon.png", "../src/app/apple-icon.png"],
  ["/brand/fh-monogram-acid.svg", "../public/brand/fh-monogram-acid.svg"],
]);
const assets = new Set(["/favicon.ico", "/brand/fh-monogram-acid.svg"]);
const routes = ["/", "/ar", "/he", "/work/go-to-nature", "/ar/work/go-to-nature", "/he/work/go-to-nature"];
const pages = [];
// Hard-coded on purpose, so a change to the headline in home.ts shows up here too.
const headlines = {
  en: "I build what answers your customers.",
  ar: "أبني ما يردّ على زبائنك.",
  he: "אני בונה את מה שעונה ללקוחות שלכם.",
};

// The homepage's content must be in the server HTML, whatever the scripts do afterwards.
function checkHome(document, route, language) {
  assert.ok(document.querySelector('a[href*="wa.me"]'), `Missing WhatsApp link: ${route}`);
  assert.ok(document.querySelector('a[href*="Fathallah_Haj_DevOps_CV_2026.pdf"]'), `Missing résumé link: ${route}`);
  for (const id of ["work", "contact", "services", "process", "saqroon"]) {
    assert.ok(document.getElementById(id), `Missing #${id}: ${route}`);
  }
  assert.ok(document.querySelector("form.brief-form"), `Missing contact form: ${route}`);
  assert.equal(document.querySelectorAll("article[data-slug]").length, 12, `Expected twelve cards: ${route}`);
  const headings = document.querySelectorAll("h1");
  assert.equal(headings.length, 1, `Expected one h1: ${route}`);
  assert.equal(headings[0].textContent.trim(), headlines[language], `Wrong h1: ${route}`);
}

for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, `Page failed: ${route}`);
  const dom = new JSDOM(await response.text());
  const document = dom.window.document;
  const image = document.querySelector(".brand-link img.brand-mark");
  // Vercel appends ?dpl=<deployment> to asset URLs, so compare the path only.
  const logo = image && new URL(image.getAttribute("src"), origin).pathname;
  assert.equal(logo, "/brand/fh-monogram-acid.svg", `Missing logo: ${route}`);
  const links = [...document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')];
  const paths = links.map((link) => new URL(link.getAttribute("href"), origin).pathname);
  for (const path of ["/favicon.ico", "/icon.svg", "/apple-icon.png"]) {
    assert.ok(paths.includes(path), `Missing ${path} metadata on ${route}`);
  }
  for (const link of links) assets.add(link.getAttribute("href"));
  const language = route.startsWith("/ar") ? "ar" : route.startsWith("/he") ? "he" : "en";
  assert.equal(document.documentElement.lang, language);
  assert.equal(document.documentElement.dir, language === "en" ? "ltr" : "rtl");
  if (!route.includes("/work/")) checkHome(document, route, language);
  pages.push({ route, language, iconLinks: links.map((link) => link.getAttribute("href")) });
  dom.window.close();
}

const checks = [];
for (const asset of assets) {
  const url = new URL(asset, origin);
  const source = expectedAssets.get(url.pathname);
  assert.ok(source, `Unexpected icon path: ${url.pathname}`);
  const response = await fetch(url);
  assert.equal(response.status, 200, `Asset failed: ${asset}`);
  const actual = Buffer.from(await response.arrayBuffer());
  const expected = await readFile(new URL(source, import.meta.url));
  assert.ok(actual.equals(expected), `Deployed bytes differ: ${asset}`);
  const type = response.headers.get("content-type") || "";
  assert.match(type, /image\//, `Wrong content type: ${asset}`);
  checks.push({ asset, bytes: actual.length, sha256: createHash("sha256").update(actual).digest("hex") });
}
console.log(JSON.stringify({ origin: origin.origin, pages, assets: checks }, null, 2));
