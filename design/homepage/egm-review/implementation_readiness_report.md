# Stage 9: Implementation Readiness Test

**Target:** [DESIGN-2026-11.md](../DESIGN-2026-11.md), Detailed Implementation Plan (lines 551–876)
**Date:** 2026-11-15
**Standard:** `implementation-readiness-standard.md` for the readiness and codebase lenses. The style lens uses its persona's own rules.

## Reviewer Status

| Reviewer | Status | Raw result |
| --- | --- | --- |
| `egm-implementation-readiness` | completed | 2 Blockers, 16 Major, 10 Nits |
| `egm-codebase-details` | completed | 1 Blocker, 10 Major, 9 Nits |
| `egm-style` | completed | 5 Major, 8 Nits |

**Verdict: not ready to build.** After merging duplicates there are 3 Blockers, 23 Majors and 14 Nits. The tag after each heading names the reviewers who raised the finding.

The codebase reviewer confirmed these claims in the plan against the code:

- `normalize` is not exported, and `detectLanguage` is.
- `featuredOrder` exists, and there are 11 projects plus `focusQuest`.
- Only Bab and ElsewhereCo have loops, and `now.json` has 8 entries.
- `form.failed` says "below", and `getProjectParams` exists.
- `dynamicParams = false` is set on the layout.
- `unstable_catchError` is exported from `next/error`, and `Schibsted_Grotesk` exists.
- The WhatsApp number matches.
- Nothing outside the files listed for deletion in step 5.1 imports them.
- `npm test` and `npm run lint` exist, and the deploy script takes the origin as its argument.

No reviewer ran a build, a test or the spike.

## Blockers

### R-B1. Interception also fires on navigation from a case page, so the case page's language switch would open the sheet (codebase)

- **Where:** Verification Plan line 861; steps 3.4 and 3.5; Technical Plan line 316 ("only navigation from the homepage is intercepted").
- **What the code does:**
  - `next/dist/lib/generate-interception-routes-rewrites.js` lines 31–34 turn the intercepting route into a match on the `Next-Url` header with `(?:/.*)?`. Next's own comment there says this "will match any descendants".
  - Route groups and `@slot` folders are not segments (intercepting-routes.md:54), so the intercepting route is `/[locale]`, and every page under it matches, including `/en/work/bab`.
  - **Checked by the Elephant:** I read the source and confirm the regex. The behaviour has not been run.
- **What breaks:**
  - The case page's language switch is a soft-navigating `TrackedLink` (`site-header.tsx` 83–93). Under A3 it would open the sheet route instead of the case page in the other language.
  - The case page's tree has no `(home)` layout, so the `children` slot would show a 404 or whatever `(home)/default.tsx` renders.
  - The sheet's own case-study link would reopen the sheet.
  - This breaks the non-goal "no change to what the case pages show".
- **Fix:** If choice A3 stays, the spike in step 0.2 must test three things: the case page's language switch, a link from one case page to another, and the in-sheet case link. The case link becomes a plain `<a>`. If the language switch is intercepted, A3 cannot ship without editing `SiteHeader` or `ProjectPage`, which the plan forbids, so name A1 as the fallback now. See the consolidated report, item X1.

### R-B2. Each card link contains other links: invalid HTML and a hydration mismatch (readiness + codebase)

- **Where:** step 2.8 (718–724); the test in step 2.16, "SOLitaire's card lists its three APKs".
- **Problem:**
  - "The whole card is a `TrackedLink`", and it also contains the download and live links. Anchors inside an anchor are invalid, so the parser restructures them. That breaks hydration and the existing `a[download]` queries (`solitaire-media.test.tsx`:21).
  - Saqroon's downloads exist only as visually hidden text. A sighted visitor without script cannot use them, yet the hidden links still take keyboard focus.
- **Fix:**
  - Make the card an `<article>` with a title link that covers the whole card. Put the download and live links beside it, not inside it.
  - Say whether those links are visible. Saqroon's must be visible without script.

### R-B3. The "nothing lost" id check fails by design (readiness + codebase)

- **Where:** step 2.16, first bullet.
- **Problem:** Today's page has about 30 ids the new design has no use for, and the test requires all of them:
  - `home-title`;
  - `portal-counter-<locale>`;
  - `deck-<locale>-<slug>`, with its `-panel` and `-title` variants;
  - nine `*-title` headings.
  
  Step 2 cannot pass, or the implementer has to choose exemptions the owner never signed. Fallback 3.6 would also "lose" the `/work/<slug>` hrefs.
- **Fix:** Limit the id check to fragment targets that something actually links to (`top`, `work`, `services`, `process`, `contact`, plus any the owner adds), or write out the exclusion list. Also say how the href comparison treats fallback 3.6.

## Majors

### Data and cards

**R1. `buildCards()` crashes and picks the wrong pictures** (readiness + codebase)

- `projectShowcases` has no entry for `camp-and-hike`, `nedaa-lifestyle` or `lulu-tokki`, so `projectShowcases[slug].mobileIndex` throws.
- With `?.` and a fallback of `?? 0`, Camp & Hike and Lulu Tokki would show their desktop captures as the phone picture; their phone captures are at `media[1]`.
- Nedaa has no desktop capture, so `still = media[0]` would be a phone shot.
- **Fix:** add `mobileIndex` entries for the three slugs (and list `project-showcase.ts` in step 1.3), and state when `still` is `null`.

**R2. `casePath` depends on the locale, but `buildCards()` and `getCard()` take no locale** (readiness + codebase)

- **Fix:** pick one: `buildCards(locale)`, or store only the slug and let the components call `localizedPath`.
- Also say which locale the sheet's case link uses after the language turn. The page's locale is suggested.

**R3. Data the plan never specifies** (codebase N2 and N5, readiness N2)

- `focusQuest` has no `statusNote`, but `HomeCard` requires one.
- `cardOrder` never says where Saqroon goes.
- `DeckVideo` needs file paths (`/work/<slug>/loop-{desktop,mobile}.{mp4,webm}`), not a `loops` boolean.
- `LiveEmbed` needs a `title`.
- `Embed`, `HomeCardRef` and `sourceLabel` are never defined.
- The ink and lime colour rule and the tilt formula are not stated.

### Islands and error boundaries

**R4. An empty fallback deletes the links the plan says will survive** (readiness + codebase)

- `AskBox` renders the chips itself, and the cards are children of `WorkTable` inside the boundary.
- `PortalMotion` asserts seven elements with `!` and has no boundary at all.
- **Fix:** use the server-rendered fallback pattern from catchError.md (157–201), or make the islands add behaviour to markup they do not render (consolidated report, X4). Also decide whether `HomePortal` gets a boundary.

### Portal

**R5. HomePortal's markup is not specified, so `PortalMotion` will throw** (readiness + codebase)

- **Fix:** list all eight `data-portal-*` hooks and what fills each one.
- The copy block must not carry the `<h1 id="home-title">` from `brand-portal.tsx`; copying it would give the page a second `h1`.
- Name `@/lib/monogram` as the source of the mask.
- `PortalPicture` must change `src` on the same element and never remount it.

**R6. The change to `PortalMotion` in step 2.7 has no detection mechanism** (codebase)

- **Smallest fix:** in `measure()`, if the motion is already enabled and `!photo.complete`, return without calling `reset()`. The existing `load` listener does the rest.
- **Alternative** (Stage 8, Z5): preload the next image inside `PortalPicture` and drop step 2.7.

**R7. "See it" and `zoom_play` have no workable signal** (readiness + codebase)

- The progress value is private to `PortalMotion`; only `--portal-settle` and `data-motion` are exposed.
- Under reduced motion or on short viewports the zoom never pins, so "halfway" means nothing.
- `focus()` scrolls the page.
- **Fix:** name the signal `PortalPicture` reads, define what fires when motion is off, and rewrite CUJ 2. See also X7.

### Sheet

**R8. The sheet renders outside `.sheet-home`, and the CSS copy list is incomplete** (readiness + codebase)

- **Not copied:** the `.home-page` rules for the header (homepage.css 14–55), `.home-button`, the contact form, the footer, `.to-top` and `.portal-scene-stage`.
- **Cannot be scoped as planned:** `html:has(.home-page) { scroll-behavior: auto }` (homepage.css 1–4) targets an ancestor, so the plan's scoping rule forbids it.
- **Fix:** put the scope class on the `<dialog>` or on the layout, explicitly allow `html:has(.sheet-home)`, and list every rule group to be copied.

**R9. ProjectSheet's inputs are incomplete, and the language turn ignores text direction** (readiness + codebase)

- **Inputs:** the sheet also needs:
  - status labels;
  - its own labels in three languages;
  - `AgentDemoCopy`;
  - the `LiveEmbed` titles.
- **Fix:** name the full props, or the modules the sheet may import.
- Require `lang` and `dir` on the turned text.
- Say which language `AgentDemo` uses after a turn.

**R10. Nothing in the plan owns Saqroon's dialog** (readiness)

- Name one component that catches clicks on `a[href="#saqroon"]` (from a card or from an answer), holds Saqroon's `HomeCard`, and mounts `ProjectSheet` in dialog mode.

**R11. The sheet's links, scrolling and Escape key are unspecified** (readiness + codebase)

- Make the case-study link a plain `<a>`.
- Set `scroll={false}` on intercepted links.
- Handle `cancel`: Escape and Android Back close the `<dialog>` without `router.back()`.

**R12. The English interception spike misses the case most likely to fail** (readiness)

- **Fix:** test each source page against the target address it should open:

  | Visitor is on | Navigates to |
  | --- | --- |
  | `/` | `/work/bab` |
  | `/` | `/en/work/bab` |
  | `/ar` | `/ar/work/bab` |
  | `/he` | `/he/work/bab` |

- Decide in advance what happens if English is never intercepted. Add the cases from R-B1.

### Question box

**R13. The ask rules leave the main matching decisions open** (readiness + codebase)

- **Normalisation:** patterns and aliases must go through `normalize` as well, or Arabic patterns containing ة or أ never match. `findItem` already does this (agent-demo.ts:131).
- **Conflicting fixtures:**
  - "Can you build a WhatsApp bot?" must answer `services`, but project aliases are checked first.
  - "…booking system for my clinic?" must be `unknown`.
  - No patterns are given, and the only aliases given are Bab's.
- **Undefined types:** `Answer` has no `text` field, and `HomeCardRef` is undefined.
- **Undefined card sets:** which cards count as "live" and as "install" is not stated, for the answers or for the calls.
- **Missing details:** the price answer's WhatsApp prefill and the source of the copy are not given.
- **Prefixes:** Arabic and Hebrew prefixes (الباب, לבאב) are not covered (codebase N9, critic C6).

**R14. `detectLanguage` cannot return "something else"** (codebase)

- It returns `en` for any text without Arabic or Hebrew letters (agent-demo.ts:95–99), so the "else the page's language" branch never runs.
- `ask` has no guard for empty input. Copy the one in `reply()` (:191).
- Choosing "answers follow the page's language" (Stage 8, Z2) removes this problem.

**R15. The thread does not render every answer, which the Goal requires** (readiness)

- See X5.

### Verification

**R16. The per-step gate does not type-check.** Vitest and ESLint do not type-check, so type errors stay hidden until the build in step 3. Add `npx tsc --noEmit` to every step's gate. (readiness)

**R17. Several new behaviours have no tests** (readiness)

- `WorkTable`: dealing, the calls, a tilt that matches on server and client, and reduced motion.
- `PortalPicture`: the swap and `zoom_play` firing once.
- `LiveEmbed onReady` firing once.
- `demo_send` carrying exactly `{ locale }`. This is a privacy rule.
- `FirstScreen` in right-to-left layout, with the felt hidden from screen readers and unfocusable.
- `buildCards()` throwing on a mismatched `cardOrder`.

**R18. The speed gate cannot be measured** (readiness + style)

- Speed Insights collects field data, and a preview deployment gets almost no traffic.
- **Fix:** use one lab method before and after, for example Lighthouse mobile, 5 runs per route, comparing medians, within a stated margin.

**R19. The 360×640 first-screen goal has no check** (readiness)

- Add an automated check in all three locales that both buttons sit above the fold.

**R20. The font check is "by eye"** (style)

- State what counts as a failure: overflow, a heading that changes line count, or a layout shift over 4px. Or name the owner's sign-off as the gate.

### Wording

**R21. Metaphor terms are used without definitions** (style)

- The terms: felt, fold, leaf, opening, strip, stops, calls, deal, redeal, paper/ink/lime, turn.
- Add a short glossary at the top of the plan.

**R22. Some instructions can be read two ways** (style)

- Line 687: "with `tabIndex={-1}` links removed".
- Line 720: "ink or lime by position".
- Line 710: "passes halfway".
- Line 729: "a fixed tilt".

**R23. The step 0.3 checklist is hard to act on, and some cross-references have no source** (style)

- Some finding ids (M\*, N\*) and choice ids (B1, C1, D2) are given without saying which document defines them.
- "The brief's M3" adds a second numbering scheme.

## Nits

1. There are two `ask` signatures, and two names for the answer component (`Answer` and `AnswerView`). `sheet_open` may fire twice, from `WorkTable` and from `HomeCard`.
2. The WhatsApp number is hard-coded. Take it from `profile.contactLinks`.
3. REVIEW-2026-11.md has no section 12. Steps 0.2 and 0.3 should say "add".
4. Step 4.1:
   - "Twelve card links" has no selector, and only eleven of them link to `/work/`.
   - The `.mjs` script cannot import `home.ts` to read the `h1`.
   - The verify script checks more than "logo, lang, dir".
5. The way the fixture is frozen is not specified, and the order matters: freeze the fixture, then delete the old page.
6. Test setup is not stated:
   - jsdom's `HTMLDialogElement` has no `showModal`.
   - `vi.mock("next/navigation")` is needed.
   - New tests must mock `../contact-form`.
7. Step 3.4 should reuse `getProjectParams()` and copy `dynamicParams = false` into the new segment.
8. `WorkTable` should filter through data attributes, the same way `WorkFilters.applyFilter` does.
9. Load the `HomePortal` picture eagerly (`priority`), so the zoom does not pin late.
10. Rollback: steps 1.2, 2.7, 2.11, 2.12 and 2.14 change live files outside the cut-over commit. Step 1 is called "no visible change", but step 1.7 changes form copy.
11. Step 0.3 has no fallback for "custom events not allowed". Step 0.1 does not say whether `.impeccable/`, `.taste-skill/` and `egm-review/` are committed.
12. The rule that steps end with `npm test` and `npm run lint` passing cannot apply to step 0.
13. Step 2.16 and step 5.1 disagree on when the fixture is frozen. Step 3.5 has no body. Line 782 is too long.
14. Wording:
    - "without the owner's word";
    - "(already written)";
    - "moves … unchanged" (the footer does change);
    - the uneven Type/Scope labels;
    - "they refuse other hosts", which should name the frame-ancestors policy;
    - "swap test" and "UpNote" are never defined.
