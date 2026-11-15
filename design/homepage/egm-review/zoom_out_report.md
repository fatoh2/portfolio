# Stage 5 — Initial Zoom Out Review

**Target:** [DESIGN-2026-11.md](../DESIGN-2026-11.md) (lines 1–876, full file)
**Date:** 2026-11-15
**Standard:** EGM `zoom-out-standard.md`

## Reviewer Status

| Reviewer | Status |
| --- | --- |
| `egm-zoom-out` | completed |

**Verdict:** the doc passes the context check, with 7 Major findings and 6 Nits. There are no Blockers.

The reviewer read:

- the target doc and the files it links ([concepts_brief.md](../../../concepts_brief.md), and [REVIEW-2026-11.md](../REVIEW-2026-11.md) sections 8–11);
- [AGENTS.md](../../../AGENTS.md) and the three Next.js docs (error handling, intercepting routes, parallel routes);
- `portfolio-home.tsx`;
- the components the plan says it reuses, to check that reuse.

The reviewer did not run anything: no build, no tests, no browser.

## Prioritized Findings

### 1. Choice A3 builds two sheet mechanisms, and its cost is understated (Major)

**Affected scope:** "The project sheet" (304–325); Owner choice A table (394–399); step 2.10 (735–744); steps 3.1–3.6 (801–823); Open Questions (102–104).

**The problem.** The A table gives A3's cost as "a new slot and default.tsx files". The real list is longer:

- the homepage moves into a route group;
- a new layout, the `@sheet` slot, a default file, and an intercept page with its own `generateStaticParams`;
- possibly a `(home)/default.tsx`;
- a throwaway test for English addresses, with a fallback that puts `/en/work/<slug>` in the address bar;
- an exemption from the non-goal about case pages.

On top of that, Saqroon has no case page, so `ProjectSheet` still needs a dialog mode using `pushState` and `popstate`. That dialog mode is A1, the option the owner rejected. So the build ships both A1 and A3.

**What A3 gains.** Only one thing over A1: the address bar shows the case-page address. A shared or refreshed address opens the case page, not the sheet (line 399), which a plain case-page link already does. Review finding M6 asked the plan to say what the sheet does that the case page does not, and the doc never answers it.

**Recommendation.** Put the full cost list to the owner and have them confirm A3 again. The simplest alternative is A1 for all twelve cards:

- the cards stay real `<a href>` links to the case pages;
- a plain click opens the dialog and adds a history entry;
- the sheet's "Read the case study" link is the address people share.

If A3 stays, drop the claim that it is cheap.

### 2. Under A3, the sheet's "Read the case study" link may not open the case page (Major)

**Affected scope:** lines 327–328 and 737–738; CUJ 4 (145).

**The problem.**

- While the sheet is open, the address is already `/work/<slug>`. If the case-study link is a `next/link`, clicking it is a soft navigation to that same address, so it will probably be intercepted again or do nothing.
- The parallel-routes doc says a soft navigation to an address the slot does not match leaves the modal visible. Only an `@sheet/page.tsx` or a catch-all that returns null prevents that, and the plan has neither.

**Recommendation.** Make the in-sheet case link a full-page navigation (`TrackedAnchor` or a plain `<a>`), and add a check for it to the Verification Plan. Add an `@sheet/page.tsx` that returns null, or explain why it is not needed.

### 3. The sheet slot renders outside the `.sheet-home` style scope (Major)

**Affected scope:** data-flow diagram (200–210); "Styles and font" (371–372); step 2.1 (664–670); step 2.15 (769); step 3.2 (807).

**The problem.** The `.sheet-home` class sits on `HomeSheetPage`'s root `<div>`, which is inside `children`. The `(home)` layout renders `{children}{sheet}` side by side, so `ProjectSheet` has no `.sheet-home` ancestor. None of the scoped rules reach it, including the copied `AgentDemo` and `DeckVideo` rules.

**Recommendation.** Put the `.sheet-home` wrapper and the stylesheet import in `(home)/layout.tsx`, around both slots, or give `ProjectSheet` a root class of its own.

### 4. The error boundaries would remove the server HTML they are meant to protect (Major)

**Affected scope:** "When script breaks" (381–387); NFR Script failure (535–536); steps 2.2, 2.4, 2.5, 2.15.

**The problem.**

- `AskBox` renders the chips itself, and `WorkTable` wraps the cards. With a fallback of "nothing", a render error removes the chips or all twelve cards.
- These boundaries also do not catch errors thrown in event handlers, which is where most of the `animate`, `showModal` and `history` calls run.

**Recommendation.** Follow the existing `WorkFilters` pattern: a sibling island that enhances server-rendered elements through `data-*` attributes, and never wraps them. Otherwise, make the fallback render `children` instead of nothing.

### 5. The browser copy of `ask()` would pull the content files into the client bundle (Major)

**Affected scope:** data-flow diagram (196–197); step 1.4 (622–634); step 2.5 (690–703).

**The problem.** `ask()` runs in the browser, but the "live", "install" and per-project answers need each card's status, downloads and title. `buildCards()` is server-only, so importing it would send `portfolio.ts` (842 lines, three languages) to the browser.

**Recommendation.** The server page passes `AskBox` a small list of card references (slug, title, status, has-download), and `ask()` takes that list as an argument.

### 6. "Every answer the box can give" is in the Goals but not in the plan (Major)

**Affected scope:** Goals (65); CUJ 6 (159–160); rules (256–258); steps 1.4 and 2.13; the "nothing lost" test.

**The problem.** The Goals and CUJ 6 promise every possible answer in the server HTML, which is about 23 answers. `Thread` renders only the three preset answers, and the tests check only those three.

**Recommendation.** Narrow the goal to services, process and the chip answers, and update the Goals, CUJ 6 and the NFR section to match.

### 7. "Nothing lost" can pass on links nobody can see, and Saqroon's card links to itself (Major)

**Affected scope:** "The work table" (288–291); step 2.8 (718–724); Goals (62–64); CUJ 5 (151–153); removals (97–98).

**The problem.**

- Downloads and live links sit in visually hidden text inside each card. Keyboard users will tab onto links they cannot see.
- Saqroon's card links to `#saqroon` and also carries `id="saqroon"`, so it links to itself. Without script, a sighted visitor cannot reach Saqroon's site or its APK.
- Today, every APK is one tap away in the install strip (`portfolio-home.tsx` 162–201). In the new plan it takes three taps. That change is not among the removals the owner signed off.
- The brief's goal "no harder to reach" (concepts_brief.md line 288) was dropped without comment.

**Recommendation.**

- Show Saqroon's links visibly on its card, and hide no focusable links.
- Either list the install strip as a removal for the owner to sign off, or keep one visible download list.
- Make the "nothing lost" test check that links are visible and reachable, not only that each `href` exists.

### Nits

- **N1. Code details in the architecture section** (259–262, 295–296). The regex and the `Math.random()` note belong in steps 1.4 and 2.9, which already repeat them.
- **N2. The WhatsApp number is typed in again** (633). Take the base from `profile.contactLinks` in `portfolio.ts` (line 143).
- **N3. Two `HomeCard` fields repeat data held elsewhere** (219, 230, 591). `order` repeats each card's sorted position, and `aliases` repeats `home.ts` and is shipped to the client in every sheet's props.
- **N4. The `PortalMotion` change may not be needed** (280–282, 715–716). `PortalMotion` already re-measures when the picture's `load` event fires (`portal-motion.tsx` line 210). The real requirement is that `PortalPicture` changes `src` on the same `<img>` element and never remounts it.
- **N5. "Moves focus to the section" conflicts with "no automatic scrolling"** (279, 702 against 90, and CUJ 2 at 127). `focus()` scrolls the page unless `preventScroll` is set, so say which behaviour is intended.
- **N6. The rollback and footer claims are overstated.** Some steps change live files before the cut-over commit (1.2, 1.7, 2.7, 2.11, 2.12, 2.14), so reverting that commit does not undo them; say they must be safe on the old page. The footer's homepage styling, `.home-page .site-footer` (`homepage.css` line 744), is missing from step 2.1's list of rules to copy.

## Not checked

Nothing was checked at run time. Next.js interception, `unstable_catchError` in 16.2.9 and the sheet's layout were read from the docs only. The reviewer did not open preview H, all of `portfolio.ts`, or `site-header.tsx`.
