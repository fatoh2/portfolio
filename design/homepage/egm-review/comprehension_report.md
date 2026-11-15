# Stage 6: Comprehension Test

**Target:** [DESIGN-2026-11.md](../DESIGN-2026-11.md). FeatureRange: lines 1–550. DetailedRange: lines 551–876.
**Date:** 2026-11-15
**Reviewer:** `egm-comprehension`, completed. It judged the document on its own and did not open the linked brief, review or previews.

**Verdict:** no Blockers, 8 Major, 8 Nits. The reviewer could paraphrase every section. The Majors are places where parts of the design contradict each other or do not connect.

## What this proposes

The design replaces the homepage of fhaj.dev, a portfolio site in English, Arabic and Hebrew.

**First screen.** It looks like a folded sheet on a card table. It carries:

- a headline in all three languages;
- the résumé and WhatsApp buttons;
- a question box with rule-based answers and suggested questions ("chips").

**Further down the page:**

- a scroll-driven zoom through the Arabic letter ف;
- twelve project cards dealt onto the page;
- services, process and contact as plain text.

**The sheet.** Clicking a card opens a "sheet" over the homepage. The sheet can switch between the three languages. It is built as a Next.js intercepted route, so the address bar shows the real case-page address and Back closes the sheet. Saqroon is the exception: it has no case page, so its sheet is a plain dialog with a history entry.

**The build.**

- New files go under `src/components/home/`.
- The design goes live in one cut-over commit. That commit moves the page into a `(home)` route group and switches the Latin font across the whole site.
- A "nothing lost" test checks that every link, download and id on today's page survives.
- Each step is gated by tests, a short throwaway test of English-route interception, Vercel checks, a test on a real phone, and the owner's review of the Arabic and Hebrew copy.

## How the existing system works, per this document

**Routing.** The site is a Next.js 16 app with `[locale]` routes. English has no `/en` prefix: `src/proxy.ts` rewrites `/x` to `/en/x`. Case pages live at `[locale]/work/[slug]`.

**Today's homepage.** `src/app/[locale]/page.tsx` renders `PortfolioHome`: a hero, a filtered `ProjectDeck`, services, process, contact and a footer.

**Content** comes from three files:

- `portfolio.ts`: 11 projects, plus Saqroon as `focusQuest`, which has a different shape and no case page;
- `project-showcase.ts`;
- `now.json`.

**Existing pieces the design reuses:**

- `PortalMotion` drives a zoom that stays fixed on screen while the page scrolls. It works on `data-portal-*` markup from `brand-portal.tsx`, with guards for reduced motion and real phones.
- Analytics are Vercel custom events, sent through `track`, `TrackedLink` and `TrackedAnchor`.
- The agent demo already has `normalize` and `detectLanguage`.
- `LiveEmbed` hosts SOLitaire's frames.

**Deployment.** Every push to `main` deploys to production. The deployment check only verifies the logo, `lang` and `dir`.

## Findings

### 1. "See it" is described three different ways (Major)

**Where:** Overview 25–26; CUJ 2, line 127; "The zoom through the ف", 279–280; step 2.5, 701–703.

**Gap:** CUJ 2 says tapping "See it" plays the zoom. The Technical Plan says it only swaps the picture and moves focus, and the visitor then scrolls through the zoom. Moving focus normally scrolls the page, which may clash with the non-goal "No automatic scrolling".

**Recommendation:** State one behaviour: whether the page scrolls, whether focus uses `preventScroll`, and what is on screen right after the tap. Then make CUJ 2 match.

### 2. The design contradicts itself on which language an answer is written in (Major)

**Where:** line 264 and CUJ 2 (line 125), against step 1.4, lines 627–628.

**Gap:** Lines 264 and 125 say answers follow the page's language. Step 1.4 says they follow the language the question was typed in. The two rules give different results when someone types English on `/ar`.

**Recommendation:** State one rule, once. The four-stop strip already shows "the language the question came in", so the 1.4 rule looks like the intended one.

### 3. The goal is "every answer in the server HTML", but only the three chip answers are rendered (Major)

**Where:** Goals 65; CUJ 6, 159–160; Thread, 343–344; steps 1.4, 2.13 and 2.16.

**Gap:** The goal and CUJ 6 promise every possible answer in the HTML without script. `Thread` renders only `presetAnswers(locale)`, and the test checks only those three answers.

**Recommendation:** Narrow the goal and CUJ 6 to "every chip's answer", or render every rule's answer and extend the test.

### 4. An error boundary with an empty fallback removes the HTML it promises to keep (Major)

**Where:** "When script breaks", 383–387; NFR line 535; steps 2.4, 2.5 and 2.15.

**Gap:** The design promises that if an island fails, the chips and the face-up cards stay usable as links. But `AskBox` renders the chips itself, and the cards sit inside the boundary around `WorkTable`. A fallback of nothing removes both.

**Recommendation:** Say where the boundary sits relative to the server-rendered children, or drop the claim.

### 5. No part of the plan opens Saqroon's dialog (Major)

**Where:** 290, 324–325; steps 2.3, 2.8 and 2.10.

**Gap:** Saqroon's card links to `#saqroon` and also carries `id="saqroon"`, so it links to itself. No step says which component catches that click, or where the dialog version of `ProjectSheet` is mounted. Answers that point to Saqroon's sheet anchor have the same gap.

**Recommendation:** Name the component that handles a Saqroon click, from a card and from an answer. Say where it renders `ProjectSheet mode="dialog"`, and what `#saqroon` shows without script.

### 6. The design never says how the sheet's "Read the case study" link escapes interception (Major)

**Where:** Overview line 29; "The project sheet", 309–319; step 2.10, line 738.

**Gap:** While the sheet is open, the address is already the case-page address, and the link goes to that same address. Nothing says how the click becomes a full page load instead of re-rendering the slot or doing nothing.

**Recommendation:** State the mechanism, for example a plain `<a>` or a hard navigation, and add it to the interception checks.

### 7. "Rollback is one commit" ignores changes merged before the cut-over (Major)

**Where:** Goals 74–76; NFR 533–534; steps 1.2, 1.7, 2.7, 2.11, 2.12 and 2.14.

**Gap:** Steps 1 and 2 change files that today's page uses: `ui.ts`, `portal-motion.tsx`, `live-embed.tsx`, `agent-demo.tsx`, and the footer move. Reverting the cut-over leaves all of these changes in place. One example: the new `form.failed` text assumes WhatsApp and email sit above the form, and the design does not say whether that is true on the old page.

**Recommendation:**

- Say whether the branch is merged as one squash or as separate commits.
- List which earlier changes survive a revert.
- Confirm that each one is safe on the old page.

### 8. The existing zoom is never described (Major)

**Where:** Overview line 25; 274–284; steps 2.6–2.7.

**Gap:** A new reader is not told what the monogram, opening, scene, stage and pinning are, or what the visitor sees while scrolling.

**Recommendation:** Add two or three sentences that describe today's zoom as a visitor sees it and define those terms.

### Nits

9. **Calls versus filters** (97, 297, 729–730, CUJ 5). The design removes the filters, but the "calls" that replace them still filter the cards. Define a "call" and say how it differs from a filter.
10. **"Both data shapes" is used before they are named** (215). Name `projects` and `focusQuest` there, and say why Saqroon differs.
11. **`statusNote` and `phase` have no consumer** (220, 229, 327). "Phase line" and `build-now.mjs` (872) are also unexplained.
12. **The `Answer` type is unclear** (254 against 625; 626; 265–267):
    - The signature changes from `ask(text, locale)` to `ask(text, page, source)`.
    - `Answer` has no text field.
    - "Source" means two things: whether the question came from a chip or was typed, and where the answer came from.
    - `handoff` is vague, since no person stands behind the box.
13. **The guard count disagrees** (448 says six; 282–283 list five).
14. **Concept C is never described** (12; 428–434).
15. **Some references assume outside knowledge.** Line 487 mentions "the other agent" without saying who. Step 5.2 mentions `Home.md` and the UpNote entry. Step 3.1 mentions "structured data". Line 312 refers to "the layout" without naming the file, and line 259 to `detectLanguage` without naming its module.
16. **Line 687 is hard to parse** ("`aria-hidden` pictures with `tabIndex={-1}` links removed").
