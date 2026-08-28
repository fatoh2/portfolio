import assert from "node:assert/strict";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import sharp from "sharp";

const sourceDirectory = new URL("../design/brand/", import.meta.url);
const outputDirectory = new URL("../public/brand/", import.meta.url);
const proofDirectory = new URL("../tmp/brand/", import.meta.url);
const ink = "#0b0b0b";
const acid = "#c8ff34";
const namespace = "http://www.w3.org/2000/svg";
const sources = {
  master: await readFile(new URL("monogram-master.svg", sourceDirectory), "utf8"),
  small: await readFile(new URL("monogram-small.svg", sourceDirectory), "utf8"),
};

function svgVariant(source, color, icon = false) {
  const document = new JSDOM(source, { contentType: "image/svg+xml" }).window.document;
  const svg = document.documentElement;
  assert.equal(svg.localName, "svg");
  assert.equal(svg.querySelectorAll("path").length, 1);
  assert.equal(svg.querySelectorAll("circle").length, 1);
  assert.equal(svg.querySelectorAll("script, image, foreignObject, text, use").length, 0);
  svg.setAttribute("fill", color);
  if (icon) {
    svg.setAttribute("width", "64");
    svg.setAttribute("height", "64");
    svg.setAttribute("viewBox", "120 85 750 750");
    const background = document.createElementNS(namespace, "rect");
    for (const [key, value] of Object.entries({ x: 120, y: 85, width: 750, height: 750, fill: acid })) {
      background.setAttribute(key, String(value));
    }
    svg.insertBefore(background, svg.querySelector("path"));
  }
  return `${svg.outerHTML}\n`;
}

// ICO entries contain lossless PNGs; modern browsers and Windows support these frames.
function icoBuffer(frames) {
  const header = Buffer.alloc(6 + frames.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  let offset = header.length;
  frames.forEach(({ size, png }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entry);
    header.writeUInt8(size === 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...frames.map(({ png }) => png)]);
}

function regions(mask, width, height, value) {
  const visited = new Uint8Array(mask.length);
  const result = [];
  for (let start = 0; start < mask.length; start++) {
    if (visited[start] || mask[start] !== value) continue;
    const stack = [start];
    visited[start] = 1;
    let area = 0;
    let touchesEdge = false;
    while (stack.length) {
      const pixel = stack.pop();
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      area++;
      touchesEdge ||= x === 0 || y === 0 || x === width - 1 || y === height - 1;
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const next = ny * width + nx;
        if (visited[next] || mask[next] !== value) continue;
        visited[next] = 1;
        stack.push(next);
      }
    }
    result.push({ area, touchesEdge });
  }
  return result;
}

async function inspectIcon(png, size) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, size);
  assert.equal(info.height, size);
  const mask = Uint8Array.from({ length: size * size }, (_, index) => {
    const offset = index * 4;
    assert.equal(data[offset + 3], 255, `Nonopaque icon at ${size}px`);
    return data[offset] + data[offset + 1] < 220 ? 1 : 0;
  });
  const foreground = regions(mask, size, size, 1);
  const counters = regions(mask, size, size, 0).filter(({ touchesEdge }) => !touchesEdge);
  assert.equal(foreground.length, 2, `Dot merges or body breaks at ${size}px`);
  assert.ok(foreground.every(({ touchesEdge }) => !touchesEdge), `Clipped mark at ${size}px`);
  assert.equal(counters.length, 1, `Enclosed counter is lost at ${size}px`);
  return { size, components: foreground.length, counterPixels: counters[0].area };
}

await mkdir(outputDirectory, { recursive: true });
await mkdir(proofDirectory, { recursive: true });
const variants = {
  "fh-monogram.svg": svgVariant(sources.master, ink),
  "fh-monogram-white.svg": svgVariant(sources.master, "#ffffff"),
  "fh-monogram-acid.svg": svgVariant(sources.master, acid),
  "fh-monogram-small.svg": svgVariant(sources.small, ink),
  "favicon.svg": svgVariant(sources.small, ink, true),
};
for (const [name, svg] of Object.entries(variants)) {
  await writeFile(new URL(name, outputDirectory), svg);
}

const frames = [];
const checks = [];
for (const size of [16, 24, 32, 48, 64, 180, 192, 512]) {
  const name = size === 180 ? "apple-touch-icon.png" : `favicon-${size}.png`;
  const svg = size >= 180 ? svgVariant(sources.master, ink, true) : variants["favicon.svg"];
  const png = await sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toBuffer();
  await writeFile(new URL(name, outputDirectory), png);
  checks.push(await inspectIcon(png, size));
  if ([16, 32, 48].includes(size)) frames.push({ size, png });
}

const ico = icoBuffer(frames);
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
for (let index = 0; index < frames.length; index++) {
  const entry = 6 + index * 16;
  const length = ico.readUInt32LE(entry + 8);
  const offset = ico.readUInt32LE(entry + 12);
  assert.deepEqual(ico.subarray(offset, offset + length), frames[index].png);
}
await writeFile(new URL("favicon.ico", outputDirectory), ico);

for (const [source, destination] of [
  ["favicon.ico", "favicon.ico"],
  ["favicon.svg", "icon.svg"],
  ["apple-touch-icon.png", "apple-icon.png"],
]) {
  await copyFile(new URL(source, outputDirectory), new URL(`../src/app/${destination}`, import.meta.url));
}

for (const [name, svg] of Object.entries(variants).filter(([name]) => name !== "favicon.svg")) {
  await sharp(Buffer.from(svg)).resize(1500, 1100).png().toFile(fileURLToPath(new URL(name.replace(".svg", ".png"), outputDirectory)));
}

// Pixel proofs keep the native raster visible alongside a nearest-neighbor enlargement.
const tiles = [];
for (const [index, size] of [16, 24, 32, 48, 64].entries()) {
  const path = fileURLToPath(new URL(`favicon-${size}.png`, outputDirectory));
  tiles.push({ input: await sharp(path).resize(192, 192, { kernel: "nearest" }).toBuffer(), left: 24 + index * 224, top: 24 });
  tiles.push({ input: await readFile(path), left: 120 + index * 224 - Math.floor(size / 2), top: 252 });
}
await sharp({ create: { width: 1144, height: 348, channels: 4, background: "#ffffff" } })
  .composite(tiles).png().toFile(fileURLToPath(new URL("favicon-pixels.png", proofDirectory)));

const proofBackground = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="960" viewBox="0 0 1440 960">
  <rect width="1440" height="960" fill="#f7f7f4"/>
  <rect x="480" y="116" width="480" height="432" fill="${ink}"/>
  <rect x="960" y="116" width="480" height="432" fill="${acid}"/>
  <rect x="24" y="794" width="682" height="100" fill="${ink}"/>
  <rect x="734" y="794" width="682" height="100" fill="${ink}"/>
  <g font-family="Arial, sans-serif" fill="${ink}">
    <text x="32" y="52" font-size="28" font-weight="600">Fathallah Haj</text>
    <text x="32" y="86" font-size="15" fill="#55554f">Counterform / Vector asset proof</text>
    <text x="240" y="490" text-anchor="middle" font-size="23" font-weight="600">Fathallah Haj</text>
    <text x="720" y="490" text-anchor="middle" font-size="23" font-weight="600" fill="#fff">Fathallah Haj</text>
    <text x="1200" y="490" text-anchor="middle" font-size="23" font-weight="600">Fathallah Haj</text>
    <text x="32" y="600" font-size="18" font-weight="600">Actual-size favicon exports</text>
    <text x="88" y="712" text-anchor="middle" font-size="12">16 px</text>
    <text x="216" y="712" text-anchor="middle" font-size="12">24 px</text>
    <text x="344" y="712" text-anchor="middle" font-size="12">32 px</text>
    <text x="472" y="712" text-anchor="middle" font-size="12">48 px</text>
    <text x="600" y="712" text-anchor="middle" font-size="12">64 px</text>
    <text x="32" y="776" font-size="14">58 px header mark / LTR</text>
    <text x="742" y="776" font-size="14">48 px header mark / RTL placement</text>
    <text x="120" y="842" font-size="15" font-weight="600" fill="#fff">Fathallah Haj</text>
    <text x="120" y="862" font-size="10" fill="#b7b7b0">Product / AI / DevOps</text>
    <text x="1316" y="842" text-anchor="end" font-size="15" font-weight="600" fill="#fff">Fathallah Haj</text>
    <text x="1316" y="862" text-anchor="end" font-size="10" fill="#b7b7b0">Product / AI / DevOps</text>
    <text x="32" y="934" font-size="13" fill="#55554f">Vector masters + optical small-size variant. Original silhouette retained.</text>
  </g>
</svg>`);
const proofLayers = [];
for (const [index, name] of ["fh-monogram.svg", "fh-monogram-white.svg", "fh-monogram.svg"].entries()) {
  proofLayers.push({ input: await sharp(Buffer.from(variants[name])).resize(360, 264).png().toBuffer(), left: 60 + index * 480, top: 164 });
}
for (const [index, size] of [16, 24, 32, 48, 64].entries()) {
  proofLayers.push({ input: await readFile(new URL(`favicon-${size}.png`, outputDirectory)), left: 88 + index * 128 - size / 2, top: 657 - size / 2 });
}
proofLayers.push({ input: await sharp(Buffer.from(variants["fh-monogram-acid.svg"])).resize(58, 43).png().toBuffer(), left: 48, top: 823 });
proofLayers.push({ input: await sharp(Buffer.from(variants["fh-monogram-acid.svg"])).resize(48, 36).png().toBuffer(), left: 1334, top: 826 });
await sharp(proofBackground).composite(proofLayers).png().toFile(fileURLToPath(new URL("preview.png", sourceDirectory)));
await writeFile(new URL("checks.json", proofDirectory), `${JSON.stringify({ iconChecks: checks, icoFrames: frames.map(({ size }) => size) }, null, 2)}\n`);
console.log(JSON.stringify({ output: fileURLToPath(outputDirectory), iconChecks: checks, icoFrames: frames.map(({ size }) => size) }, null, 2));
