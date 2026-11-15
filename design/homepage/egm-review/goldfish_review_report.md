# Goldfish Annotated Review Report

**Status: resolved (2026-11-15).** The owner chose "auto accept". F1–F16 were applied to the design doc. K1–K3 were contested and bypassed; the AI-model wording from K1 was still changed as part of F15's Future Improvements cleanup. The owner answered E1–E3 on the same day, and the answers are in the design doc's Non-Goals:

*   **E1:** keep the phase lines, shown on the cards.
*   **E2:** a download row on each card is enough, so the install strip is removed.
*   **E3:** nothing outside the site links to `#agent`, so that id is dropped. The DECLINE items were not changed. During the edit, the "nothing lost" test moved from step 2.16 to 2.15, because step 2.7 (the `PortalMotion` change) was removed.

**Target:** [DESIGN-2026-11.md](../DESIGN-2026-11.md) (full file, lines 1–876)
**Input:** [consolidated_review_report.md](consolidated_review_report.md) (items X1–X16 and the stage findings behind them)
**Date:** 2026-11-15
**Owner decisions taken into this report (2026-11-15):**

1. **Choice A:** "the best mix of A1 and A3". The mix is defined below as **A4**.
2. **X12:** the cards are dealt when the table comes into view.

Severity mapping: Blocker = High, Major = Medium, Nit = Low. The findings are grouped by the consolidated items X1–X16. Each "Proposed Edit" lists every place in the doc that changes. The exact wording is written when the edit is applied.

---

## A4: the mix of A1 and A3

A4 takes A1's mechanism and A3's address.

| What happens | How |
| --- | --- |
| The card | Every card stays a real `<a href="/work/<slug>">`. Without script, Ctrl-click, middle-click or a crawler, the link opens the case page. |
| Opening | A plain click calls `showModal()`, then `history.pushState(null, '', casePath)`. The address bar shows the case-page address, as in A3. |
| What Next does with it | Next's patched `pushState` copies the homepage's router state into the new history entry and changes only the address, so the homepage stays on screen and nothing is fetched (`node_modules/next/dist/client/components/app-router.js` 234–262). |
| Closing | The close button, Escape and Android Back all go through one path. A `cancel` handler calls `preventDefault()`, then `history.back()`. |
| Back and Forward | A `popstate` listener opens or closes the sheet to match `location`. Next restores the stored homepage state on Back and Forward (app-router.js 284–298). |
| Refresh or a shared address | The server renders the case page, as with A3 and as with a plain link. |
| Focus | `dialog.close()` returns focus to the card, as in A1. |
| "Read the case study" | A plain `<a href>`, which loads the full page. |
| Saqroon | The same mechanism, but the pushed address is `#saqroon`, because Saqroon has no case page. |

**What A4 removes compared with A3:**

- the `(home)` route group, its layout, the `@sheet` slot, `default.tsx`, the catch-all page and the intercept page;
- the English interception question;
- steps 3.2–3.6;
- the case-page exemption from the non-goal.

It also removes R-B1. Nothing intercepts navigation any more, so the case page's language switch keeps working.

**What A4 keeps from A1's costs:**

- All twelve sheets' text goes into the homepage HTML.
- **Analytics** (C N1): `@vercel/analytics` reports pageviews on pathname changes, and `pushState` updates `usePathname`. So opening a sheet probably also counts as a `/work/<slug>` pageview. This is not verified; the spike in step 0.2 checks it.

**What step 0.2 must still prove,** in all three locales:

- open, Back, Forward and refresh;
- Escape on desktop, and Back on an Android phone;
- the header is inert while the dialog is open;
- whether Vercel Analytics counts a pageview when the sheet opens.

**If the spike fails:** fall back to plain A1, a dialog with no address change. The fallback is named now, so the person building it does not have to choose.

---

## ESCALATE: these need what only the owner knows

### E1. The visible "Now" list disappears [`zoom-out` S8] – Severity: High
- **Affected scope:** Non-Goals (removals, 97–98); the `HomeCard.phase` field (220, 229); test 2.16.
- **Discrepancy:** Today the page lists 8 phase lines (`portfolio-home.tsx` 144–161, from `now.json`). The design shows them nowhere, and they are not among the removals the owner signed off (concepts_brief.md 397–402).
- **AI Suggestion:** ESCALATE
- **Justification:** Only the owner can say whether this content goes.
- **Question for the owner:** Should the phase lines appear on the cards (one line under each title, 8 of 12 cards), or is the "Now" list signed off as a removal?

### E2. The one-tap install strip disappears [`zoom-out` S5 #7] – Severity: High
- **Affected scope:** Goals (62–64); CUJ 5 (151–153); removals (97–98).
- **Discrepancy:** Today every APK is one tap away (`portfolio-home.tsx` 162–201). In the new design it takes three taps: a filter, a card, then the sheet. The brief's goal "no harder to reach" (concepts_brief.md 288) was dropped without comment.
- **AI Suggestion:** ESCALATE
- **Question for the owner:** With F3 in place, each card shows its download links, so every APK is one tap away from the work table. Is that enough, or should the strip also stay at the top?

### E3. Does anything outside the site link to `/#agent` or `/#saqroon`? [`zoom-out` S8 Z4] – Severity: Medium
- **Affected scope:** Step 2.8 (721–723); test 2.16.
- **Discrepancy:** No link inside the site points at `#agent` or `#saqroon`. Places outside it might: the résumé PDF, LinkedIn, or past messages.
- **AI Suggestion:** ESCALATE
- **Question for the owner:** If nothing external uses them, drop `id="agent"`. `id="saqroon"` stays as A4's address for the Saqroon sheet.

---

## PROPOSE FIX

### F1 (X1). Replace choice A3 with A4 throughout [`zoom-out`, `design`, `structural`, `codebase-details`, `implementation-readiness`] – Severity: High
- **Affected scope:** Overview item 4 (27–30); Non-Goals (83–88); Open Questions (102–104); data-flow diagram (200–211); "The project sheet" (304–338); the Owner choice A table (391–399); Alternative H (491–497); steps 0.2, 2.10, 3.1–3.6; Verification Plan (858–862).
- **Discrepancy:** A3's cost was understated. It also needs A1 for Saqroon, and it intercepts case-page navigation (R-B1, checked in Next's source).
- **AI Suggestion:** PROPOSE FIX
- **Justification:** The owner decided on 2026-11-15. A4 keeps the case-page address and drops every route file.
- **Proposed Edit:**
  - **Overview 4:** The sheet opens over the homepage and the address bar shows the case-page address, using `history.pushState`. Back closes it, and refreshing opens the case page.
  - **Non-Goals:** Remove the A3 exemption. The non-goal reads "No edits to `work/[slug]/page.tsx`, `project-page.tsx`, the site header or the locale addresses. Exception: the Latin font changes sitewide (choice D2)."
  - **Open Questions:** Replace the English interception question with: "Does `pushState` to the case-page address behave in all three locales? Does Vercel Analytics count it as a pageview?" The answer comes from spike 0.2.
  - **Diagram:** Remove the `(home)` layout and the `@sheet` slot. `ProjectSheet` is a child of `WorkTable` (see F3 and F9).
  - **"The project sheet":** Rewrite it with the A4 table above, with a single mode.
  - **Choice A table:** Add an A4 column marked "chosen 2026-11-15". Mark A3 as superseded and name R-B1 as the reason.
  - **Alternative H:** Name A4 as the chosen option. A3 is rejected for R-B1 and its cost list. A1 is rejected only because it gives up the case-page address.
  - **Step 0.2:** Becomes the `pushState` spike on branch `spike/sheet-history`:
    - in all three locales: open, Back, Forward, refresh;
    - Escape and Android Back;
    - the header is inert while the dialog is open;
    - the case page's language switch still works;
    - check whether Vercel counts a pageview.
    - Fallback if it fails: plain A1.
  - **Step 2.10:** `ProjectSheet` has one mode. Its props, history handling and cancel handling come from the A4 table.
  - **Steps 3.1–3.6:** Replaced by one step: `src/app/[locale]/page.tsx` renders `HomeSheetPage` in place of `PortfolioHome`, and `layout.tsx` swaps the font. No route group and no new route files.
  - **Verification:** Replace the interception checks with the spike's list, run against the preview deployment.

### F2 (X12). Deal the cards when the table first comes into view [`design` C8, `zoom-out` S8 N1] – Severity: Medium
- **Affected scope:** "The work table" (293–302); step 2.9 (726–733); test 2.16.
- **AI Suggestion:** PROPOSE FIX (the owner decided on 2026-11-15)
- **Proposed Edit:** The work table section and step 2.9 say:
  - **Off screen when the page loads:** the cards turn face down while out of view, so no visitor sees a flash.
  - **Coming into view:** when about 30% of `#work` first becomes visible, the cards are dealt once. Each card starts about 50 ms after the previous one, and the whole deal finishes in under 1 s. Links stay clickable throughout.
  - **No deal:** if the section is already on screen when the page loads, if it was reached through `/#work`, or under reduced motion, the cards stay face up.
  - **Calls and "Deal again":** these still deal again on a tap.
  - **New tests in `work-table.test.tsx`:** no deal when the page loads on a hash; no deal under reduced motion; the deal runs only once on entering view; the tilt matches between server and client.

### F3 (X2). The card is an `<article>` with no link nested inside another link, and its downloads are visible [`implementation-readiness`, `codebase-details`, `zoom-out`, `comprehension`] – Severity: High
- **Affected scope:** "The work table" (288–291); step 2.8 (718–724); CUJ 5 (151–153).
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:** Step 2.8 becomes:
  - `<article class="card">` holds a title link whose `::after` covers the whole card. That link goes to `casePath`. For Saqroon it goes to Saqroon's live site, so the card has a real target without script. Script makes a click on any card open the sheet instead.
  - The download and live links sit in a visible row under the title, as siblings, above the stretched link (`position: relative; z-index: 1`).
  - Nothing is visually hidden.
  - Saqroon's card keeps `id="saqroon"`, the anchor A4 uses for its sheet.
  - The test in 2.16 checks the "no `<a>` inside `<a>`" rule.

### F4 (X3). Base the "nothing lost" test on the approved tables [`implementation-readiness` R-B3, `codebase-details`, `zoom-out` Z4] – Severity: High
- **Affected scope:** Goals (62–64); step 2.16 (776–783); step 5.1.
- **AI Suggestion:** PROPOSE FIX. The final list depends on E1–E3.
- **Proposed Edit:** The test asserts:
  - every href and every download from the action table (concepts_brief.md 404–407), each present **and** visible (not `hidden`, not visually hidden, not inside `aria-hidden`);
  - the hash ids something links to: `top`, `work`, `services`, `process`, `contact`, `saqroon`, plus any that E3 adds;
  - one content check per signed block: the headline, services, process, contact form, footer, and the "Now" phase lines if E1 keeps them.
  
  Remove the "every id on the old page" rule. Step 5.1 freezes the fixture **before** it deletes `portfolio-home.tsx`, and both land in one commit.

### F5 (X4). Islands add behaviour to server markup and never render it [`design` C1, `zoom-out` Z3, `implementation-readiness`, `codebase-details`, `comprehension`] – Severity: Medium
- **Affected scope:** "When script breaks" (381–387); NFR "Script failure" (535–536); steps 2.2, 2.4, 2.5, 2.9, 2.15.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **Rule:** the server renders the chips, the cards and the thread. `AskBox`, `WorkTable` and `PortalPicture` attach behaviour through `data-*` attributes, the `WorkFilters` pattern (`work-filters.tsx` 7–18). They render only what is theirs: the answer area, the dialog and the deal state.
  - **`IslandBoundary`:** a plain React class component. Its fallback is `null`. It calls `track("island_error", { island })` once, so a failure is visible. This replaces `unstable_catchError` and removes the unstable-API risk.
  - **`HomePortal`:** gets a boundary as well.
  - **Test:** force a throw in each island, then check that the cards, the chips and `#work` are still on the page.
  - **Analytics:** add `island_error` to the event table, which brings it to 8 events.

### F6 (X5). Render every answer on the server, always in the page's language [`zoom-out` Z2 and S5 #5/#6, `design` C9, `comprehension` S6 #2/#3, `implementation-readiness` R15, `codebase-details` R14] – Severity: Medium
- **Affected scope:** Goals (65); CUJ 2 (125); CUJ 6 (159–160); "The question box" (249–267); data flow (193–197); steps 1.4, 2.5, 2.13.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **Language rule:** answers are always written in the page's language. The four-field line still reports the language the question was typed in. Remove the "else in the page's" branch from step 1.4.
  - **Where answers are rendered:** the server page renders every answer with `AnswerView`: about 11 topic answers plus one per project. It passes `AskBox` only the matcher (the page locale's patterns, aliases and intent ids) and the answer ids.
  - **Typed questions:** a typed question reveals the matching server-rendered answer. Only the unknown answer is built in the browser, because its WhatsApp link carries the typed text.
  - **`Thread`:** shows the three chip answers in full and the rest inside one `<details>` titled "More answers". That way every answer is in the HTML without making the page longer.
  - **Bundle:** `home-ask.ts` no longer imports `home.ts` into the client.
  - **Test:** the client bundle of `AskBox` contains no strings from other locales.

### F7 (X6). "See it" is a link to the zoom section [`zoom-out` Z5, `design` C4, `implementation-readiness` R7, `comprehension` S6 #1] – Severity: Medium
- **Affected scope:** Overview 3 (25–26); CUJ 2 (125–127); "The zoom through the ف" (274–284); steps 2.5 and 2.6.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **"See it":** an `<a href="#portal">` that also dispatches `home:see` with the slug. `PortalPicture` swaps the picture. The browser jumps to `#portal`, and PortalMotion's existing hash and focus handling apply.
  - **`zoom_play`:** fires once per picture. When motion runs, it fires once `--portal-settle` falls to 0.5 or below. When motion is off (reduced motion or a short viewport), it fires on arrival.
  - **CUJ 2's "Then":** "The page jumps to the zoom with that project's picture. `zoom_play` with `trigger: tap` fires once the opening is half open."
  - **Non-goal at line 90:** unchanged, because it already allows movement after a tap.

### F8 (X7). Specify the portal markup and leave `PortalMotion` untouched [`codebase-details`, `implementation-readiness`, `zoom-out` S5 N4 and Z5] – Severity: Medium
- **Affected scope:** "The zoom through the ف" (274–284); steps 2.6, 2.7 and 2.16 (`portal-motion.test`).
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **Step 2.6:** list the eight hooks: `stage`, `poster`, `mask`, `mark`, `copy`, `actions`, `photo`, `caption`.
    - `copy` holds the project title and no `h1`. `actions` holds "Read the case study".
    - The mask comes from `@/lib/monogram`.
    - The `<img>` loads eagerly (`priority`).
  - **`PortalPicture`:** preloads the next image with `new Image()` and `decode()`, then sets `src` on the same `<img>`. It is never remounted and never given a `key`.
  - **Step 2.7:** delete it, along with its test.
  - **Guard count:** list all of PortalMotion's guards and drop the word "six".

### F9 (X8). Sheet details [`design` C3/C7, `implementation-readiness`, `codebase-details`, `zoom-out` S5 #3] – Severity: Medium
- **Affected scope:** "The project sheet" (304–338); step 2.10.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **Where it renders:** `WorkTable` owns a single `ProjectSheet`. It catches clicks on cards and on answer items (`[data-sheet]`). The sheet's `<dialog>` sits inside `.sheet-home`.
  - **Props:** the `HomeCard`, the page locale, `labels` (the sheet's own labels in three languages, from `home.ts`), `agentDemoCopy` (three languages), and `statusLabels`.
  - **Media:** `DeckVideo` paths follow `/work/<slug>/loop-{desktop,mobile}.{mp4,webm}`. Each `LiveEmbed` title is the card title plus "– live".
  - **Language turn:** the turned content gets `lang` and `dir`. `AgentDemo` follows the turn.
  - **Focus:** `close()` returns focus to the card. Escape and Back follow the A4 table.
  - **Reduced motion:** the turn and the fold happen instantly.

### F10 (X9). Card data [`implementation-readiness`, `codebase-details`] – Severity: Medium
- **Affected scope:** The `HomeCard` shape (213–231); steps 1.1 and 1.3.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **Pictures:** add `mobileIndex: 1` for `camp-and-hike` and `lulu-tokki` in `project-showcase.ts`, and list that file in step 1.3. Use `mobileIndex: 0` for `nedaa-lifestyle`, whose `still` is `null`.
  - **Locale:** `buildCards(locale)` and `getCard(slug, locale)`.
  - **Saqroon:** `statusNote` is optional, and Saqroon's card comes last in `cardOrder`.
  - **Colour and tilt:** the colour cycles paper, ink, lime by `index % 3`. The tilt is `((index % 5) - 2) * 1.5deg`.
  - **Types:** define `HomeCardRef` as `{ slug, title, status, hasDownload }` and `Embed`. Drop `order` and `aliases` from `HomeCard`.

### F11 (X10). Ask matching [`design` C6, `implementation-readiness`, `codebase-details`, `zoom-out` Z N3] – Severity: Medium
- **Affected scope:** "Matching" (259–263); steps 1.1, 1.4 and 1.6.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **Normalising:** patterns and aliases go through `normalize` before they are escaped.
  - **Prefixes:** the match allows an optional prefix before each word. In Arabic: `(?:ال|وال|بال|لل|و|ب|ل|ف)?`. In Hebrew: `(?:ה|ו|ב|ל|מ|ש|כ)?`.
  - **Rule order:** `services` matches "build" plus a channel word before the project aliases are checked. Bare channel names are not allowed as aliases.
  - **Types and sets:**
    - `Answer` gains `text`.
    - The "live" set is `status === "live-product"`.
    - The "install" set is every card with a download.
  - **Empty input:** returns `null`.
  - **Copy:** written in `home.ts` and reviewed by the owner. It is not ported from preview H.
  - **Fixtures:** add prefixed forms, such as السعر and בסוליטר.
  - **Scope:** the typed rules stay at the 11 topics. No new intents are added.

### F12 (X11). Accessibility of the answer [`design` C7] – Severity: Medium
- **Affected scope:** "The question box" (249–252, 264–267); step 2.5.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - When the chips are replaced, focus moves to the answer's heading (`tabIndex={-1}`).
  - "Ask another" returns focus to the first chip.
  - The four-field line is not announced.

### F13 (X13). CSS copy list [`implementation-readiness`, `codebase-details`, `zoom-out` S5 N6] – Severity: Medium
- **Affected scope:** "Styles and font" (371–379); step 2.1.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:** Step 2.1 lists every rule group to copy:
  - portal-\*
  - deck-video
  - agent-demo
  - the header (homepage.css 14–55)
  - `.home-button`
  - the contact form and form states (57–87)
  - the footer and `.to-top` (683–760)
  - `.portal-scene-stage`
  
  Add one allowed ancestor rule: `html:has(.sheet-home) { scroll-behavior: auto; }`.

### F14 (X14). Make every gate measurable [`implementation-readiness`, `style`, `design` C N2] – Severity: Medium
- **Affected scope:** Ground rules (555–556); steps 0.3, 2.16; Verification Plan (858–872).
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **Per-step checks:** steps 1–5 each end with `npx tsc --noEmit`, `npm test` and `npm run lint`.
  - **Speed:** Lighthouse mobile, 5 runs per route (`/`, `/ar`, `/he`), comparing medians. Before the change it runs on production, after it on the preview deployment. Pass: LCP within +150 ms and CLS within +0.02. INP is checked after launch in Speed Insights.
  - **First screen:** a Playwright check at 360×640 in all three locales. Both buttons must be fully visible.
  - **Font check:** the case pages and the header at 375 and 1280, in all three locales. A failure is text overflow, a heading whose line count changes, or a layout shift over 4 px. The owner signs it off.
  - **Missing tests:**
    - `work-table.test` (see F2);
    - `portal-picture.test`;
    - a `LiveEmbed onReady` case;
    - `demo_send` carries exactly `{ locale }`;
    - `FirstScreen` in right-to-left layout, with the felt marked `aria-hidden` and taking no focus;
    - `buildCards()` throws on a `cardOrder` mismatch.
  - **Test setup:** stub `showModal` (jsdom lacks it). Mock `next/navigation` and `../contact-form`.

### F15 (X15). Restructure the document [`structural`, `style`, `design` C10, `comprehension`] – Severity: Medium
- **Affected scope:** Whole document.
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **One record of choices A–D:** keep the choice tables, with A4 added. Delete Alternatives H, I, J and L. Each body mention becomes a short tag such as "(choice A4)". Delete "Kept here for the record."
  - **Risks:** add `## Risks & Mitigations` between Alternatives and NFR, as one table that replaces the scattered mentions. Rows:
    - A4 history behaviour;
    - analytics pageviews;
    - the bundle;
    - Vercel event limits;
    - Arabic and Hebrew copy quality;
    - SOLitaire embeds working only on fhaj.dev;
    - the length of the `wa.me` prefill (capped with `maxlength=280`);
    - no rate limit on the contact action.
  - **Labels:** prefix every reference: "finding B1", "choice B1", "Alt-E", "Concept A".
  - **Naming:** "sheet" means the project popup only. The first screen is "the fold". The files and classes stay `home-sheet`, defined once.
  - **Glossary:** add one after the Overview, defining felt, fold, leaf, opening, stage, strip/four fields, calls, deal.
  - **The zoom:** add two sentences describing today's zoom as a visitor sees it.
  - **Rejected alternatives:** give one reason for each, or write "Owner preference; no reason recorded".
  - **Small fixes:**
    - make "Future Improvements" an H2;
    - change "(see 2.5)" to "Implementation Plan step 2.5";
    - give the REVIEW section range as 4 and 9–11, and say "add section 12";
    - update the status line;
    - replace "today" with dates.

### F16 (X16). Be honest about rollback [`zoom-out` S5 N6, `comprehension` S6 #7, `design` C N4, `implementation-readiness`] – Severity: Medium
- **Affected scope:** Goals (74–76); NFR "Rollback" (533–534).
- **AI Suggestion:** PROPOSE FIX
- **Proposed Edit:**
  - **Rollback:** "Reverting the cut-over commit restores today's page. Steps 1.2, 1.7, 2.11, 2.12 and 2.14 land earlier and stay. Each is safe on the old page. 1.7's form text drops 'below', which reads correctly on both pages."
  - **Target:** "the production deployment immediately before the cut-over; record its hash then".
  - **Step 1:** no longer called "no visible change".

---

## CONTEST

### K1. A conversion baseline and rollback trigger [`design` C11] – Severity: Medium
- **AI Suggestion:** CONTEST
- **Justification:** The owner already decided against a before-and-after click comparison, "because portfolio traffic is too small for one to mean anything" (concepts_brief.md 409–411). The reviewer could read that file.
- **Proposed Edit:** In Future Improvements, change "Revisit an AI model if more than 30% of typed asks are unknown over 30 days" so it says the owner looks at the `ask` counts after 30 days and decides. It is no longer a fixed threshold.

### K2. "Make the boundary fallback render `children`" [`zoom-out` S5 #4, recommendation only] – Severity: Medium
- **AI Suggestion:** CONTEST (the recommendation only; the finding itself is fixed by F5)
- **Justification:** A caught error replaces the boundary's children with the fallback (`10-error-handling.md`, the catchError section). Rendering the children that just threw would throw again.

### K3. "'See it' breaks 'no automatic scrolling'" [`design` C4, `zoom-out` S5 N5, `comprehension` S6 #1, the conflict claim only] – Severity: Medium
- **AI Suggestion:** CONTEST (the conflict claim only; the wording is fixed by F7)
- **Justification:** Line 90 reads "The page moves only when the visitor scrolls or taps". "See it" is a tap.

---

## DECLINE (recorded, not fixed)

- **Subjective wording in the Pros, Cons and Reason cells** (C N13: 433, 454, 471). These record the owner's own impressions, and they are labelled as reasons.
- **Diagram alignment** (C N9). The diagram is redrawn under F1 anyway.
- **Uneven Type/Scope labels and the long line at 782** (S9 nits). Formatting only.
- **Past tense at 472** (C N16). Alternative E's text moves into the choice record under F15.

---

## Counts

| Category | Count |
| --- | --- |
| ESCALATE | 3 (E1–E3) |
| PROPOSE FIX | 16 (F1–F16), covering about 70 raw findings |
| CONTEST | 3 (K1–K3) |
| DECLINE | 4 groups of Nits |
