# SOLitaire App Screenshots

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
