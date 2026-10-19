# SOLitaire App Screenshots

## Suit redesign, 2026-10-19

The case study and homepage deck lead with the **live website hero**: `solitaireMedia.hero` and
`mobileHero` carry an `embed` that `components/live-embed.tsx` layers over the still. The frame
loads `https://sol-solitaire.com/embed/hero` (the hero alone, from solitaire-dapp
`app/embed/hero.tsx`) when it nears the viewport, lays it out at the capture size and scales it to
the panel, and fades in only after the page posts `solitaire:hero-ready`. Until then, or if the
SOLitaire site is down, the still stays. Only `/embed/` pages on sol-solitaire.com allow framing,
and only by fhaj.dev, www.fhaj.dev and localhost (solitaire-dapp `vercel.json`). Set
`NEXT_PUBLIC_SOLITAIRE_ORIGIN` to point a local build at another SOLitaire server.

Captured with headless Chromium (playwright-core 1.56.1, Playwright Chromium 1243), guest state:

| Public asset | Screen | Source | Viewport | Pixels |
| --- | --- | --- | --- | --- |
| `solitaire-suit-hero-desktop.jpg` | Website hero, first round (spades) | local `/embed/hero` on solitaire-dapp 79032ad | 1280 x 800 @2x | 2560 x 1600 |
| `solitaire-suit-hero-mobile.jpg` | Website hero, phone | same | 390 x 867 @3x | 1170 x 2601 |
| `solitaire-suit-home-desktop.jpg` | Game home (Play / Compete / Daily) | https://app.sol-solitaire.com, tutorial skipped | 1280 x 800 @2x | 2560 x 1600 |
| `solitaire-suit-table-mobile.jpg` | Classic Klondike table | same, Play > Classic | 393 x 874 @3x | 1179 x 2622 |

| `solitaire-suit-table-live-mobile.jpg` | Playable table, first deal (seed 4050) | local `/embed/table` | 393 x 874 @3x | 1179 x 2622 |

`gameplay` carries a second embed, `/embed/table`: a tap-to-play Classic table (draw one, undo,
new deal from the solvable seeds) on the real engine and card faces, shown live in the deck's phone
frame and the case-study gallery. Its first deal is fixed so the still matches what loads. The
app's own table capture (`solitaire-suit-table-mobile.jpg`) stays in the homepage portal scene.

Hero stills are taken 3.2 s after load, once the headline and cards have dealt and before the
first round changes suit (5.5 s). The embed sizes (1280 x 800, 390 x 867) match the aspect ratios
of the stills, and a test holds them to it. The `*-court-*` captures below are no longer referenced.

## Court Table, 2026-09-16

Captured on 2026-09-16 from the local Court Table build at `http://localhost:8094/game`
(branch `codex/seed-court-nft-economy`, commit 04b0749) with html2canvas at 2x from the
emulated viewport, posted to a local receiver and saved as JPEG (quality 0.92).

| Public asset | Screen | Viewport | Pixels |
| --- | --- | --- | --- |
| `solitaire-court-lobby-desktop.jpg` | Home (Play / Compete / Daily hubs) | 1280 x 800 | 2560 x 1600 |
| `solitaire-court-lobby-mobile.jpg` | Home, phone layout | 430 x 800 | 860 x 1600 |
| `solitaire-court-table-mobile.jpg` | Classic Klondike table | 430 x 800 | 860 x 1600 |

Assets live in `public/labs/solitaire/`. They are renders of the real app UI in guest state, not
marketing artwork. No connected wallet, account details, admin screens, or payment transactions
were captured. The table was opened with Play > Classic, and the capture was taken after the
opening deal finished. Older `solitaire-banner.png`, `solitaire-gameplay.png` and
`solitaire-head-to-head.png` predate the Court Table redesign and are not referenced by the site.

`solitaireMedia` in `src/content/portfolio.ts` is the shared source for the homepage deck, the
case study hero and gallery. Keep full UI screenshots in contain mode so navigation and game
controls are not cropped. The public product link remains `https://sol-solitaire.com`; localhost
is only a capture source, never a visitor-facing link.
