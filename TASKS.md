# Portfolio tasks

**Updated:** 2026-10-16 · **Phase:** public case studies and downloads

**Codex — Nuqta download7 refresh, 2026-10-13: published/verified; claim released.** [Download](https://fhaj.dev/downloads/Nuqta-arm64.apk) is signed Nuqta0.1.0(7) ARM64 with remaining-page and approved density refinements,70,478,957bytes; full staged/public SHA73d2e5ec1f8fd17ab6f958bcb2ecc02acf62471bccd17d4d812e3e94912143a7. APK-only018740c pushed; Vercel READY dpl_7TGE1ZcVHVVJcj48W3cMx3khE9nc promoted, Next.js build17s. Source/unrelated edits preserved, original checkout synchronized after isolated D: build/deploy for C: storage failure.294app tests pass; no new website source/unit-test changes, prior stale featured-project failures remain. Device acceptance pending. [Release record](../focusquest/docs/25-density-apk-publication.md). Task record uncommitted.

**Codex — Nuqta download refresh, 2026-10-13: published/verified; claim released.** [Download](https://fhaj.dev/downloads/Nuqta-arm64.apk) is signed Nuqta ARM64 `0.1.0 (6)`,70,478,897bytes. APK-only commit98cf6c7 pushed on the existing published branch; clean archive staged, verified and promoted to fhaj.dev. Vercel dpl_8sHahTUcgFmypTgASXj6AeLmDiaP READY/Next.js build16s. Full staged and canonical public download SHA256 matches4763861c42afbb5a30a633bf468a72bcbc08cbbb5e038e44bfbf1dfdd04f7064; English/Arabic homepage links checked. Source/other task edits preserved. App250tests pass; portfolio76pass/3preexisting stale featured-project tests fail. Device acceptance pending. [FocusQuest publication record](../focusquest/docs/21-apk-publication.md). Task record remains uncommitted.

## Waiting on the user

- A client sentence from Nedaa, once she consents.
- **Before each deploy** run `node scripts/build-now.mjs` so the "Now building" strip reflects the sibling task files; the deploy cannot read them.
- Blocked on you: a client sentence from Nedaa (her consent).
- Decided by the owner on 2026-10-16: no public Instagram proof. The Instagram work is private and is never mentioned or shown on the site; the services copy names the channel as a capability and nothing more.

## Done

- 2026-10-18 — **SOLitaire production APK 1.1.7 / 16 live.** `22e525e` on `main` (cherry-pick of `568b94e`):
  `public/downloads/SOLitaire.apk`, 44,020,023 bytes, SHA-256 `fdc2d167…0d146801`, built from solitaire-dapp
  `ace1162`. Deployed from a clean archive of `22e525e` (`dpl_3u2j2TtKeSqnYX2Cd5uHxGeJn4G9`), promoted over
  Codex's `dpl_4BWFAZ…` (its 217eeea screenshot fixes) after checking that was still current; live download
  hash matches and the page still shows those fixes. Earlier the same day I promoted a committed-only build
  over Codex's then-uncommitted deploy for ~3 minutes and rolled it back: **check what fhaj.dev serves, and
  that the tree is committed, before promoting.**

- 2026-10-16 (deployed) — Commit cc38236 on `portal-elsewhereco-directions`, main fast-forwarded to it. Deployed from a clean archive of that commit with `vercel deploy --prod --skip-domain --yes --archive=tgz` (build 30 s), then `vercel promote dpl_8BFzp75pyKQs3djQCkSZTF4GxKX5`. fhaj.dev now serves the layered hero, the agent demo, the filters, the now-building strip and the new case studies; the Argus pages are gone. Vercel's security checkpoint answers 403 to curl and headless browsers, so verification was done in a real browser.

- 2026-10-16 (late) — The last of the review. **Layered hero**: the constellation render is replaced by a scene built from real captures in drawn device frames (ElsewhereCo laptop, Seeker Radar tablet, Nuqta and SOLitaire phones, the mark, an orbit), each on its own depth; the controller settles them from a slight zoom and lets them leave at different rates, scaled for portrait frames; swapping a product is replacing one image. **Deck loops**: silent captures of ElsewhereCo and Bab play inside the deck frames once visible, poster underneath, never under reduced motion (six products were recorded; only the two featured ones are installed, 5 MB). **Phone deck selector**: six numbered pills, the panel carries the name. **Nuqta** demoted to an index-weight card. The portal caption no longer repeats "Selected work". Lint, types, 84 tests and the production build pass.

- 2026-10-16 (night) — The rest of the review. **Visuals for the private builds**: the WhatsApp agent now shows its real simulator (desktop and phone) and operator dashboard, captured from the local stack with a seeded demo tenant and a sweets catalog; Nedaa Lifestyle shows the member home, the trainer dashboard, reports and the roster, rendered from the Expo web export against a mock of the plugin API with demo data; Darbak recaptured in light mode after its desktop redesign. **Talk to the agent**: a homepage section with a scripted copy of the agent's rules layer (intents, catalog-grounded prices and stock, approved delivery areas, owner acknowledgement, handoff reasons) in three languages, with tests; no model, nothing leaves the browser. **Filters** on the work section by WhatsApp, Telegram, AI, mobile and web, derived from each project's stack; **Now building** strip generated from the sibling task files by `scripts/build-now.mjs`. Lint, types, 84 tests and the production build pass.

- 2026-10-16 (later) — Executed the review: the hero experiment is gone (video, still and pan directions, the monogram and studio concepts, the switcher, the `?portal=` read, 6 MB of ElsewhereCo captures; the constellation stays and the home page is static again; its scene now rises 60% instead of leaving the frame empty). Recaptured Camp & Hike, ElsewhereCo, Go To Nature and Lulu Tokki at 2x, desktop and phone, cookie banners dismissed, as WebP; captured Bab's front door and Darbak's web preview (https://darbak-inky.vercel.app) the same way and linked Darbak. Index rows got thumbnails and status dots, the AI service row leads with WhatsApp, Instagram and Telegram chips and the message path, case pages no longer repeat the system shape when the hero already shows it, an "Install a preview" strip lists one build per app, WhatsApp comes first in the contact links on phones. Lint, types, 79 tests and the production build pass.

- 2026-10-16 — Replaced the three Argus projects with Bab, Nedaa Lifestyle and Darbak in `src/content/portfolio.ts` (trilingual, evidence-bounded, status `in-development`, no links); Bab takes Argus AI's featured slot; icon cards for the three new private builds; stale tests fixed (ElsewhereCo leads the deck) and Argus assertions replaced. Services, home summary, profile and the proof group now say "AI agents on WhatsApp, Instagram and Telegram", backed by the WhatsApp sales agent, Bab, the ElsewhereCo and Go To Nature Telegram operator agents and the private Instagram integration. Wrote [design/homepage/REVIEW-2026-10.md](design/homepage/REVIEW-2026-10.md): imagery verdict, polish list, ranked features. Not committed, not deployed.

- 2026-10-11 — Built three hero-reveal directions for ElsewhereCo on an experiment branch: Playwright captures (stills, transparent UI layer, clipped full page, 12.5 s desktop and phone loops encoded to MP4 and WebM, about 6 MB under `public/work/elsewhereco/`), art-directed `<picture>` sources by viewport, a `PortalVideo` client component that only plays on screen and never under reduced motion, and a pan act in `portal-motion.tsx` driven by the `--portal-open` and `--portal-pan` stylesheet variables. Lint, types and all 79 tests pass; headless screenshots at 1440×900 and 390×844 confirm every direction fills the frame on both.

- Updated the [Little Keepsakes case](https://fhaj.dev/ar/work/little-keepsakes) to Android preview 0.3.1 with compact editing, customization and thumb-reach stitching captures. The Arabic page and updated images returned 200; the 4,370,193-byte public APK matched the local build at SHA-256 `8445EA5CB81D3803AA9E9A1EBD0F9E93733FA59CA7358F174BF00A8A9F2FF805`.

- Added [Little Keepsakes](https://fhaj.dev/ar/work/little-keepsakes) as a trilingual case study with real app captures and a versioned Android preview APK. The 0.3.0 update shows twelve motifs, ten palettes and new customization controls. The production Arabic page returned 200 with the new text and link; the 4,366,949-byte public APK matched the local Android build at SHA-256 `FA4C275FBCE6881822582AF51EB59B4E9ED0A06016AC80246CAE72208704FC98`.

## Next

- Install the preview on a real phone and check Arabic/Hebrew keyboards, printing and a physical stitched sample before preparing a store release.
