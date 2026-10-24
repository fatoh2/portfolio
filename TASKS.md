# Portfolio tasks

**Codex — Saqroon remaining labels, 2026-10-20: published/verified; claim released.** Three translated lab titles corrected in isolated commit75cb4e5a33703105cfc1c0dae48e234719d1f285; Vercel READY dpl_8vMhWudheeXznTgRLSmC3F4LGJCt.84 tests, scoped ESLint and production build pass; live EN/AR/HE names/accessibility checked at390/1440px as part of22 public cases. Now strip rebuilt with no content delta. Preserved intervening SOLitaire0099d99, signed downloads and task edits. [Shared evidence](../focusquest/docs/43-brand-residue-audit.md). Task record uncommitted; shared journal pending.

**Codex — Saqroon landing consistency, 2026-10-20: published/verified; claim released.** Current landing/Journey/question media and truthful development-preview copy in all3 languages; required Now strip rebuilt. Content commit `f8c91438898e2794d5fbd1b6632497e0f9536dfb` pushed main, Vercel READY `dpl_D3fcpKerevCCTraZAmyxNBX3VSYT`.84 tests, scoped lint, production build and9 local/9 live responsive cases pass. Existing signed Saqroon APK unchanged and range reachable99005689B; unrelated embeds not retested. [Shared FQ-11 evidence](../focusquest/docs/42-landing-consistency.md). Task record uncommitted; journal pending in shared outbox.

**Updated:** 2026-10-24 · **Phase:** public case studies and downloads

**Codex — Nuqta download7 refresh, 2026-10-13: published/verified; claim released.** [Download](https://fhaj.dev/downloads/Nuqta-arm64.apk) is signed Nuqta0.1.0(7) ARM64 with remaining-page and approved density refinements,70,478,957bytes; full staged/public SHA73d2e5ec1f8fd17ab6f958bcb2ecc02acf62471bccd17d4d812e3e94912143a7. APK-only018740c pushed; Vercel READY dpl_7TGE1ZcVHVVJcj48W3cMx3khE9nc promoted, Next.js build17s. Source/unrelated edits preserved, original checkout synchronized after isolated D: build/deploy for C: storage failure.294app tests pass; no new website source/unit-test changes, prior stale featured-project failures remain. Device acceptance pending. [Release record](../focusquest/docs/25-density-apk-publication.md). Task record uncommitted.

**Codex — Nuqta download refresh, 2026-10-13: published/verified; claim released.** [Download](https://fhaj.dev/downloads/Nuqta-arm64.apk) is signed Nuqta ARM64 `0.1.0 (6)`,70,478,897bytes. APK-only commit98cf6c7 pushed on the existing published branch; clean archive staged, verified and promoted to fhaj.dev. Vercel dpl_8sHahTUcgFmypTgASXj6AeLmDiaP READY/Next.js build16s. Full staged and canonical public download SHA256 matches4763861c42afbb5a30a633bf468a72bcbc08cbbb5e038e44bfbf1dfdd04f7064; English/Arabic homepage links checked. Source/other task edits preserved. App250tests pass; portfolio76pass/3preexisting stale featured-project tests fail. Device acceptance pending. [FocusQuest publication record](../focusquest/docs/21-apk-publication.md). Task record remains uncommitted.

## Waiting on the user

- A client sentence from Nedaa, once she consents.
- **Before each deploy** run `node scripts/build-now.mjs` so the "Now building" strip reflects the sibling task files; the deploy cannot read them.
- Blocked on you: a client sentence from Nedaa (her consent).
- Decided by the owner on 2026-10-16: no public Instagram proof. The Instagram work is private and is never mentioned or shown on the site; the services copy names the channel as a capability and nothing more.

## Done

- 2026-10-24 — **Portal scene on phones: the two phone frames no longer cover the ElsewhereCo laptop.** Owner
  saw it on mobile: after the ف opens, Saqroon and SOLitaire sat over most of the laptop screen. Cause: the
  phones were anchored with `bottom:` percentages and were tall enough to reach into the laptop, and the pan
  lifts the nearer layers 30–50px further than the laptop. Fix in `homepage.css` (≤759px only): the stage is a
  size container, the phones are placed from the top at the laptop's bottom edge plus a gap, and their width
  is capped so they clear the stage floor on short screens. Checked at 375×812 and 360×640 at rest and at the
  end of the pan; lint passes.

- 2026-10-24 (night) — **The hand is dealt, and the ring is back on phones.** Owner asked for more and for other
  ideas with previews. Five compositions were built as switchable variants and screenshotted side by side at
  375×812 (dealt hand, cascade, orbit, bleed, on the table); the owner picked the dealt hand. What it gained:
  the phones now start stacked behind the laptop's centre while the ف is still closed and slide out into the
  fan as it opens (translate from `--portal-settle`, 17–19cqw); the desktop orbit returns as a tall ring
  tilted with the fan (a second SVG, `scene-orbit-portrait`, shown under 760px only) with its two acid dots;
  the farther card is dimmed to 0.92. The losing variants were removed from the stylesheet. Checked at 375×812
  through the opening (35%, 60%, 80%), rest, mid-pan and the end: every frame stays on the stage. 84 tests,
  lint, types pass. Learned: the dev server's image optimizer hangs on requests that accept AVIF (a browser
  never gets the image; curl without that header gets it at once), so headless checks against the dev server
  route `/_next/image` to the raw file under `public/`; production (Vercel's optimizer) is unaffected.

- 2026-10-24 (evening) — **The mobile portal scene is a dealt hand of cards.** Owner: "make this more
  creative looking". Idea from the subject (SOLitaire's own object): under 760px the laptop is the back card,
  upright at the top; the two phones fan out in front of it, tilted away from each other (SOLitaire −5°, on the
  left and larger, over the laptop's dark silhouette; Saqroon +4.5°, on the right), overlapping in the middle
  with their bottoms over the laptop's lower edge. The fan opens as the ف finishes opening and spreads 1.5°
  more as the scene leaves, drifting toward the middle so no tilted corner leaves the stage. Mechanism: the
  controller now publishes `--portal-settle` and `--portal-leave` on the root; the stylesheet drives the
  `rotate` and `translate` properties from them, which the controller's `transform` translate leaves alone.
  Desktop scene untouched. Checked headlessly at 375×812, 360×640 and 430×932 through the opening, rest, mid-pan
  and the end: every frame stays inside the stage. 84 tests, lint, types pass. Skills used at the owner's
  choice: design-taste-frontend (section rules, screenshot critique; the page-wide inspector was not run, the
  rest of the page is out of scope), animate, webapp-testing.

- 2026-10-24 (later) — **Portal phones higher, Saqroon rendered from today's app.** Owner: the phones should sit
  higher even if they touch the laptop, and the Saqroon and SOLitaire stills were old. The phones now start
  3cqh above the laptop's bottom edge (22px over it at rest on a 375 phone) and are a little wider. **Saqroon**:
  the journey and question screens were re-rendered with the app's own store-shot test from an isolated copy of
  the working tree (the repo itself is mid-edit by Codex: Sunshine & Sky palette and the Nuqta Kids return), so
  the portal phone and the lab now show the blue-and-yellow palette; new dated filenames
  (`saqroon-*-ar-20261024.png`), the 20261020 files stay. Flutter SDK found at
  `~/.cache/focusquest-tools/flutter`. **SOLitaire**: the Classic-table still was checked against production
  (app.sol-solitaire.com, captured today, pixel diff 1.8 on a 200px thumbnail, the old court capture scores 22)
  and against what fhaj.dev serves (same bytes, `Cache-Control: max-age=0, must-revalidate`, so no stale cache):
  it is the current production table. staging.sol-solitaire.com serves the landing site, not the game, so no
  newer public table exists to capture; left as is pending the owner saying what they compare it with.

- 2026-10-24 — **Captures refreshed where the products changed.** Owner's ask: most apps and sites had moved on
  since their captures. Checked every sibling repo's commits since its capture date and each live site, then
  retook only what changed, from production with headless Chromium (desktop 1440×900 @2x, phone 390×844 @2x,
  cookie bars dismissed, WebP): **ElsewhereCo** (reviews link in the nav, phone spacing), **Go To Nature**
  (the two-menu navbar and the field-page homepage that is live; the `tatreez-stitches` branch is not deployed,
  so not shown), **Bab** (the redesigned front door). **Seeker Radar** had been captured on 2026-08-28, before
  its September redesign: all three screens retaken (dark store-sweep home 1280×720, app brief and changelog
  390×844), sizes updated in the content, the portal tablet and the showcase crops re-aimed (the sweep card
  with the featured app; the brief's rating and score). **Nedaa Lifestyle** now leads with the real app on an
  iPhone: the class schedule from the App Store set (nedaa-lifestyle `6492aea`, 780×1691) instead of the mock
  member home. The owner asked for a screen without their name, so the home screen (the owner's own account)
  is not used; the old mock stays at its URL, unreferenced. Kept as they were after a pixel diff against fresh captures: SOLitaire (home, Classic
  table, live table), Darbak, Camp & Hike, Lulu Tokki; and the WhatsApp agent, Saqroon and Little Keepsakes,
  whose repos have not changed since their captures. Now strip rebuilt. 84 tests, lint and types pass; the
  homepage deck, portal scene and Nedaa page checked headlessly at 1440 and 375.

- 2026-10-20 — **SOLitaire screens retaken after the game redesign.** Once the owner signed off and the redesign was
  live (solitaire-dapp `6ef5dd5` on production, `dpl_DuwJ5VgP…`), recaptured from production: the game home
  (desktop gallery shot and its "Choose your game" crop), the app's Classic table in the portal scene, and the
  playable table still (the embed now uses the game's score bar and square buttons). Same filenames, so no code
  change; 84 tests pass. Pushed on top of Codex's `f8c9143`, which was what fhaj.dev served; Codex's uncommitted
  `ui.ts` lab rename (FocusQuest → Saqroon) was left out.

- 2026-10-20 — **Pushed `main` to GitHub (owner's go).** The project is git-linked with `main` as its production
  branch, so the push rebuilt fhaj.dev from git: `dpl_AhkKkDZCbfEAS32JJaznJRGZerTF` (same site as the promoted
  `dpl_yGPXKGBX…`, which is now the rollback). Re-checked live: both SOLitaire embeds play, APK downloads.
  **Every push to `main` redeploys fhaj.dev**, so only push a `main` that is ready to be live.

- 2026-10-20 — **Live SOLitaire hero and playable table on fhaj.dev.** Checked first that fhaj.dev's
  `dpl_2T4rew8f…` matched `main` at `630f6db` (live SOLitaire APK hash = committed, old screenshots), refreshed the
  now-building strip (`4820a4f`), deployed a clean archive of `4820a4f` with `--skip-domain --archive=tgz` and
  promoted `dpl_yGPXKGBXXMihPNffbNEbnfBoNDYE`; rollback `dpl_2T4rew8fH7WU3ifbkT6K9KLYyQFF`. Verified on fhaj.dev
  with real mouse clicks (Playwright): all three frames ready from sol-solitaire.com within 4 s, Hearts repaints
  the hero ruby and holds it, a tap on the 5♠ plays it and turns up the 2♣. Note: element boxes inside a scaled
  frame ignore the scale, so automated clicks must map coordinates by hand; the desktop pane's click tool refuses
  scaled cross-origin frames outright.
- 2026-10-20 — **SOLitaire's phone frame is a playable table.** `62792f9`: the
  gameplay media embeds sol-solitaire.com `/embed/table` over a still of its first deal, in the deck's phone
  frame and the case-study gallery; tap to play, draw, undo, deal again. 84 tests, tsc, eslint pass; played
  through the local frame. Needs solitaire-dapp `ec0393a` on production first.

- 2026-10-20 — **SOLitaire leads with the live suit hero (committed, not deployed).** `32ed2b8` on `main`:
  the deck panel and case study show the website hero running in a frame over its still (`LiveEmbed`,
  `ProjectMedia.embed`), so visitors can pick a suit and watch the page take its colour; the still stays until
  the page reports ready. All SOLitaire media recaptured from the suit redesign (hero desktop/phone, Classic
  table, game home); crops, captions and the portal scene's phone follow. 84 tests, tsc, eslint pass; checked
  against the local SOLitaire server. **Order to ship:** deploy solitaire-dapp `8c97e2e` (serves `/embed/hero`,
  framable only by fhaj.dev) to production first, then this; until then the stills show. Method:
  [design/solitaire/capture-notes.md](design/solitaire/capture-notes.md).

- 2026-10-18 — **SOLitaire production APK 1.1.8 / 17 live.** `4d3a314` on `main` (APK only; the now-building
  strip was current). Before promoting, checked that fhaj.dev's `dpl_2UTJXw…` was `969d310` (Saqroon): committed
  16:51:21, deployed 16:52:03, live Saqroon and SOLitaire hashes matched the commit. Clean archive deployed
  (`dpl_ATZfUa8MQ4xZTjPRVDCGpoVa5SYy`) and promoted; live download 44,024,471 bytes, SHA-256 `f8111677…83a0115f`;
  Saqroon unchanged. Rollback `dpl_2UTJXw…`.

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
