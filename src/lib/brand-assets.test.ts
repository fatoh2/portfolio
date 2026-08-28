// @vitest-environment node
import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("active brand icons", () => {
  it.each([
    ["favicon.ico", "favicon.ico"],
    ["favicon.svg", "icon.svg"],
    ["apple-touch-icon.png", "apple-icon.png"],
  ])("keeps %s synchronized with the Next.js metadata file", async (source, active) => {
    const expected = await readFile(new URL(`../../public/brand/${source}`, import.meta.url));
    const actual = await readFile(new URL(`../app/${active}`, import.meta.url));
    expect(actual.equals(expected)).toBe(true);
  });

  it("ships 16, 32, and 48 pixel frames in the browser favicon", async () => {
    const icon = await readFile(new URL("../app/favicon.ico", import.meta.url));
    expect(icon.readUInt16LE(2)).toBe(1);
    expect(icon.readUInt16LE(4)).toBe(3);
    expect([0, 1, 2].map((index) => icon.readUInt8(6 + index * 16))).toEqual([16, 32, 48]);
  });

  it("ships a 180 pixel Apple touch icon", async () => {
    const icon = await readFile(new URL("../app/apple-icon.png", import.meta.url));
    expect(icon.subarray(1, 4).toString()).toBe("PNG");
    expect(icon.readUInt32BE(16)).toBe(180);
    expect(icon.readUInt32BE(20)).toBe(180);
  });
});
