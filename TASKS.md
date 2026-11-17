# Portfolio tasks

**Codex — Saqroon remaining labels, 2026-10-20: published/verified; claim released.** Three translated lab titles corrected in isolated commit75cb4e5a33703105cfc1c0dae48e234719d1f285; Vercel READY dpl_8vMhWudheeXznTgRLSmC3F4LGJCt.84 tests, scoped ESLint and production build pass; live EN/AR/HE names/accessibility checked at390/1440px as part of22 public cases. Now strip rebuilt with no content delta. Preserved intervening SOLitaire0099d99, signed downloads and task edits. [Shared evidence](../focusquest/docs/43-brand-residue-audit.md). Task record uncommitted; shared journal pending.

**Codex — Saqroon landing consistency, 2026-10-20: published/verified; claim released.** Current landing/Journey/question media and truthful development-preview copy in all3 languages; required Now strip rebuilt. Content commit `f8c91438898e2794d5fbd1b6632497e0f9536dfb` pushed main, Vercel READY `dpl_D3fcpKerevCCTraZAmyxNBX3VSYT`.84 tests, scoped lint, production build and9 local/9 live responsive cases pass. Existing signed Saqroon APK unchanged and range reachable99005689B; unrelated embeds not retested. [Shared FQ-11 evidence](../focusquest/docs/42-landing-consistency.md). Task record uncommitted; journal pending in shared outbox.

**Updated:** 2026-11-17 · **Phase:** public case studies and downloads; homepage rebuild cut over on its branch (steps 1–4), not yet live

**Codex — Nuqta download7 refresh, 2026-10-13: published/verified; claim released.** [Download](https://fhaj.dev/downloads/Nuqta-arm64.apk) is signed Nuqta0.1.0(7) ARM64 with remaining-page and approved density refinements,70,478,957bytes; full staged/public SHA73d2e5ec1f8fd17ab6f958bcb2ecc02acf62471bccd17d4d812e3e94912143a7. APK-only018740c pushed; Vercel READY dpl_7TGE1ZcVHVVJcj48W3cMx3khE9nc promoted, Next.js build17s. Source/unrelated edits preserved, original checkout synchronized after isolated D: build/deploy for C: storage failure.294app tests pass; no new website source/unit-test changes, prior stale featured-project failures remain. Device acceptance pending. [Release record](../focusquest/docs/25-density-apk-publication.md). Task record uncommitted.

**Codex — Nuqta download refresh, 2026-10-13: published/verified; claim released.** [Download](https://fhaj.dev/downloads/Nuqta-arm64.apk) is signed Nuqta ARM64 `0.1.0 (6)`,70,478,897bytes. APK-only commit98cf6c7 pushed on the existing published branch; clean archive staged, verified and promoted to fhaj.dev. Vercel dpl_8sHahTUcgFmypTgASXj6AeLmDiaP READY/Next.js build16s. Full staged and canonical public download SHA256 matches4763861c42afbb5a30a633bf468a72bcbc08cbbb5e038e44bfbf1dfdd04f7064; English/Arabic homepage links checked. Source/other task edits preserved. App250tests pass; portfolio76pass/3preexisting stale featured-project tests fail. Device acceptance pending. [FocusQuest publication record](../focusquest/docs/21-apk-publication.md). Task record remains uncommitted.

## Waiting on the user

- **Homepage rebuild: steps 1–4 done and checked on the Vercel preview** ([branch preview](https://portfolio-git-homepage-sheet-fatohhaj-2690s-projects.vercel.app)). Next, on your yes: merge to `main`, which puts it on fhaj.dev. Plan approved 2026-11-15; work is
  on branch `homepage-sheet` (local, not pushed). On the branch, `/`, `/ar` and `/he` now render the new page in
  Schibsted Grotesk; fhaj.dev is unchanged until you approve a push and merge. The new visitor copy in all three languages is
  drafted in [src/content/home.ts](src/content/home.ts): headline, chips, answers, answer headings and project
  names in Arabic and Hebrew script. It is part of your Arabic and Hebrew read before launch. **You: enable Web Analytics** for the `portfolio` project in Vercel →
  portfolio → Analytics (decided 2026-11-15; it was never on, so no events have ever been recorded; Pro bills
  $0.03 per 1,000 events). Tell me when it's on and I'll confirm `enabledAt` through the API. Launch gates:
  the Arabic and Hebrew read and the swap test.
- **Pick a homepage concept** from [the November review](design/homepage/REVIEW-2026-11.md): A "Follow one
  message", B "The thread", C "The spine", D "The opening", E "Receipts", F "The table". Try all six by hand
  in [the previews](design/concepts/2026-11/previews/index.html) (start `concept-previews` from
  `.claude/launch.json`, then `http://localhost:3130/design/concepts/2026-11/previews/`). Recommended after
  building them: D as the family, with E's proof lines, A's message demo and C's language sheet inside it.
  After the pick: EGM plan, device prototypes, then a branch. Also needed for the buyer block: availability,
  a starting price, the client sentence. The Arabic and Hebrew headlines in C and D need your read.
  **Owner's steer, 2026-11-10:** likes A, B, C, D without its title, and F; not E; A must answer from the
  portfolio's own catalog, not the sweets shop. [Preview G, the mix](design/concepts/2026-11/previews/g-mix.html)
  is built to that steer. Second pass the same day: the first screen is now the folded sheet on the card table
  instead of one flat colour, and the headline has three candidates to choose from (buttons 1, 2, 3 in the
  preview bar). **Owner chose headline 3 on 2026-11-10: "I build what answers your customers."** The picker is
  removed. Waiting for: whether the first screen is right, and your read of the Arabic and Hebrew headline.
- A client sentence from Nedaa, once she consents.
- **Before each deploy** run `node scripts/build-now.mjs` so the "Now building" strip reflects the sibling task files; the deploy cannot read them.
- Blocked on you: a client sentence from Nedaa (her consent).
- Decided by the owner on 2026-10-16: no public Instagram proof. The Instagram work is private and is never mentioned or shown on the site; the services copy names the channel as a capability and nothing more.

## Done

- 2026-11-17 — **Owner's review of the preview: two fixes (branch `homepage-sheet`).**
  - **The zoom through the ف** opened onto one flat ElsewhereCo screenshot. It opens onto the old scene
    again (laptop, tablet, two phones, the orbit); "See it" now swaps the laptop screen. Design doc 2.17.
  - **Saqroon is now Nuqta Kids · نقطة للأطفال** everywhere on the portfolio, Latin "Nuqta Kids" inside
    Hebrew (owner's choice), slug and anchor `nuqta-kids`. Saqroon, صقرون and סקרון stay as question-box
    aliases. Still Saqroon until the app side ships: the APK (`Saqroon-arm64.apk`), the screenshots under
    `public/labs/saqroon/`, and nuqtakids.com itself. The FocusQuest session ("UI/UX production readiness
    review") was told on 2026-11-17.
  - The deployment check now ignores SVG line endings on both sides, so it also passes on a local server.
  153 tests, type check, lint and build pass; checked in Chromium on desktop and phone in en/ar/he.

- 2026-11-17 — **Homepage rebuild: branch `homepage-sheet` pushed; Vercel preview checked.** Preview
  `dpl_BZgG3e8WVpLq1P6FmT2poScvtSFU` (target preview, only the branch alias; fhaj.dev unchanged). On it, all
  66 Playwright checks pass on `/`, `/ar` and `/he` at desktop, phone and 360×640, with no console errors,
  and `verify-brand-deployment.mjs` passes on all six routes and four icon files. One script fix: it
  compared the SVG against this Windows checkout, whose lines git converts to CRLF (808 bytes against the
  deployed 803); it now ignores `
` for SVGs. Not checked: a real phone, Safari, Firefox.

- 2026-11-17 — **Homepage rebuild step 4, the deployment check (branch `homepage-sheet`, not pushed).**
  `scripts/verify-brand-deployment.mjs` now also asserts in the server HTML of `/`, `/ar` and `/he`: a
  `wa.me` link, the résumé link, `#work`, `#contact`, `#services`, `#process`, `#saqroon`, the contact form,
  twelve cards and one `h1` matching the headline. Found and fixed while running it: the logo check compared
  the full image address, and Vercel appends `?dpl=…`, so the script failed on every Vercel deployment; it
  now compares the path. Passes on the local production build; fails on today's fhaj.dev at "Expected twelve
  cards", as it should. Not yet run on a Vercel preview.

- 2026-11-17 — **Homepage rebuild step 3, the cut-over (branch `homepage-sheet`, not pushed).** `page.tsx`
  renders `HomeSheetPage` with the same JSON-LD; `layout.tsx` loads Schibsted Grotesk under `--font-latin`
  in place of Space Grotesk. `npm run build` passes with every route static; type check, 152 tests and lint
  pass. On `npm run start` in Chromium, desktop and phone, `/`, `/ar` and `/he`: the history checks (same
  document, case address, turn, Back, direct load is the case page), answers, the font, no overflow, and
  the résumé and WhatsApp buttons fully inside 360×640. The only console errors are Vercel's two analytics
  scripts, which 404 off Vercel. Not checked: a real phone, Safari, Firefox, a Vercel preview.

- 2026-11-16 — **Homepage rebuild step 2 (branch `homepage-sheet`, not pushed).** Built the components under
  `src/components/home/`:
  - the fold with the question box;
  - the zoom through the ف, driven by the unchanged `PortalMotion`;
  - twelve cards with the deal and calls;
  - the project sheet: a native dialog with the case-page address, and a three-language turn;
  - the thread;
  - `SiteFooter`, shared with the old page.

  Added `onReady` to `LiveEmbed` and `demo_send` to the agent demo. 152 tests pass (45 new, including the
  "nothing lost" test against the old page); type check and lint pass. Checked on a temporary route in
  Chromium at 1440 and 390 wide, in English and Arabic: no errors, no overflow, buttons inside the first
  screen, answers, unknown to WhatsApp, sheet open, turn and Back. Two fixes came from looking: card names
  overlapped their pictures, and on phones the deal never fired. Departures are recorded in the design doc,
  section 2.16. Not checked: a real phone, Safari, Firefox, `npm run build`.

- 2026-11-15 — **Homepage rebuild step 1 (commit `278ca2e` on `homepage-sheet`, not pushed).** Added
  `home.ts` (all new copy, in three languages), `home-cards.ts` (the twelve cards from the content files),
  and `home-ask.ts` with `home-answers.ts` (the question rules). Matching uses whole words and handles Arabic
  and Hebrew prefixes; answers are always in the page's language. The ask module was split so that no content
  reaches the browser bundle, and the matcher now covers all three languages. `form.failed` drops "below".
  Type check, 107 tests and lint pass. Nothing renders the new code yet.
- 2026-11-15 — **Homepage rebuild step 0 (branch `homepage-sheet`, not pushed).** Reference material
  committed (`c62051c`). The spike passed 51 of 51 checks on `/`, `/ar` and `/he` (branch
  `spike/sheet-history`, never merged): `pushState` to the case-page address keeps the homepage rendered,
  Back, Forward, Escape and refresh behave, and the case-page language switch is not intercepted. Learned:
  a sheet opening counts as a case-page pageview, and printing `usePathname` breaks hydration on English
  pages (the proxy serves `/` as `/en`). Vercel: Pro plan, 2 fields per event, and **Web Analytics never
  enabled**, so no events have been recorded. Speed baseline from `scripts/lab-speed.py`, median LCP: `/`
  2624 ms, `/ar` 2908 ms, `/he` 2876 ms. Details:
  [REVIEW-2026-11.md §12](design/homepage/REVIEW-2026-11.md).
- 2026-11-15 — **Owner answered the review's three questions.** The "Now" phase lines stay, one under each
  card's title. A download row on each card replaces the install strip, which is a signed removal. `#agent` is
  dropped because nothing outside the site links to it. The "nothing lost" test now checks the phase lines and
  leaves out `#agent`.
- 2026-11-15 — **Review fixes applied to the homepage design (auto accept; nothing in `src/` changed,
  nothing committed).** All 16 fixes are in [DESIGN-2026-11.md](design/homepage/DESIGN-2026-11.md). Choice A4
  replaces A3: Next's patched `pushState` keeps the homepage rendered while the address shows `/work/<slug>`
  (read in `app-router.js`, not run), so the route group, slot and intercept page are gone. Also: islands
  only enhance server markup, every answer is rendered on the server in the page's language, cards are
  `<article>`s with visible download rows, "See it" is a link to `#portal`, `PortalMotion` is left untouched,
  and there is a Risks table and a glossary. Three contests stood. [Resolution](design/homepage/egm-review/goldfish_review_report.md).
- 2026-11-15 — **EGM review of the homepage design: not ready to build (nothing in `src/` changed, nothing
  committed).** Five stages, nine reviewers, reports in [egm-review/](design/homepage/egm-review/). 3
  Blockers: cards with links inside links, a "nothing lost" test that demands ~30 ids nobody uses, and
  interception that also fires from case pages (read in Next's rewrite source, not run). Biggest lever:
  re-decide choice A (A1 for all cards). Contested: the conversion baseline (owner already ruled traffic too
  small).
- 2026-11-11 — **Homepage design written with EGM (nothing in `src/` changed, nothing committed).**
  [DESIGN-2026-11.md](design/homepage/DESIGN-2026-11.md): seven user journeys, the technical plan, 12
  alternatives beside the seven rejected earlier, every file to touch in build order, and a verification plan. Owner choices: a card click shows
  the sheet over the homepage with the case-page address (an intercepted route in a `(home)` group);
  `/ar` and `/he` mirror the fold; Instagram stays named as a channel; Schibsted Grotesk sitewide; one
  cut-over commit; the agent and SOLitaire chips open their sheets; an answer replaces the chips. Two
  non-goals narrowed for those. Open: a throwaway test of whether English `/work/<slug>` clicks are caught.
  Earlier the same day: launch check is the "nothing lost" test, swap test covers every visitor sentence,
  seven new tracking events.

- 2026-11-11 — **Homepage removals decided; SOLitaire stays live on the homepage.** Work filters dropped,
  evidence lists stay on case pages only, the Bab and ElsewhereCo video loops move into their sheets. The owner
  kept the interactive SOLitaire website and the playable table on the homepage: in preview H both now run live
  inside SOLitaire's sheet (hero in place of the still, "Play a hand" below), with a "Play SOLitaire" chip in
  the first screen. Checked over the preview server in English at 1280 and Arabic at 390: both frames load,
  scale and are dropped on Back. Recorded in [concepts_brief.md](concepts_brief.md).
- 2026-11-10 — **Preview H: G redrawn at the real scope, after the review (nothing in `src/` changed, nothing
  committed).** The owner agreed to tame three devices: the ف zoom plays on a tap or the visitor's own scroll,
  the route is one strip under the answer, cards deal face down and land face up. Built
  [h-scope.html](design/concepts/2026-11/previews/h-scope.html) with `?l=en|ar|he`: the site's header, résumé
  and WhatsApp in the first screen, answers in three languages that never claim something was sent (unknown
  questions offer WhatsApp with the visitor's own text), services and process kept as a visible thread with
  the ids the header links to, the contact form and all five contact links, every download and case link,
  Saqroon as a card with its own links, the sweets demo interactive inside the WhatsApp agent's sheet, and
  Back closing the sheet. Copy, links and statuses are generated from `src/content` by `build-data.mjs`.
  Headless Chromium, three locales at 1280×800, 390×844, 375×667 and 360×640: no errors, no sideways scroll,
  both first-screen buttons visible at every size. Not tried on a real phone. Decisions are in
  [concepts_brief.md](concepts_brief.md).
- 2026-11-10 — **EGM brainstorm on the homepage rebuild: six reviewers say it is not ready to plan.** The owner
  approved preview G's direction and asked for a plan. Audience set as three readers (owners, hirers, project
  clients); résumé and WhatsApp go in the first screen. Six independent reviewers read the preview and the
  production code: 7 blockers, 12 major, 12 minor, all in [concepts_brief.md](concepts_brief.md). Main ones:
  the preview drops actions the live page has (résumé, email, form, APK downloads, case links, Saqroon's links),
  the header's Services and Process links would go dead, the question box says a question was "passed on" when
  nothing is sent, and the page in scope has never been drawn. The ف zoom already exists in production
  (`brand-portal.tsx`, `portal-motion.tsx`) and should be reused. Nothing run by reviewers; no code changed.
- 2026-11-10 — **Preview G, the mix (nothing in `src/` changed, nothing committed).** The owner liked A, B,
  C, D without its title and F, and said A should use his own catalog. Built
  [g-mix.html](design/concepts/2026-11/previews/g-mix.html), each idea with one job: C's spine is the first
  screen, B's question box sits in it, the page opens through the eye of the ف (D, wordless) onto the project
  asked about, A's rail follows the message through rules that read the twelve projects, F's cards are the
  work, and a card opens onto C's turning sheet with each project's own category and summary in three
  languages (`mix-copy.js`, generated from `portfolio.ts`). The sweets shop appears only inside the WhatsApp
  agent's card. Headless Chromium at 1280×800 and 390×844: no console errors, no sideways scroll. Not tried
  on a real phone. Record: [review §10](design/homepage/REVIEW-2026-11.md).
  Second pass after the owner's read: new first screen (sheet on the card table, two leaf colours, real
  captures on the cards), three headline candidates, and a fix for the sweets demo showing in every project.
- 2026-11-10 — **Six clickable concept previews and three more families (nothing in `src/` changed, nothing
  committed).** Owner asked to try the ideas by hand and for more of them. Built
  [design/concepts/2026-11/previews](design/concepts/2026-11/previews/index.html): throwaway HTML for A, B, C
  and three new families (D the opening, from فتح and the eye of the ف; E receipts, every claim opens to its
  proof, with an in-browser SHA-256 check of a downloaded build; F the card table). Real captures, addresses
  and APK hashes (read from `public/downloads` today), and a port of the demo rules. Checked in headless
  Chromium at 1280 and 390: no console errors, no sideways scroll; not on a real phone. Added a
  `concept-previews` static server to `.claude/launch.json` because the previews share a script and the
  browser pane snapshots `file://` pages. Wrote section 9 of the review; the recommendation moved from A+C to
  D as the family. Learned: the name itself is the least copyable device, and a whole-page pipeline walk
  ends on a layer a shop owner does not care about. Two design-hook contrast findings on `e-receipts.html`
  were static false positives and are ignored for that file in `.impeccable/config.json`.
- 2026-11-10 — **Review and three concept directions (nothing in `src/` changed, nothing committed).** Owner
  asked for a review, ideas that make the site unmistakable, and a video. Wrote
  [REVIEW-2026-11.md](design/homepage/REVIEW-2026-11.md): inspector measurements of the homepage (the `h1` is
  the bare name, the one headline a competitor could not use sits 4,900 px down, 20 font sizes with 14 px
  body, 9 screens), an inventory, three device families with their competitor tests, and library and template
  findings from a web check. Built a throwaway concept film from the repo's real captures and the agent
  demo's own catalog values: [concept-film.html](design/concepts/2026-11/concept-film.html) (CSS on one
  timeline, scrubbable) and a 50 s MP4 captured frame by frame with Playwright and ffmpeg. Learned: "ask my
  AI" chat portfolios are now a template, and no award-level trilingual portfolio turned up, so the three
  scripts are the least copyable asset. `.taste-skill/` (the design skill's working folder) is untracked.
  Skills used at the owner's choice: redesign-existing-projects, signature-theme, design-taste-frontend,
  prototype, animate, copywriting.

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
