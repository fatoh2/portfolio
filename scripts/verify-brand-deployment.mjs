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

for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, `Page failed: ${route}`);
  const dom = new JSDOM(await response.text());
  const document = dom.window.document;
  const image = document.querySelector(".brand-link img.brand-mark");
  assert.equal(image?.getAttribute("src"), "/brand/fh-monogram-acid.svg", `Missing logo: ${route}`);
  const links = [...document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')];
  const paths = links.map((link) => new URL(link.getAttribute("href"), origin).pathname);
  for (const path of ["/favicon.ico", "/icon.svg", "/apple-icon.png"]) {
    assert.ok(paths.includes(path), `Missing ${path} metadata on ${route}`);
  }
  for (const link of links) assets.add(link.getAttribute("href"));
  const language = route.startsWith("/ar") ? "ar" : route.startsWith("/he") ? "he" : "en";
  assert.equal(document.documentElement.lang, language);
  assert.equal(document.documentElement.dir, language === "en" ? "ltr" : "rtl");
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
