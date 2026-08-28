# Fathallah Haj / Counterform Identity

The selected raster concept has been rebuilt as editable vector geometry: one
compound path and one circle, with no embedded image, font, script, or external
dependency in the SVG files. The full-size source retains the selected silhouette.

## Files

- `monogram-master.svg`: canonical full-detail geometry, with `currentColor` fill.
- `monogram-small.svg`: optical adjustment for small sizes. The dot sits farther
  from the head, the enclosed counter is wider, and the left opening is enlarged.
- `../../public/brand/` (`brand/` in the ZIP): generated black, white and acid-green
  SVGs; transparent PNGs; SVG/ICO/PNG favicons; and an opaque Apple touch icon.
- `preview.html` (workspace only): offline color, header, RTL, native-size and
  pixel-enlargement proof.
- `preview.png`: directly rendered vector and native-size header/icon proof.

## Rebuild

From the portfolio root, with its npm dependencies installed:

```sh
npm run brand:build
```

The exporter uses the project's installed Sharp and JSDOM packages. It writes
pixel checks to `tmp/brand/checks.json`, verifies the dot remains detached and the
enclosed counter remains open at each exported size, and validates all ICO frames.
These checks verify rendering, not unprompted linguistic readability.

## Usage

Use the full-detail master at a minimum displayed width of 48 px for headers.
Below 48 px, use the small-size geometry or the supplied favicon assets. Favicons
are recognition marks; the initials are not expected to read like text at 16 px.
Keep the mark upright on both LTR and RTL pages. Do not mirror it.

Use black on light or acid backgrounds, white or acid on near-black backgrounds.
Do not use acid green on white. Retain the SVG aspect ratio and intrinsic padding;
leave at least one dot diameter of additional space around larger placements.

The square acid favicon background remains opaque for consistent contrast across
browser themes. The 180/192/512 px icons use the full-detail master; 16-64 px icons
use the optical small-size variant. PNGs and ICOs are generated from these sources.

The site header uses the acid-green master. Rebuilding also synchronizes the
active Next.js metadata assets: `src/app/favicon.ico`, `src/app/icon.svg`, and
`src/app/apple-icon.png`. Next.js supplies the icon links and versioned SVG URL
for the English, Arabic, and Hebrew routes. Deployments are managed separately.
