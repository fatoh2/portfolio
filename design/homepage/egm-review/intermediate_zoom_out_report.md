# Stage 8: Intermediate Zoom Out

**Target:** [DESIGN-2026-11.md](../DESIGN-2026-11.md), full file (lines 1–876), unchanged since Stage 5.
**Date:** 2026-11-15
**Inputs:** [zoom_out_report.md](zoom_out_report.md), [comprehension_report.md](comprehension_report.md) and [critic_report.md](critic_report.md).

## Reviewer Status

| Reviewer | Status |
| --- | --- |
| `egm-zoom-out` | completed |

**Verdict:** The context check passes. The review found 0 Blockers, 5 Majors and 3 Nits.

The overall direction holds up: server HTML first, reuse of PortalMotion, cards built from the content files, and one cut-over. The earlier findings fall into three groups:

- the routing, which is choice A3;
- how the islands and their error boundaries are shaped;
- how data reaches the question box.

Each group has one structural fix that removes more work than it adds. Fixing each finding one at a time would make the design bigger without making it simpler.

## Findings

### Z1. Choice A3 now costs more than its one benefit, so the owner should decide choice A again before Step 0.2 (Major)

**Scope:** Owner choice A (391–399); "The project sheet" (304–338); Open Questions (102–104); steps 0.2 and 3.1–3.6; the goal "Rollback is one commit" (74–76); the non-goal (83–88).

The owner chose A3 from a table that listed its cost as "a new slot and default.tsx files". The earlier stages found that A3 actually needs:

- the move into a route group;
- a new layout;
- `@sheet/default.tsx`;
- a catch-all page that returns null (C2);
- an intercept page with its own `generateStaticParams`;
- possibly a `(home)/default.tsx`;
- a throwaway test of English interception, with an `/en` fallback;
- a full page load for "Read the case study" (Stage 5 #2, Stage 6 #6, C2);
- `scroll={false}` on every card and chip (C5);
- the `.sheet-home` wrapper moved into the layout (Stage 5 #3);
- focus returned to the card by hand, because the dialog is unmounted instead of closed (part of C7);
- a change in what analytics count, because soft navigations become case-page pageviews (C N1);
- an exemption from the "no change to the case pages" non-goal.

A1 still ships on top of all that, as Saqroon's dialog mode, so the build carries two sheet mechanisms.

**What A3 gains:** only that the address bar shows the case-page address. A shared or refreshed address opens the case page, which a plain card link already does.

**What A1 for all twelve cards removes:**

- Open Question 1 and the interception test;
- steps 3.2–3.6;
- Stage 5 #2 and #3, Stage 6 #6, and C2, C5 and N1;
- the case-page exemption from the non-goal.

The cut-over goes back to switching one import plus the font. A native `<dialog>` closed with `close()` returns focus to the card without extra code. The bundled docs confirm that `pushState` works with the App Router (`04-linking-and-navigating.md` 341–347). Step 0.2 then tests A1's history behaviour, which it has to cover for Saqroon anyway.

**What A1 costs:**

- All twelve sheets' text, in three languages, goes into the homepage payload. `LiveEmbed` and `AgentDemo` still load only when a sheet is open.
- Escape and Android Back still need the `cancel` handling from C3. That is needed under A3 as well.

**Recommendation:** Put this list to the owner and have them decide choice A again. If A3 stays, every item above becomes a named step, and the A table's cost row must be corrected.

### Z2. Render every answer once on the server and pass the results to the question box (Major)

**Scope:** Data flow (193–211); step 1.4 (622–634); step 2.5; the goal at line 65; CUJ 6.

Every answer depends only on its intent and the page language. The one exception is the unknown answer's WhatsApp link, which uses the visitor's typed text. So the server page can render each answer with `AnswerView` and pass the results to `AskBox` as props. `Thread` renders the same elements.

**What this fixes:**

- Card data and answer text stay out of the client bundle (Stage 5 #5, C9). The client keeps only the matcher.
- "Every answer in the server HTML" becomes true at almost no cost (Stage 5 #6, Stage 6 #3). Stage 5's advice to narrow that goal points the wrong way.

**What it requires:** answers always use the page's language. That is already what lines 125 and 264 say, and what choice B1 chose, so it also settles Stage 6 #2. The four-field line under each answer can still report which language the question was typed in. Whether `Thread` shows 3 answers or about 23 is a layout choice for the owner.

### Z3. Islands add behaviour to server markup and never render that markup themselves (Major)

**Scope:** "When script breaks" (381–387); steps 2.2, 2.4, 2.5 and 2.9; NFR (535–536).

`WorkFilters` already works this way: it acts on server-rendered rows through `data-tags` (`work-filters.tsx` line 9). If `WorkTable` and `AskBox` follow the same rule, a boundary that falls back to nothing is correct, because only the added behaviour is lost when an island fails. This settles Stage 5 #4, Stage 6 #4 and C1. The forced-throw test then checks only that the server markup is still on the page.

**An earlier fix that does not work:** Stage 5 #4 suggests the fallback could render `children`. The children are the island that just threw, so rendering them again throws again.

**Missed by every earlier stage:** the brief added the boundary so that failures would not be silent (concepts_brief.md 239). A fallback of nothing hides the failure even more completely. Log the caught error, or send one event, so that a failure is visible.

**Smaller point:** a plain React class boundary is stable and about the same size as `unstable_catchError`. Using it removes the "unstable API" risk from C10.

### Z4. The "nothing lost" test checks the wrong set: too many ids, and no content (Major)

**Scope:** Step 2.16 (776–783); step 2.8 (721–723); the goals at 62–64.

**Too many ids.** Step 2.16 asserts that every `id` on the old page survives. That is wider than what the owner approved, which was an action table and an anchor table (concepts_brief.md 404–407). Today's page carries about 20 internal ids the new page has no reason to keep:

- the deck's radio, panel and title ids;
- `*-title` heading ids;
- `home-title`;
- `portal-counter-<locale>`.

The over-wide rule is also behind the leftover `id="agent"` and `id="saqroon"`, and so behind Saqroon's card linking to itself. No link inside the site targets `#agent` or `#saqroon`. The only in-site hash links are `#work`, `#contact`, `#services`, `#process` and `#top`.

**No content.** The test cannot notice a block of content that is lost, and one already is: the visible "Now" list (`portfolio-home.tsx` 144–161). It is not among the removals the owner signed off, and `phase` has nothing that uses it.

**Recommendation:**

- Feed the test from the owner's two tables: every href, every download, and the hash ids that are actually linked.
- Ask the owner whether anything outside the site links to `#agent` or `#saqroon`. If nothing does, drop those ids and give Saqroon's card a real target.
- Either add the "Now" list to the signed removals, or render the phase lines on the cards.

### Z5. Some earlier findings are overstated or wrong (Major, because they would add work for nothing)

- **"See it" against "no automatic scrolling"** (Stage 5 N5, Stage 6 #1, C4). The non-goal says the page moves only when the visitor scrolls *or taps*, so movement after tapping "See it" is allowed. Alternative E was rejected because it scrolled after an answer, with no tap.
  - Fix: make "See it" an ordinary link to the zoom section, so PortalMotion's existing hash and focus handling apply.
  - `preventScroll` is not a real option, because PortalMotion's `focusin` handlers scroll the page anyway (185–207).
  - What is left is CUJ 2's wording.
- **C11, a conversion baseline with a rollback trigger,** reverses a decision the owner already recorded: no before-and-after comparison, because traffic is too small (concepts_brief.md 409–411). Drop it.
  - The same small-numbers problem applies to "30% unknown over 30 days" (line 546). Call that a prompt for the owner's judgement, not a threshold.
- **C10, a Risks section,** helps only if it replaces the scattered mentions. Otherwise it is a fourth copy. Two of its risks, interception and the unstable API, disappear under Z1 and Z3.
- **C13 and C17** are wording problems, so they are Nits.
- **Stage 5 N4 is only half right.** PortalMotion does re-measure on `load` (line 210). But a resize between the picture swap and its `load` makes `measure()` reset the stage (line 124). Fix this inside `PortalPicture` by preloading the next image with `new Image()` and `decode()` before swapping `src`. Step 2.7, the change to PortalMotion, can then be dropped.

### Nits

- **N1. A simpler fix for the deal flash (C8).** Deal only when the visitor taps a call or "Deal again", and leave the cards face up from the server HTML until then. This removes the flash, the hash-landing case and the tap-during-deal case. It changes the owner's decision to deal the cards face down (concepts_brief.md 374), so it is their call.
- **N2. The non-goal has been worn down twice**, by D2 and A3. Under A1, only the font exemption remains.
- **N3. Typed-question matching keeps growing on a path the design calls secondary**: C6's prefix handling, the 90% fixture bar and the language rule all add to it. Keep the typed rules small. Most of their value is the unknown answer's WhatsApp handoff.

## Not checked

Nothing was run. A1's history behaviour, `popstate` handling, focus return from `<dialog>` and the PortalMotion race were all judged from the docs and the code, not tested. The reviewer did not open preview H or `site-header.tsx`.

**Main risk:** if A3 stays and its fixes are added one by one, the sheet ends up with two mechanisms and about ten special cases, and Step 0.2's test covers only some of them.
