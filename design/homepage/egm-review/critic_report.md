# Stage 7 — Critic Review

**Target:** [DESIGN-2026-11.md](../DESIGN-2026-11.md), FeatureRange (lines 1–550)
**Date:** 2026-11-15
**Standards:** `feature-spec-standard.md` (design and structural lenses). The style lens uses its own persona rules.

## Reviewer Status

| Reviewer | Status | Raw result |
| --- | --- | --- |
| `egm-design` | completed | 11 Major, 5 Nits |
| `egm-structural` | completed | 5 Major, 9 Nits |
| `egm-style` | completed | 6 Major, 11 Nits |

No reviewer ran anything. Next.js behaviour was read from the docs in `node_modules/next/dist/docs`. After deduplication there are 0 Blockers, 17 Majors and 16 Nits. The tag after each heading names the reviewers who raised that finding.

**Triage note.** The style reviewer called "(see 2.5)" a broken cross-reference. It points to implementation step 2.5, which sits outside the range that reviewer read, so it is listed as a Nit (N8).

## Prioritized Findings

### C1. The error boundary's empty fallback deletes the server HTML it claims to protect (Major, design + structural)

- **Scope:** "When script breaks" (381–387); NFR "Script failure" (535–536); lines 205, 249–251.
- **Problem:** `AskBox` renders the chips, and `WorkTable` wraps the server-rendered `#work` list. When either island throws, the boundary removes its whole subtree, so the twelve cards, the `#work` target and the chips all disappear. These boundaries also do not catch errors thrown in event handlers or async code (10-error-handling.md).
- **Fix:** Wrap only the enhancement, not the markup. Either the fallback re-renders the plain links, or the islands attach behaviour to markup they do not own (the `WorkFilters` pattern). Add a test that forces a throw inside each island and checks that the cards, chips and `#work` are still on the page.
- **Same finding in other stages:** Stage 5 #4, Stage 6 #4.

### C2. The sheet's case-page link is probably intercepted again, and the slot may show stale content (Major, design + structural)

- **Scope:** 210, 309–319, 327–328.
- **Problem:** With the sheet open, the address is already `/work/<slug>`. A `next/link` to that address is decided against the homepage's `nextUrl`, so it is likely intercepted again and the full page never opens. Separately, `default.tsx` only renders on hard loads. On a soft navigation the slot keeps its last content, which is why parallel-routes.md (408–464) recommends a catch-all page that returns null.
- **Fix:** Make the in-sheet link a plain `TrackedAnchor`, so it does a full page load. Add `@sheet/[...catchAll]/page.tsx` returning null. Add both checks to the throwaway test.
- **Same finding in other stages:** Stage 5 #2, Stage 6 #6.

### C3. Android Back and Escape close a `showModal()` dialog without going through browser history (Major, design)

- **Scope:** 318–319, 324–325; CUJ 4 (140–146).
- **Problem:** On Android Chrome, the system Back gesture and the Escape key fire `cancel` and close the dialog. Browser history is not touched. In route mode the address stays `/work/<slug>`: the next Back press does nothing visible, and the one after leaves the site. In dialog mode (Saqroon), the history entry pushed when the dialog opened is left behind.
- **Fix:** Handle `cancel` with `preventDefault()`, then call `router.back()` in route mode or `history.back()` in dialog mode. Guard against the `popstate` that follows closing the dialog a second time. Add Android Back and desktop Escape to the device gate.

### C4. "See it" is specified three ways (Major, design)

- **Scope:** Overview (25–26); CUJ 2 (125–127); zoom (279–284); Alternative E (469–475); the non-goal at line 90.
- **Problem:** The three descriptions are "plays the zoom", "swaps the picture and moves focus", and "`zoom_play` fires when the visitor scrolls past halfway". Moving focus scrolls the page unless `preventScroll` is set. Scrolling is the reason Alternative E was rejected, while `preventScroll` sends focus somewhere a sighted visitor cannot see.
- **Fix:** Choose one behaviour, state it in all three places, and rewrite CUJ 2's "Then" so it can be tested.
- **Same finding in other stages:** Stage 5 N5, Stage 6 #1.

### C5. Keeping the scroll position when the sheet opens and closes is promised, not designed (Major, design)

- **Scope:** CUJ 4 (144); work table (297–299).
- **Problem:** A Next `Link` scrolls to the newly rendered segment by default. Here that segment is a `<dialog>` that stays hidden until `showModal()` runs, and nothing in the design turns the scroll off.
- **Fix:** Put `scroll={false}` on the card links and on the two sheet chips. Add "open a card from mid-page, press Back, compare the scroll offsets" to the throwaway test.

### C6. Whole-word matching misses Arabic and Hebrew words written with an attached prefix (Major, design)

- **Scope:** Matching (259–263).
- **Problem:** The `(?<!\p{L})…(?!\p{L})` lookarounds correctly stop باب from matching inside أسباب. They also reject السعر for سعر and בסוליטר for סוליטר, because the prefixes ال و ب ل ف and ה ו ב ל מ ש כ are written onto the word. `normalize` does not strip prefixes.
- **Fix:** Allow an optional known prefix for each locale before every alias and pattern. Add prefixed forms to the step 1.6 fixtures.

### C7. Accessibility of the answer swap, the sheet's language turn and the motion is not specified (Major, design)

- **Scope:** Goals (72–73); question box (249–252, 264–267); sheet (327–330).
- **Problem:** Each of these is left undefined:
  - The focused chip is removed when the answer replaces the chips, and nothing announces the answer.
  - No focus target is named after "Ask another" or after the sheet closes.
  - When the sheet turns to Arabic or Hebrew on an English page, its text has no `lang` or `dir`.
  - Reduced motion is covered only for the deal, not for the turn or the fold.
- **Fix:**
  - Move focus to the answer, or put the answer in a polite live region.
  - Return focus to the first chip after "Ask another", and to the opening card after the sheet closes.
  - Set `lang` and `dir` on the sheet's text to match the language shown.
  - Make the turn and the fold instant under reduced motion.

### C8. The deal plays at hydration, so the cards flash and cannot be read (Major, design)

- **Scope:** Work table (293–302).
- **Problem:** The server paints readable cards. Hydration then flips them face down and deals them again, even when `#work` is off screen or was reached by its hash (CUJ 7). A tap during the deal lands on a face-down card.
- **Fix:** Start the deal when `#work` first enters the viewport. Skip it if the section is already in view or was reached by hash. Keep the links clickable throughout, and state a limit on how long the deal takes.

### C9. The question box ships all three languages' rules and answers to every visitor (Major, design)

- **Scope:** Data diagram (193–197); NFR "Speed" (530–532).
- **Problem:** `home-ask.ts` imports `home.ts`, so all three languages land in the client bundle, which brief M6 warned about. The design also sets no JavaScript budget.
- **Fix:** Pass the island only the page locale's patterns and card references, as props. Show answers that are already in the server HTML. Add a first-load JavaScript budget per route, measured against today's build.
- **Same finding in other stages:** Stage 5 #5.

### C10. There is no Risks and Mitigations section, which the standard requires (Major, design + structural)

- **Scope:** Whole spec; the section belongs between Alternatives (422) and NFR (526).
- **Problem:** Risks are scattered across Open Questions, the "Fails when" rows, the NFR section and Alternative F, and several have no mitigation:
  - interception through the proxy rewrite and the route group;
  - `unstable_catchError` changing in a later Next release;
  - growth of the JavaScript bundle;
  - the Vercel plan rejecting custom events;
  - the quality of the Arabic and Hebrew copy;
  - SOLitaire's embed only working on fhaj.dev;
  - the length of the `wa.me` prefill built from visitor text;
  - the `/embed/*` iframes;
  - the contact action has no rate limit.
- **Fix:** Add a `## Risks & Mitigations` table with columns for risk, likelihood and impact, mitigation, and owner or gate. Point the scattered mentions to it.

### C11. Nothing guards hirer and client conversions (Major, design)

- **Scope:** Problem (49–53); Goals (55–77); NFR (526–536).
- **Problem:** Speed has a baseline and a "no worse" gate. Résumé downloads, WhatsApp clicks, `brief_submit` and APK downloads have none, so the only rollback trigger is the owner noticing something is wrong.
- **Fix:** Before the cut-over, record a baseline of those four events per visitor, for each locale. Set a review window after launch, for example 30 days, and a drop size that triggers a fix or a rollback.

### C12. The owner's decisions are recorded three or four times, and the copies already disagree (Major, style + structural)

- **Scope:** 83–88, 97, 307, 347, 364, 374; Owner choices (389–420); Alternatives H–L (491–524).
- **Problem:** Each of choices A–D appears as a tag in the body, in the choice tables, and again as Alternatives H, I, J and L. The copies have drifted apart:
  - The narrowed non-goal (83–88) is still called "broken" at 398 and "kept" at 522.
  - Table A still names the slot `@modal/(.)work/[slug]`, while the design uses `@sheet`.
  - "Kept here for the record" is filler.
- **Fix:** Keep one record, either the tables or Alternatives H–L, and tag the body briefly, for example "(choice A3)". State the current non-goal with its two exemptions as separate bullets. Mark the superseded cells or delete them.

### C13. Some alternatives are rejected with no reason given (Major, structural + style)

- **Scope:** "Rejected before planning" (426–434), including Concept E ("Not picked") and the line "Dropped; its zoom…"; Alternatives I, K, L.
- **Problem:** "The owner chose X" says who decided, not why. Alternative I does not say why B1's own failure mode is the better trade.
- **Fix:** Give one sentence of rationale for each, or write "Owner preference; no reason recorded."

### C14. The same letters and numbers name four different things (Major, structural)

- **Scope:** 14, 364, 391–420, 422–524.
- **Problem:**
  - "B1" is both a brainstorm finding and owner choice B1.
  - "A" is Concept A, owner choice A and Alternative A.
  - Alternatives H–L restate owner choices A–D under different letters.
- **Fix:** Use a prefix every time: "finding B1", "choice B1", "Alt-I", "Concept A". Or renumber the alternatives ALT-1 to ALT-12.

### C15. "Sheet" means two things (Major, style)

- **Scope:** 1, 18, 28, 66, 202, 209, 304–338, 371.
- **Problem:** "Sheet" names both the folded first screen and the project popup. The page-wide names `HomeSheetPage`, `home-sheet.css` and `.sheet-home` add to the confusion, so line 66 is ambiguous.
- **Fix:** Keep "sheet" for the project popup and call the first screen "the fold", or the other way round. Rename the files and classes to match.

### C16. Terms taken from the preview are never defined (Major, style)

- **Scope:** 241, 265–266, 469, 473–475.
- **Problem:** "Strip of four stops", "four-step rail", "felt" and "ten nodes across five sections" only make sense with preview H open.
- **Fix:** Define each term once, for example "a status line with four fields (detected language, matched intent, answer source, whether a person takes over)", then use that same name everywhere.
- **Same finding in other stages:** Stage 6 #8, which asks for the zoom's terms to be defined too.

### C17. The guard count disagrees with the list (Major, style)

- **Scope:** 282–283 against 448.
- **Problem:** Line 448 says "six real-phone guards", but lines 282–283 list five.
- **Fix:** Name the sixth guard, or drop the number.
- **Same finding in other stages:** Stage 6 #13.

### Nits

- **N1. Analytics series change meaning without notice** (69–71, 297–299).
  - A card click now sends `sheet_open` instead of `case_study_open`.
  - Soft navigations to `/work/<slug>` count as case-page pageviews.
  - `apk_download` changes surface.
  
  List these changes in the design, with the date the series break.
- **N2. The throwaway routing test covers too little** (102–104, 320–325). Add `/ar` and `/he`, Forward after Back, refresh, and Saqroon's `pushState` running alongside the App Router.
- **N3. No fallback if the Vercel plan rejects custom events** (105–107, 546–547). The "Measured use" goal and the 30% trigger for revisiting an AI model both depend on those events.
- **N4. Rollback names a fixed commit and uses words that will date** (95, 533–534).
  - The rollback target, "last good commit today: `c002f24`", will go stale: name the production deployment just before the cut-over instead.
  - "Today" will also go stale: use the date.
- **N5. Where `#saqroon` and `#agent` land, and what a reader without script sees there, is defined only in the plan** (290, 324–325, 333–334). Also cap the length of the `wa.me` prefill with a `maxlength`. (Stage 6 #5 raises the same gap.)
- **N6. "Future Improvements" is nested under NFR** (540). Make it an H2.
- **N7. The choice tables have different rows** (394–420). Only table A has a Cost row.
- **N8. "(see 2.5)" points to an implementation step from inside the spec** (252). Write "Implementation Plan step 2.5", or state the behaviour in place.
- **N9. The diagram is misaligned** (190–193). The `portfolio.ts ─┐` bracket does not line up with the `─┤` connectors below it.
- **N10. Link styles are mixed, and one section range is wrong** (12–13, 306–307, 384). Concepts A–C are defined in REVIEW section 4, not sections 9–11. Use one link style throughout.
- **N11. "Every answer" and "every preset answer" disagree** (65, 160, 343). Stage 5 #6 and Stage 6 #3 rate this Major.
- **N12. Stale and structural wording.**
  - The status line (4) will go stale once this review is done.
  - CUJs 2 and 4 pack a second action into "Then".
  - The bracket in the non-goal at 83–88 hides the two exemptions.
- **N13. Subjective framing.**
  - In the Problem section (38, 49, 52–53): "looks like most developer portfolios", "can easily lose function", "fixes those on paper".
  - In the Pros, Cons and Reason cells (433, 454, 471).
- **N14. Undefined or unclear words.**
  - "Chips" (22, 125) is used before it is defined.
  - "Both data shapes" (215).
  - "Calls" (297, 98).
  - "(`ui.ts` 105)" (356).
  - "The other agent" (487).
  - "The brief's staging" (513).
  - "One recognisable first screen" and "one thumb" (57, 72–73) cannot be tested.
- **N15. Finding IDs are given as the only reason** (450, 466, 474, 482, 489). Add a few words after each ID.
- **N16. The same requirement is restated in two or three sections.** This happens for rollback (74–76, 176, 533–534), English interception (102–104, 320–323), the speed baseline (108–109, 530–531) and script failure (383–387, 535–536). Other wording:
  - "Renders as it does on the server" (249) is circular.
  - "As tested in preview H" (362) refers to a test that is not documented.
  - Line 472 slips into the past tense.
