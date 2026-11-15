# Consolidated Review Report: Homepage Design 2026-11

**Target:** [DESIGN-2026-11.md](../DESIGN-2026-11.md) (876 lines; feature spec 1–550, implementation plan 551–876)
**Date:** 2026-11-15
**Mode:** EGM `/egm:egm-review`, consolidated report with all rubrics. The doc was not edited between stages.
**Reviewer context:** the doc and its links, plus AGENTS.md, three Next 16 docs (error handling, intercepting routes, parallel routes) and `portfolio-home.tsx`.

## Stage reports

| Stage | Report | Reviewers | Result (deduplicated) |
| --- | --- | --- | --- |
| 5 Initial zoom out | [zoom_out_report.md](zoom_out_report.md) | zoom-out | 0 Blockers · 7 Major · 6 Nits |
| 6 Comprehension | [comprehension_report.md](comprehension_report.md) | comprehension | 0 · 8 · 8 |
| 7 Critic | [critic_report.md](critic_report.md) | design, structural, style | 0 · 17 · 16 |
| 8 Intermediate zoom out | [intermediate_zoom_out_report.md](intermediate_zoom_out_report.md) | zoom-out | 0 · 5 · 3 |
| 9 Implementation readiness | [implementation_readiness_report.md](implementation_readiness_report.md) | readiness, codebase, style | 3 · 23 · 14 |

Every reviewer completed; none is marked not run. Nobody ran a build, a test or the spike. Every claim about Next behaviour comes from reading the docs or `node_modules/next` source. I checked one claim myself, R-B1.

**Overall:** the design is **not ready to build**. The direction holds: server HTML first, reuse of `PortalMotion`, cards built from the content files, and a single cut-over. Most findings trace back to three decisions: choice A3, how the islands wrap their markup, and where the answers are rendered. Settle those three first, and roughly a third of the findings disappear without further work.

---

## Action items

### 🔴 Blockers

**X1. Decide choice A again, with its full cost in front of you. This is the owner's decision.**

When you picked A3, the table said it cost "a slot and default files". The reviews found it needs much more:

- the route-group move, a layout, `@sheet/default.tsx`, a catch-all page that returns null, and an intercept page;
- an English interception spike;
- a full page load for the "Read the case study" link, and `scroll={false}` on every card and chip;
- the CSS scope moved into the layout, and focus returned by hand after the sheet closes;
- analytics that count sheet opens as case-page views;
- an exemption from the case-page non-goal.

A1 ships anyway, as Saqroon's dialog, so A3 means building two sheet mechanisms.

**New in Stage 9 (R-B1), checked in source:** Next intercepts any navigation that starts under `/[locale]`, not only the homepage. Under A3, the language switch on a case page, links between case pages, and the sheet's own case link would all open the sheet instead of the page. Fixing that means editing `SiteHeader` or `ProjectPage`, which a non-goal forbids.

A3's only gain is that the address bar shows the case-page address. A1 for all twelve cards keeps cards as real links to the case page, and a plain click opens a `<dialog>` with a history entry. That removes:

- Open Question 1 and steps 3.2–3.6;
- R-B1, R11 and R12, and part of R8;
- S5 #2 and #3, S6 #6, C2, C5 and C N1;
- the non-goal exemption.

A1's own costs:

- all twelve sheets' text goes into the homepage payload (`LiveEmbed` and `AgentDemo` still load only when a sheet opens);
- the `cancel` handling for Escape and Android Back (C3) is still needed.

Sources: Z1, S5 #1, R-B1.

**X2. Card markup: no links inside links, visible downloads, and a real target for Saqroon.**

- Each card becomes an `<article>` whose title link stretches over the card. The download and live links sit beside it as siblings and are visible.
- Saqroon's card no longer links to itself.
- Decide what replaces the install strip, which today puts every APK one tap away. Either keep a visible list of downloads, or add the strip to the removals you have signed off.

Sources: R-B2, S5 #7, S6 #5, C N5, R10.

**X3. Base the "nothing lost" test on your two approved tables, not on every id.**

- Check every href, every download, and only the hash ids that something actually links to (`top`, `work`, `services`, `process`, `contact`).
- Ask: does anything outside the site link to `#agent` or `#saqroon`? If not, drop those ids.
- Add a content check. The visible "Now" list disappears and is not in your signed removals. Either sign it off as a removal, or show the phase lines on the cards.
- Check that links are visible, not only that they are present.

Sources: R-B3, Z4, S5 #7.

### 🟡 Major: architecture

**X4. Islands add behaviour to server markup and never render it themselves.**

`WorkTable` and `AskBox` should work the way `WorkFilters` already does, through `data-*` attributes on markup the server rendered. A boundary that falls back to nothing then loses only the added behaviour.

- Log the caught error or send one event, so a failure is not silent.
- Consider a plain React class boundary instead of `unstable_catchError`.
- Add a test that forces a throw and then checks the markup is still there.

Do not use "render `children` as the fallback": the children are the part that just threw, so they would throw again.

Sources: C1, Z3, R4, S5 #4, S6 #4.

**X5. Render every answer on the server, in the page's language, and pass them to the box as props.**

The client then ships only the matcher. "Every answer in the server HTML" becomes true for little cost. This also settles which language an answer uses, and removes the dead `detectLanguage` branch. Whether `Thread` shows 3 answers or all of them is a layout choice for you.

Sources: Z2, C9, S5 #5, S5 #6, S6 #2, S6 #3, R13 (part), R14, R15.

**X6. Make "See it" an ordinary link to the zoom section.**

The non-goal allows the page to move after a tap. A link lets `PortalMotion`'s existing hash and focus handling do the work.

- Name the signal `zoom_play` reads (for example `--portal-settle`), and what fires when motion is off.
- Rewrite CUJ 2 so it can be tested.

Sources: Z5, C4, R7, S5 N5, S6 #1.

**X7. Pin down the portal markup, and avoid editing `PortalMotion`.**

- List the eight `data-portal-*` hooks and what fills each one.
- Put no `h1` in the copy block, and take the monogram from `@/lib/monogram`.
- `PortalPicture` preloads the next image (`new Image().decode()`) and then swaps `src` on the same `<img>`. Step 2.7 can then be dropped.
- Load the picture eagerly.

Sources: R5, R6, Z5, S5 N4, R nit 9.

### 🟡 Major: unspecified behaviour

**X8. Sheet details.**

- Handle `cancel` (Escape and Android Back): either call `router.back()` or close and pop history, guarded against a second pop.
- Return focus to the card that opened the sheet.
- Set `lang` and `dir` on the text after a language turn.
- Name the props: labels, `AgentDemoCopy`, `DeckVideo` paths, `LiveEmbed` titles.
- Decide which language `AgentDemo` uses after a turn.
- Put the CSS scope where the sheet actually renders.

Sources: C3, C7, R8, R9, R11, S5 #3.

**X9. Card data.**

- Add `mobileIndex` for camp-and-hike, nedaa-lifestyle and lulu-tokki.
- Nedaa's `still` is `null`.
- Give `casePath` a locale argument.
- Give Saqroon a `statusNote` and a position in `cardOrder`.
- State the colour rule and the tilt formula.

Sources: R1, R2, R3.

**X10. Ask matching.**

- Run patterns and aliases through `normalize` too.
- Handle the Arabic prefixes ال و ب ل ف and the Hebrew prefixes ה ו ב ל מ ש כ.
- Write patterns that let both conflicting fixtures pass. "Can you build a WhatsApp bot?" must answer `services`, but project aliases are checked first. "…booking system for my clinic?" must answer `unknown`.
- Add a `text` field to `Answer` and define `HomeCardRef`.
- Define the "live" and "install" card sets.
- Guard against empty input.
- Name where the copy comes from.
- Keep the typed rules small: the most valuable part is the unknown-answer handoff to WhatsApp.

Sources: C6, R13, R14, Z N3.

**X11. Accessibility of the answer.**

- After an answer, move focus to it or announce it through a polite live region.
- "Ask another" returns focus to the first chip.
- Under reduced motion, the turn and the fold happen instantly.

Source: C7.

**X12. When the cards are dealt. This is your call, because it changes the decision to deal them face down.**

As planned, the deal runs on hydration. Readable cards flash face down, even when `#work` is off screen or was reached through its hash. Two options:

- Deal only when the visitor taps a call or "Deal again".
- Deal on the first time `#work` comes into view, and never when the visitor arrived through its hash.

Sources: C8, Z N1.

**X13. The CSS copy list.**

Add the `.home-page` rules for the header, `.home-button`, the form, the footer, `.to-top` and `.portal-scene-stage`. Also allow the ancestor rule `html:has(.sheet-home) { scroll-behavior: auto }`.

Sources: R8, S5 N6.

### 🟡 Major: verification

**X14. Make every gate measurable.**

- Add `npx tsc --noEmit` to each step's gate.
- Measure speed in the lab: Lighthouse mobile, 5 runs, compare medians, within a stated margin.
- Add an automated check at 360×640 in all three locales.
- Define what counts as a failure in the font check.
- Add the missing tests: `WorkTable`, `PortalPicture`, `LiveEmbed onReady`, `demo_send` sending exactly `{ locale }`, `FirstScreen` in right-to-left layout, and the `cardOrder` throw.

Sources: R16–R20, C N2 (spike coverage).

### 🟡 Major: the document itself

**X15. Restructure the doc.**

- Keep one record of choices A–D: either the tables or Alternatives H–L. Write the current non-goal with its exemptions as separate bullets.
- Add a Risks & Mitigations table that *replaces* the risks now scattered through the doc.
- Prefix every label: finding, choice, Alt, Concept.
- Keep "sheet" for the popup and call the first screen "the fold".
- Add a glossary for the metaphor terms (felt, strip, stops, calls, deal, leaf, opening).
- Describe today's zoom as a visitor sees it.
- Fix the guard count (it says six and lists five).
- Give a reason for each rejected alternative.

Sources: C10, C12–C17, S6 #8, R21–R23, S6 nits.

**X16. Rollback honesty.**

List the changes that land before the cut-over (steps 1.2, 1.7, 2.7, 2.11, 2.12, 2.14) and confirm each one is safe on the old page. Name the rollback target as "the production deployment just before the cut-over", not a fixed hash.

Sources: S5 N6, S6 #7, C N4, R nit 10.

### 🟢 Nits (grouped)

- **Analytics.** Note the date the series change meaning: `case_study_open` becomes `sheet_open`, and `apk_download` changes surface. State a fallback if custom events are not allowed. (C N1, C N3, R nit 11)
- **Repeated code.** Two `ask` signatures. `sheet_open` may fire twice. The WhatsApp number is hard-coded. Reuse `getProjectParams()`. (S6 #12, R nits 1, 2, 7)
- **Test setup.** Stub `showModal` in jsdom, mock `next/navigation` and `../contact-form`, and freeze the fixture before deleting the old page. (R nits 5, 6, 13)
- **Doc hygiene.**
  - Fix the stale status line and dated words ("today").
  - Make "Future Improvements" an H2.
  - Align the diagram.
  - Fix the REVIEW section range and say "add section 12".
  - Split the CUJ "Then" lines.
  - Fill in the empty heading at step 3.5.
  - Make the Type/Scope labels uniform.
  - Use plain wording in place of subjective phrasing.

---

## Contested or downgraded findings

| Finding | Ruling | Why |
| --- | --- | --- |
| C11: baseline conversions and add a rollback trigger | **Contested; drop it** | It reverses your recorded decision that portfolio traffic is too small for a before-and-after comparison (concepts_brief.md 409–411). For the same reason, treat "30% unknown over 30 days" as a prompt for your judgement, not a threshold. (Z5) |
| S5 #4: make the boundary fallback render `children` | **Wrong** | The children are the part that threw, so they would throw again. (Z3) |
| S5 #6: narrow the "every answer" goal | **Reversed** | Rendering every answer on the server meets the goal for little cost. (Z2, X5) |
| C4, S5 N5, S6 #1: "See it" breaks "no automatic scrolling" | **Overstated** | The non-goal allows movement after a tap. Only CUJ 2's wording needs fixing. (Z5) |
| C13, C17 | **Downgraded to Nit** | These are wording issues. |
| Style S7 #2: "(see 2.5)" is a broken cross-reference | **Downgraded to Nit** | It points to step 2.5 of the implementation plan, which that reviewer did not read. |
| C10: add a Risks section | **Conditional** | Only if it replaces the scattered mentions. Otherwise it is a fourth copy. |

## Traceability matrix

| Action | Stage 5 | Stage 6 | Stage 7 | Stage 8 | Stage 9 |
| --- | --- | --- | --- | --- | --- |
| X1 Choice A | #1, #2, #3 | #6 | C2, C5, N1 | Z1 | R-B1, R11, R12 |
| X2 Card markup | #7 | #5 | N5 | Z4 | R-B2, R10 |
| X3 Nothing-lost scope | #7 | — | — | Z4 | R-B3 |
| X4 Islands and boundaries | #4 | #4 | C1 | Z3 | R4 |
| X5 Server-rendered answers | #5, #6 | #2, #3 | C9, N11 | Z2 | R14, R15 |
| X6 "See it" | N5 | #1 | C4 | Z5 | R7 |
| X7 Portal markup | N4 | #8 | — | Z5 | R5, R6, nit 9 |
| X8 Sheet details | #3 | — | C3, C7 | — | R8, R9, R11 |
| X9 Card data | N3 | #10, #11 | — | — | R1, R2, R3 |
| X10 Ask matching | N1, N2 | #12 | C6 | N3 | R13, R14 |
| X11 Answer accessibility | — | — | C7 | — | — |
| X12 Deal timing | — | — | C8 | N1 | R17 (part) |
| X13 CSS copy list | N6 | — | — | — | R8 |
| X14 Measurable gates | — | — | N2 | — | R16–R20 |
| X15 Doc structure | — | #8, #9, #13–16 | C10, C12–C17, N6–N16 | N2 | R21–R23 |
| X16 Rollback | N6 | #7 | N4 | — | nit 10 |

## Next step

The EGM flow continues with `/egm:egm-resolve` on this report. **X1 comes first:** your answer on choice A decides whether X2, X8 and most of the routing items are needed at all.
