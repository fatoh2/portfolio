# fhaj.dev homepage rebuild from preview G

* **Author:** Fathallah Haj (fatoh2)
* **Date:** 2026-11-10

## Overview

The concept is to replace the fhaj.dev homepage with a real build of preview G: a folded sheet on a card table, a question box answered by rules in three languages, résumé and WhatsApp in the first screen, a zoom through the eye of the ف, a compact message route, and twelve project cards that open in three languages. It has two pass/fail tests: the "swap test" and "nothing lost".

Six reviewers read the prototype, the decision record and the production code. All six completed. Their shared verdict is that the concept is not ready to plan:

- The page in scope has never been drawn. Preview G has no résumé link, no WhatsApp in the first screen, no site header, no compact strip, no contact form and no Arabic or Hebrew layout.
- Preview G fails "nothing lost" today. It drops every APK download, the case-study links of the six live projects, Saqroon's site and APK, email, GitHub, LinkedIn, the contact form and the playable SOLitaire embed.
- Two accepted decisions contradict each other: "header untouched" and "remove services and process". The header links to both sections on every page.
- The "clicks do not drop" test cannot be measured: there is no baseline, and moving the buttons to the first screen changes the counts by placement alone.
- The question box tells visitors their question was passed on. Nothing is sent.
- The prototype's content exists only after script runs, against the no-script constraint.

Nothing was run by any reviewer. Every finding comes from reading files. Paths below are relative to `C:\Users\Fatoh\workstation\portfolio`. `G` means `design/concepts/2026-11/previews/g-mix.html`.

## Analysis

### Reviewer status

| Reviewer | Status |
| --- | --- |
| `egm-design` | completed |
| `egm-codebase-details` | completed |
| `egm-zoom-out` | completed |
| `egm-comprehension` | completed |
| `egm-implementation-readiness` | completed |
| `egm-structural` | completed |

Findings after deduplication: 7 Blockers, 12 Major, 12 Nits. Line numbers are the reviewers' own readings. The synthesizer spot-checked `src/components/site-header.tsx` lines 25-33, `G` lines 276-311, and the test files under `src`; those matched.

### Blocker

**B1. "Nothing lost" has no inventory, and the prototype already loses actions.**
Lens: all six reviewers.

There is no written list of what the current page offers, so the test will be argued, not passed. Actions on the live homepage that preview G lacks:

| Action today | Where today | In preview G |
| --- | --- | --- |
| Résumé download | `src/components/portfolio-home.tsx` 331-345 (footer only) | Nowhere in the file |
| Email, GitHub, LinkedIn | `portfolio-home.tsx` 296-317, 332-345 | Absent. The footer lives inside the file being replaced. |
| Contact form | `portfolio-home.tsx` 319-322 | Absent |
| APK downloads, including three SOLitaire builds | `src/components/project-deck.tsx` 122-129; `portfolio-home.tsx` 123-135, 162-201; `src/content/portfolio.ts` 665-692 | No download link. The "Installable" suit only turns cards (`G` 423-426); the dialog has one button (`G` 257-266). |
| Case-study link for each live project | `project-deck.tsx` 119; `portfolio-home.tsx` 76-82 | `link()` returns the external site when one exists (`G` 278, 442), so six case pages lose their homepage route. |
| Darbak web preview | `portfolio.ts` 502 | Dropped from the hand copy (`design/concepts/2026-11/previews/shared.js` 25) |
| Playable SOLitaire embed | `project-deck.tsx` 26, 32 | Absent, and not in the keep list |
| Five work filters | `src/components/work-filters.tsx`; `src/lib/project-tags.ts` 3 | Two suits (`G` 231-232) |
| Interactive agent demo with "why this reply" | `src/components/agent-demo.tsx` 41-107 | One fixed exchange (`G` 433-436) |
| Evidence list per project | `portfolio-home.tsx` 97 | Absent |
| Services and process text | `portfolio-home.tsx` 204-282 | One sentence (`G` 293) |

Recommendation: before any build, put a table in the plan with each action, its current place, its new place, taps and scroll depth at 390 wide, and its event name. The owner signs each deliberate removal. Encode the table as one vitest that renders the homepage in three locales and asserts every `href` and download. Two tests already do part of this and should be rewritten, not deleted: `src/components/solitaire-media.test.tsx` 10-23 and `src/components/seeker-radar.test.tsx` 12-22.

**B2. "Tracked clicks do not drop" cannot be measured as written.**
Lens: `egm-design`, `egm-codebase-details`, `egm-implementation-readiness`, `egm-zoom-out`, `egm-structural`, `egm-comprehension`.

- No baseline, window or threshold exists. The owner gave no numbers.
- `whatsapp_click` and `email_click` fire only from the bottom contact block (`portfolio-home.tsx` 303-307). `resume_download` fires only from the footer (332-342). `brief_submit` fires only on success (`src/components/contact-form.tsx` 24).
- Moving WhatsApp and the résumé to the first screen raises their counts by placement alone. The test would pass while form submissions fall unseen.
- "Contact clicks" is not defined. It could mean `email_click`, `brief_submit` or `cta_click`.
- The prototype's WhatsApp links are untracked plain anchors, one built from an HTML string (`G` 243, 337).
- At portfolio traffic the monthly counts are probably small, so a before/after comparison may be noise.

Recommendation: export the current count per event before the branch merges; this cannot be done afterwards. Keep the event names unchanged and add a `placement` value for each new position. Judge `brief_submit` plus `whatsapp_click` as the lead measure, as a rate per home pageview over a named window. If the baseline is too small to compare, say so and replace this test with the inventory test in B1 plus "every placement fires its event on the preview".

**B3. "Header untouched" contradicts "remove services and process".**
Lens: `egm-design`, `egm-codebase-details`, `egm-implementation-readiness`, `egm-comprehension`, `egm-structural` (Blocker); `egm-zoom-out` (Major).

The header links to `/#services`, `/#work`, `/#process` and `/#contact` (`src/components/site-header.tsx` 25-33, repeated in the mobile menu at 105-117). The ids `services` and `process` exist only on the sections being removed (`portfolio-home.tsx` 205, 266). After launch two of four nav links go nowhere, in three languages, from every page including the case pages. The click events would still fire and look healthy.

`#work` and `#contact` must also survive: case pages and the header button link to them (`src/components/project-page.tsx` 56, 230, 246; `site-header.tsx` 97). Preview G has `#work` but its closing section is `#reply`, not `#contact` (`G` 227, 239). `#agent` and `#saqroon` (`portfolio-home.tsx` 249, 104) also disappear.

Recommendation: write an anchor table into the plan. Either the header nav is in scope and changes, or the new page keeps real targets with those ids. Add a test that every in-site hash link in the header and case pages resolves to an element on the rendered homepage.

**B4. The prototype breaks the no-script constraint, and moving services and process into answers hides them.**
Lens: `egm-design`, `egm-structural`, `egm-comprehension` (Blocker); `egm-implementation-readiness`, `egm-zoom-out` (Major).

- Cards, chips, first-screen cards and result shots are written by script (`G` 313, 344, 402, 409-415, 435).
- Step content and cards start invisible until script adds a class (`G` 55, 91, 390-391).
- The reduced-motion layout is switched by a script-added class, not a media query (`G` 130-133, 274).
- Without script the page is a headline and an empty form.
- Services and process text is plain scrollable text today (`portfolio-home.tsx` 204-246, 265-282). Behind a keyword box it is absent without script, and with script it appears only if the visitor types a matching word. That is harder to reach, which fails "nothing lost" too.
- The services section is the only place on the homepage that names Kubernetes, Terraform and ArgoCD (`portfolio.ts` 200). The résumé is a DevOps CV. A hirer scanning the page finds nothing, and search engines lose that text.

Recommendation: every answer the rules can give is also server-rendered as visible, linkable text, for example a plain question-and-answer list. The box only picks among existing nodes or scrolls to them. Content is visible by default and script only adds motion. Production already follows this rule (`src/components/portal-motion.tsx` 11-17, 122-133).

**B5. The question box says a question was passed on when nothing is sent.**
Lens: `egm-design`, `egm-codebase-details`, `egm-comprehension` (Blocker); `egm-implementation-readiness` (Major).

The replies "That is one for Fathallah. I've passed it on." and "I've passed it to Fathallah." (`G` 288-289), and "Fathallah gets the thread" (`G` 308), are false. `send()` makes no network call (`G` 331-343). This breaks the no-invented-proof rule. It also loses leads: price and hiring questions are the highest-intent ones, and a visitor who believes the message was delivered waits and never taps WhatsApp. The owner never sees the question.

Recommendation: do not make it true with a server send; that adds an unprotected email path (`src/app/actions/contact.ts` 48-51, 75-83 has no rate limit). Change the copy to an offer, "send this to Fathallah on WhatsApp", with a tracked link that puts the visitor's own question in the prefilled text. Today the prefill is one fixed English sentence (`portfolio.ts` 143). Never send typed text to analytics; send intent and language only.

**B6. The page about to be built has never been drawn.**
Lens: `egm-zoom-out`, `egm-comprehension` (Blocker); `egm-implementation-readiness` (Major).

The owner said "not bad" to preview G. The scoped page differs from G in at least eight ways, none of them prototyped:

- résumé and WhatsApp in the first screen (`G` 163-192 has neither);
- the real sticky header on top;
- four full-screen steps shortened to one compact strip (only the four steps and the rail exist, `G` 159-161, 194-225);
- answers in Arabic and Hebrew;
- a contact form at the end;
- status and "now building" on each card;
- install downloads;
- a version that works without script.

The first screen already hides its lead paragraph on short phones (`G` 155) before any of these are added. The decision record's own next step asks for a copy deck and phone compositions before the build (`design/homepage/REVIEW-2026-11.md` 190-193).

Recommendation: update the static preview to the real scope at 375×667 and 390×844, for all three locales, with the real header, both buttons and the box. Get the owner's read before any Next.js work. If it does not fit, cut the eight table cards on phones first, then the chips.

**B7. Saqroon loses its only home, and "twelve projects" is eleven plus one of a different shape.**
Lens: `egm-implementation-readiness`, `egm-codebase-details` (Blocker); `egm-zoom-out`, `egm-structural`, `egm-comprehension`, `egm-design` (Major).

`projects` holds eleven entries. Saqroon is a separate `focusQuest` object with `website` and `builds`, no `links`, no `evidence` and no case page (`portfolio.ts` 780-833; excluded from routes at 838-841). The prototype points the Saqroon card at the homepage itself, with the comment "it lives on the homepage" (`G` 277-278). That is the section being removed, so the link becomes circular. Its site link, APK and install note (`portfolio-home.tsx` 104-143; events `live_product_open` and `focusquest_apk_download`) would exist nowhere.

Recommendation: decide before planning. The smaller route is one card shape that both data shapes map to (title, category, summary, status, first image, links), with the Saqroon card carrying its site link, APK and note. A full case page for Saqroon puts project pages in scope, which the owner's scope excludes.

### Major

**M1. The question box is a second rules engine, cannot match Arabic or Hebrew as written, and fails ordinary questions.**
Lens: all six reviewers.

- `route()` is an order-dependent regex ladder (`G` 283-296) beside the real rules in `src/lib/agent-demo.ts`. It carries its own copies of `detectLanguage` and the normaliser (`shared.js` 47-48 against `agent-demo.ts` 87-99).
- Every pattern uses `\b` word boundaries (`G` 287-294). In JavaScript these work on ASCII letters only, so no Arabic or Hebrew keyword or project name can match. The real rules avoid `\b` for those scripts (`agent-demo.ts` 101-111).
- Project matching uses slug words (`G` 283, 287). "Can you build a WhatsApp bot?" returns the WhatsApp agent project. "little", "nature", "camp", "lifestyle" and "radar" also trigger projects. A future slug containing "live" or "app" silently changes answers.
- "available" sits in the price rule (`G` 289), which runs first. "Which apps are available for Android?" gets the price refusal.
- There is no rule for résumé, CV, skills or stack. "Can I see your CV?" gets "I don't have an approved answer" (`G` 295).
- The fourth suggested chip, "What does a project cost?", is one the page then declines to answer (`G` 344, 289).
- Plain substring matching in Arabic would make باب (Bab) match inside أسباب.
- The only checks are two `console.assert` lines over four English questions (`G` 297-298).
- A chat box under "I build what answers your customers" reads as a sample of the product he sells. The most likely reply to free text is a refusal.

Recommendation: put the rules in `src/lib` beside `agent-demo.ts`, as a data table (intent, patterns per locale, answer per locale, items) with a pure function. Import `detectLanguage` and the normaliser; `normalize` is not exported today. Declare project aliases in three scripts in content, not derived from slugs. Add intents for résumé, stack, location and contact. Write the questions each audience will ask in each language as vitest fixtures, modelled on `src/lib/agent-demo.test.ts`, with a stated minimum answer rate and a test that fails when a new project has no answer. Treat localised chips as the main path and free text as second. A refusal names what can be asked. Decide whether dialect and Arabic typed in Latin letters are in scope.

**M2. Behaviour on `/ar` and `/he` is undefined.**
Lens: `egm-design`, `egm-zoom-out`, `egm-comprehension`, `egm-implementation-readiness`, `egm-structural`.

- Preview G exists only as an English left-to-right page. The `h1` is English and holds the form (`G` 169); Arabic and Hebrew are plain paragraphs (`G` 183-184).
- Those routes set `dir="rtl"` (`src/app/[locale]/layout.tsx` 67-70). That reverses the fold's column order while its corners, rotation and the rail stay physical (`G` 26-29, 54, 80).
- The opened card always starts in English (`G` 462), even on `/ar`.
- The card's language buttons flip copy in place and silently change the locale of the page its link opens (`G` 442). The header's switch changes the address (`site-header.tsx` 81-95). Two controls, two meanings.
- Two of the three headlines are unapproved drafts.

Recommendation: one table per locale in the plan: which line is the `h1`, which leaf holds the box, whether the fold mirrors, the card's first language, and the chip and answer language. State in one sentence how the card's language buttons differ from the header's. The Arabic and Hebrew copy is a launch gate on the owner's read.

**M3. The first screen is overcommitted on a phone and clips what does not fit.**
Lens: `egm-design`, `egm-comprehension`, `egm-zoom-out`, `egm-structural`.

- With the header, résumé and WhatsApp added it holds about two dozen tappable things: nine in the header, four chips, input, send, eight cards and two buttons.
- The stage is pinned at full height with `overflow:hidden` (`G` 18, 23). Content that does not fit is cut off and cannot be scrolled to.
- The sheet grows when an answer arrives (`G` 335-339), inside that clipped stage.
- The text input lives inside the pinned stage, and the sheet fades and loses pointer events as the page scrolls (`G` 363). If the phone scrolls to lift the input above the keyboard, the box being typed into can fade out. This was never tried on a device.
- Card titles go down to 11 px (`G` 104); the review already flagged small text (`REVIEW-2026-11.md` 31).

Recommendation: on phones the first screen is ordinary flow that may exceed one viewport; only the zoom is pinned. Name one primary action. The answer replaces the chips and does not grow the sheet. The "who I am" line is never hidden. Test at 375×667 and 360×640 on a real iPhone and Android, with the keyboard open and an answer showing, before any other section is built.

**M4. The zoom through the ف already exists in production; the prototype rewrites it without its guards.**
Lens: `egm-zoom-out`, `egm-design`, `egm-codebase-details`, `egm-comprehension`, `egm-implementation-readiness`, `egm-structural`.

`src/components/brand-portal.tsx` 70-101 masks the counter in SVG and `src/components/portal-motion.tsx` drives it, with tests in `portal-motion.test.tsx`. It already handles reduced motion including a live change (124, 216), an unloaded or failed image (124, 211), viewports under 480 px tall (131), phone URL-bar resizes (171-183), deep links into a pinned page (138-165) and keyboard focus (185-207). The prototype canvas (`G` 349-380) has none of these. It reads reduced motion once (`G` 273), re-allocates a full-screen double-density canvas on every resize (`G` 370, 379), and duplicates the monogram path (`shared.js` 6-7 equals `src/lib/monogram.ts` 3-6).

Recommendation: keep `PortalMotion` and its `data-portal-*` contract; change only what sits in the opening and what the scene shows. No canvas. Two gaps to specify if the image changes per question: swapping the image makes `photo.complete` false and the code then un-pins the stage (`portal-motion.tsx` 124-127); and the mark moves when the answer grows, but `PortalMotion` re-measures on size change only (219-220). The existing short-viewport fallback also answers part of the 375×667 concern.

**M5. The page moves the visitor away from the answer, and the message route is a hidden state machine for a trip the question never takes.**
Lens: `egm-comprehension`, `egm-zoom-out`, `egm-structural`, `egm-design`.

- About 1.35 seconds after sending, the page scrolls itself for 1.8 seconds through three screens of zoom, with the keyboard still open (`G` 17, 320-343).
- A multi-result answer shows only the first project (`G` 302, 310).
- Scrolling back to the top erases the answer (`G` 366-367).
- A visitor who never asked sees "your message: What's live?", a message they did not send (`G` 347, 202, 240-242).
- One question writes into ten `data-out` nodes across five sections (`G` 301-315). The rail needs two observers (`G` 382-391).
- The live page already prints the agent flow twice (`portfolio-home.tsx` 235-239, 256-260).

Recommendation: answer in place with a "see it" link the visitor taps; no programmatic scroll, no timer. Show the trace (intent, looked up, source, takeover) directly under the answer, as `agent-demo.tsx` 95-107 already does. Drop the rail and the "back on the phone" echo, or define the strip's un-asked state. Question state is one object owned by one component.

**M6. Face-down cards keep the fault concept F was rejected for, and the dialog is a second, weaker case page.**
Lens: `egm-zoom-out`, `egm-comprehension`, `egm-design`, `egm-structural`, `egm-implementation-readiness`, `egm-codebase-details`.

- The record says F "hides the work behind a tap" and "would need a plain list beside it" (`REVIEW-2026-11.md` 249-252). G still deals twelve cards face down with no list.
- A screen reader hears "Face-down card" twelve times (`G` 398, 405). A crawler gets no project names.
- Each card costs about 0.9 seconds to open (`G` 420, 463). Card fronts and the dialog show no status (`G` 407, 257-266).
- Once the dialog carries status, downloads, links and the demo to satisfy B1, it repeats `/work/[slug]`, which already exists per locale. Copy will drift between the two.
- The dialog has no address and no history entry (`G` 416-421, 457-470). On Android, Back most likely leaves the site. An open project cannot be shared. Not tried on a device.
- For projects with no live link, the button label is a raw address (`G` 442), and it uses `/en/work/x` where English lives at `/work/x` (`portfolio.ts` 98-105).
- Order and tilt come from `Math.random()` (`G` 401-402). Rendered on the server this is a React hydration mismatch, and it drops the curated order (`portfolio-home.tsx` 33-40).
- A one-to-one port makes the page a client component and ships the 842-line content file, in all three languages, to every visitor.
- Today a card click is a navigation plus `case_study_open`. In G it is a dialog with no pageview, so that event stops meaning one thing.

Recommendation: the server renders each card face up, in a fixed order, as a real link to its case page with name, category and status in text. Face-down, the turn and "Deal again" are client-only decoration. If the three-language sheet is kept, hold it to title, category, summary and the primary actions, open it in the page's locale, push a history entry so Back closes it, and pass only the needed fields from the server. State what the card is for that the case page is not.

**M7. The hand-copied data has already drifted, and "Now building" cannot carry card status as proposed.**
Lens: `egm-design`, `egm-structural`, `egm-implementation-readiness`, `egm-codebase-details`, `egm-zoom-out`.

- `shared.js` uses three statuses (line 12); production has four (`portfolio.ts` 5-9). Titles are shortened (`shared.js` 16 against `portfolio.ts` 331). Darbak's preview and two SOLitaire builds are missing (`shared.js` 18, 25).
- Four hand-picked subsets are hard-coded by slug (`G` 279, 293, 410-414; `portfolio-home.tsx` 33-40). "Twelve" is typed into copy (`G` 229) and the grid assumes twelve (`G` 90). Adding a thirteenth project means five edits and a sentence.
- `src/content/now.json` covers eight of twelve projects. It is English only, cut by a script run by hand from sibling task files (`scripts/build-now.mjs` 1-3, 33-46), and line 20 is truncated mid-phrase. The prototype splices it into answer sentences (`G` 290). Arabic and Hebrew cards would carry English fragments.
- `mix-copy.js` says "generated", but no generator exists in `scripts/`.

Recommendation: port nothing from `shared.js`. One server-side function builds the card list from `projects`, `focusQuest` and `now.json`. Counts are computed, order is a field in content, labels come from `statusLabels`. Card status is `project.status`, translated. The phase line is optional, marked as English with the `dir="ltr" lang="en"` wrapper used at `portfolio-home.tsx` 155, absent cleanly for four projects, and never joined into a translated sentence. Running `node scripts/build-now.mjs` goes on the launch checklist (`TASKS.md` 29).

**M8. The working agent demo moves to the deepest spot and stops being interactive.**
Lens: `egm-comprehension`, `egm-design`, `egm-structural`.

The demo is the strongest proof of the headline. It goes from its own section to inside one of twelve face-down cards in a random position, and in G it is one canned exchange (`G` 433-436). The site would also have two chat boxes with different catalogs. The owner himself tripped on that mix-up (`REVIEW-2026-11.md` 284-285).

Recommendation: say whether the demo stays interactive. Give it a direct route from the first screen, for example a chip that opens that card. Label each box with what it answers about.

**M9. Answers are written in internal vocabulary.**
Lens: `egm-comprehension`, `egm-structural`.

Visitors would read "Source: portfolio.ts · status live", "now.json · bab" and "public/downloads · 4 builds" (`G` 290-292). Renaming a file makes the page wrong. Other terms private to the design: "call a suit", "Deal again", "Cluster", "Human takeover", "Held for a person", "Private build".

Recommendation: a glossary in the plan mapping each term to visitor wording in three languages. No file names in visitor-facing text.

**M10. The two pass/fail tests are not usable gates and can conflict.**
Lens: `egm-design`, `egm-zoom-out`, `egm-comprehension`, `egm-structural`.

The swap test has no judge, no definition of a section and no exemptions. A contact form, a WhatsApp button and a footer fit any developer, so the test fails as worded or gets waived case by case. Applied literally, it pushes decoration into utility sections. Nothing says which test wins when uniqueness costs reach; face-down cards are that case. "Convince owners, hirers and clients alike" has no measure at all.

Recommendation: apply the swap test to the first screen and to headings only, with the owner as judge. Exempt the header, contact form and footer by name. State that "nothing lost" wins on conflict.

**M11. There is no cut-over, rollback or device plan.**
Lens: `egm-design`, `egm-implementation-readiness`, `egm-structural`, `egm-zoom-out`, `egm-codebase-details`.

- One merge replaces the homepage on a site that redeploys on every push to `main` (`TASKS.md` 140-143). Another agent also commits content to `main` (`TASKS.md` 3-11, 137-138), so a long branch that rewrites `portfolio.ts`, `ui.ts` and `now.json` will conflict.
- The prototype and the decision record are untracked in git, so the build's reference can be lost.
- Nothing has been tried on a real phone, Safari, Firefox or a screen reader.
- The SOLitaire embed only allows `fhaj.dev` and localhost to frame it (`portfolio.ts` 210-212), so it cannot be checked on a preview address.
- `scripts/verify-brand-deployment.mjs` 14-33, the only post-deploy check, asserts the logo, `lang` and `dir`. It will pass whatever the page contains.
- Three test files assert the old structure and will fail: `seeker-radar.test.tsx`, `solitaire-media.test.tsx`, `portal-motion.test.tsx`.
- The prototype CSS uses bare names and an element selector (`dialog`, `.s`, `.in`, `.bar`, `.table`; `G` 17-128). Its font is Schibsted Grotesk from a Google import (`design/concepts/2026-11/previews/shared.css` 2, 11); the shared layout loads Space Grotesk (`layout.tsx` 18-22). A global swap changes the "untouched" header and case pages.
- The homepage already carries about 4,870 lines of CSS across `src/app/globals.css`, `src/components/homepage.css` and `src/components/project-deck.css`. Rules for reused pieces are scoped under `.home-page` (`homepage.css` 1686, `project-deck.css` 172) and vanish if the wrapper class changes.
- There is no error boundary: no `error.tsx` or `global-error.tsx` under `src/app`. A script error in the new first screen on an untested browser would break it silently; the only sign would be falling clicks days later.

Recommendation: commit the prototype and review to the branch first. Build the new page as new files with its own stylesheet and switch one import (`src/app/[locale]/page.tsx` 2, 46), so rollback is one revert or promoting the previous deployment (last good commit `c002f24`). Leave `globals.css` alone. Scope the new font to the homepage or declare it sitewide. Wrap the interactive first screen in an error boundary that leaves the server-rendered sheet, WhatsApp and résumé links standing. Name the device gate: real iPhone Safari, real Android Chrome, Firefox, one screen reader, script off, reduced motion, run on the preview deployment. Extend the post-deploy script to assert, in raw server HTML for all three locales, a `wa.me` link, the résumé PDF, `#work`, `#contact` and the form. Delete `project-deck.tsx`, its CSS, `work-filters.tsx` and dead rules in a later, dated commit.

**M12. The page's main device has no telemetry, and there is no measured gate for phone weight.**
Lens: `egm-codebase-details`; quota caveat from `egm-design`.

- Neither the prototype nor today's demo tracks the question box (`agent-demo.tsx` has no `track`). Nobody could tell whether it is used, in which language, or how often it ends in a refusal.
- Speed Insights is installed (`layout.tsx` 74), but no current mobile LCP, INP or CLS is recorded as a bar to hold.
- The prototype loads full-size captures as plain `<img>` for about twenty cards (`G` 405-408).

The two reviewers disagree on how much to track. `egm-codebase-details` asks for an `ask` event with intent, language, handoff and input type, plus card and sheet events. `egm-design` warns that every `track()` call counts against the analytics plan and asks to track conversions only. Neither could see the Vercel plan.

Recommendation: check the plan first. At minimum add one `ask` event (intent and language, never the raw text), because the share of unanswered questions per language is the health number for the box. Record current mobile LCP, INP and CLS for `/`, `/ar` and `/he` and set "no worse than" as a launch gate. Use `next/image` with card-sized `sizes`.

### Nit

- **N1. The Cluster step is an unproven claim over decoration.** "Kubernetes, Terraform and ArgoCD are the other half of the CV" sits over animated squares (`G` 217-225) with no case study behind it (`REVIEW-2026-11.md` 279-280). In the compact strip, make that stop the résumé link. Lens: `egm-design`, `egm-zoom-out`.
- **N2. Instagram wording needs a ruling.** The rule says Instagram work is never shown; current copy names Instagram as a channel (`portfolio.ts` 120-125, 174-178; `portfolio-home.tsx` 232). Decide whether naming the channel is allowed when that copy is re-homed. Lens: `egm-design`, `egm-comprehension`, `egm-zoom-out`, `egm-codebase-details`.
- **N3. Metadata still sells the old positioning.** Title and description come from `profile.role` and `profile.description` (`src/lib/seo.ts` 19-20), not the new headline. The share image is unchanged. Lens: `egm-design`.
- **N4. The résumé is a DevOps CV** (`portfolio.ts` 148) and will sit beside a headline about answering customers. Label the button with the role. Lens: `egm-comprehension`, `egm-codebase-details`.
- **N5. The headline drafts disagree.** The Arabic addresses one person (زبائنك), the Hebrew several (שלכם) (`G` 183-184). The Arabic also uses a different word for "customers" than the services copy (`portfolio.ts` 175). For the owner's read. Lens: `egm-comprehension`.
- **N6. The form's failure message points to WhatsApp or email "below"** (`src/content/ui.ts` 105). It will be wrong if they move. Lens: `egm-comprehension`.
- **N7. The phone rail collides with the header.** The rail is fixed to the top (`G` 146) where the sticky header sits (`globals.css` 78-81). Stage heights subtract the preview's own bar (`G` 18; `shared.css` 7), not the header. Lens: `egm-comprehension`, `egm-codebase-details`, `egm-structural`, `egm-implementation-readiness`.
- **N8. Card weight.** Twenty card buttons for twelve projects; the eight on the table sit ahead of the form in tab order (`G` 409-415). Make the table cards non-focusable decoration. Lens: `egm-zoom-out`.
- **N9. Event names are inconsistent today.** `live_product_open` on the homepage against `live_product_click` on case pages (`portfolio-home.tsx` 115; `project-page.tsx` 90); `focusquest_apk_download` against `apk_download`; `eventName` is an untyped string (`src/components/tracked-link.tsx` 7-10); form failures are not tracked (`contact-form.tsx` 22-25). Lens: `egm-codebase-details`, `egm-structural`.
- **N10. Dead code.** `src/components/home-project-summary.tsx` has no importer. Lens: `egm-zoom-out`.
- **N11. Two context facts did not match the repo.** Reviewers found 8 test files under `src`, not 15; the synthesizer confirmed 8. Homepage styles are in `homepage.css` (1,956 lines) and `project-deck.css` (610 lines) as well as `globals.css`. Lens: `egm-codebase-details`, `egm-structural`, `egm-implementation-readiness`.
- **N12. Next 16 docs.** Any dialog-as-route idea must be checked in `node_modules/next/dist/docs/`, as `AGENTS.md` requires. No reviewer read them. Lens: `egm-implementation-readiness`.

One reviewer claim was wrong and is not carried forward: `egm-implementation-readiness` said no existing test renders the homepage. Two do (`solitaire-media.test.tsx` 12, `seeker-radar.test.tsx` 14).

### Not verified by any reviewer

- Nothing was run: no build, no tests, no browser, no device. Every phone, keyboard, back-gesture, canvas and Safari point is read from code.
- Whether Vercel Analytics is receiving today's custom events, on what plan, with what retention and property limits.
- Any real traffic or click numbers.
- Whether preview deployments have `RESEND_API_KEY`, and whether preview protection is on.
- External inbound links to `#saqroon`, `#services`, `#agent` or `#process`.
- The quality of the Arabic and Hebrew drafts.
- The Next 16 docs.
- Files not read in full: `portal-scene.tsx`, `system-visual.tsx`, `homepage.css`, `globals.css`, most of `mix-copy.js` and `ui.ts`, and parts of `portfolio.ts`.

## Goals vs. Non-Goals

**Goals**

- Replace the homepage on a branch with a page built from preview G's first screen, question box, zoom and cards.
- Résumé and WhatsApp in the first screen, in all three locales.
- Every action the current homepage offers still works and is no harder to reach, proven by a written inventory and a test.
- Every piece of content, including every answer the box can give, is in the server HTML and readable without script.
- The page works on a phone with one thumb, with reduced motion and with a screen reader.
- The question box answers from tested rules in English, Arabic and Hebrew, and never states something that did not happen.
- Event names stay the same so before and after can be compared.

**Non-Goals**

- No AI model behind the question box.
- No changes to project pages or the three locale addresses. (The header cannot stay untouched unless the ids `services` and `process` survive; see B3.)
- No full case study for Saqroon in this work, unless the owner chooses that route in B7.
- No port of the prototype's canvas, `shared.js` data or `route()` function.
- No programmatic scrolling after an answer.
- No server send from the question box.
- No invented statistics, customers or proof; no Instagram work; no paid image or video generation without a written quote and the owner's yes.
- No new dependencies. The prototype uses only CSS and the Web Animations API.
- Free-text matching is not required for launch if the preset questions and the static answer list ship first.

## Alternatives Weighed

**Already rejected by the owner or the planner (not reopened)**

| Alternative | Why rejected |
| --- | --- |
| Concept A alone | A long walk through a pipeline |
| Concept B alone (whole page as a chat) | Hides the work behind taps |
| Concept F alone (card table) | Hides the work behind taps |
| Concept D's headline "Fath means opening" | Dropped by the owner; its zoom was kept |
| Concept E ("Receipts") | Not picked by the owner |
| Flat single-colour first screen; headline "The whole system. One engineer." | Rejected by the owner |
| An AI model behind the question box | Cost per visitor, and a model could invent a price |

**Raised by reviewers for the build**

| Choice | Option the prototype takes | Option the reviewers recommend | Reason |
| --- | --- | --- | --- |
| Zoom | New full-screen canvas | Reuse `PortalMotion` and the SVG mask | Production code already handles six real-phone conditions and is tested (M4) |
| Cards | Face-down buttons opening a dialog | Face-up server-rendered links to case pages; turn and sheet as enhancement | Keeps case links, back button, sharing, screen readers and no-script (M6) |
| Question box | Free text first, English regex ladder | Localised preset questions over a static answer list first; free text later on the `agent-demo.ts` pattern | Free text is the costliest and most failure-prone piece (M1) |
| Services and process | Only inside answers | Visible server-rendered text that the box points to | No-script constraint and hirers scanning for tools (B4) |
| Header | "Untouched" | Either change two nav links or keep the two ids | Otherwise two dead links site-wide (B3) |
| Saqroon | Card linking to the homepage | Card carrying its own site link, APK and note; or a case page | Current link becomes circular (B7) |
| After an answer | Timed scroll through the zoom | Answer in place with a "see it" link | The visitor loses the answer and the first-screen buttons (M5) |
| Message route | Four sections, rail, closing echo | The trace directly under the answer | Removes cross-section state (M5) |
| Handoff | "I've passed it on" | WhatsApp link prefilled with the visitor's question | The claim is false; the fix turns every miss into a counted lead (B5) |
| Cut-over | Rewrite in place | New files, one import switched | Rollback is one line (M11) |

## Key Decisions & Staging for Next Steps

**Decisions the owner must make before a plan is drafted**

1. **Header (B3):** change the nav links, or keep `services` and `process` as real targets on the new page.
2. **Saqroon (B7):** a card that carries its own links, or a case page (which puts project pages in scope).
3. **Deliberate removals (B1):** for each of these, keep or drop in writing: the five work filters, the playable SOLitaire embed, the interactive agent demo, the evidence lists, the video loops.
4. **Click test (B2):** export a baseline now and name a window and threshold, or replace the test with the inventory test.
5. **Swap test (M10):** who judges, which sections are exempt, and that "nothing lost" wins on conflict.
6. **Locales (M2):** `h1`, leaf order, mirroring and the card's first language on `/ar` and `/he`. Read and approve the Arabic and Hebrew headlines.
7. **Cards (M6):** link to the case page with the sheet as an extra, or the sheet as the main route with a history entry.
8. **Question box at launch (M1):** preset questions only, or free text too.
9. **Agent demo (M8):** stays interactive or not, and where its direct route is.
10. **Instagram wording (N2)** and **font scope (M11).**
11. **Tracking (M12):** which new events are worth their quota, after checking the Vercel plan.

**Staging**

1. **Before any code.** Commit the prototype and the review to a branch. Check in the Vercel dashboard that today's events are arriving, and export the counts with dates. Record current mobile LCP, INP and CLS.
2. **Inventory.** Write the action table and the anchor table. Rewrite `solitaire-media.test.tsx` and `seeker-radar.test.tsx` into the "nothing lost" test and the hash-link test, green against the current page.
3. **Redraw.** Update the static preview to the real scope at 375×667 and 390×844 for three locales, with the header, both buttons, the box and the compact strip. Owner's read.
4. **Draft the plan** with `/egm:egm-draft`, carrying the decisions above, the per-locale table, the glossary and the reuse list (what is kept, changed and deleted, per component).
5. **Build in slices, each launchable alone:**
   1. the sheet first screen on the existing `PortalMotion`, with résumé, WhatsApp and the error boundary;
   2. cards replacing the deck, index and install strip, from one card list;
   3. the static answer list with localised preset questions and the WhatsApp handoff;
   4. free text, with fixtures per language.
6. **Gate.** Device pass on the preview deployment, script off, reduced motion, one screen reader. Extended post-deploy check.
7. **Cut over** by switching one import. Measure for the named window. Delete the old components and CSS in a later, dated commit.

## Decisions taken after the review (2026-11-10)

The owner asked for the planner's recommendation on the three devices the reviewers wanted tamed, and
agreed to it. For every other finding the planner follows the reviewers unless a line below says otherwise.

| Finding | Decision | Decided by |
| --- | --- | --- |
| M5, automatic scroll | The zoom through the ف plays when the visitor taps "See it" under the answer, or scrolls there. The page never scrolls on its own. | Owner |
| M5, four-step rail | One strip of four stops under the answer, shown only after a question. No rail, no closing echo. The Cluster stop is dropped (N1). | Owner |
| M6, face-down cards | Cards are dealt face down and land face up. "Deal again" and the suits stay. Each card opens the three-language sheet, which links to the full case page; the phone's Back button closes the sheet. | Owner |
| B5, "passed it on" | Replaced by an offer to send the visitor's own question on WhatsApp, prefilled. Nothing is sent by the page. | Planner |
| B3 and B4, header and hidden text | The header stays as it is. Services and process stay on the page as visible text with the ids `services` and `process`, laid out as a question-and-answer thread; the question box points to them. | Planner, for the owner to confirm in the redraw |
| B7, Saqroon | A card of the same shape as the others, carrying its own site link, download and note. No case page. | Planner, for the owner to confirm |
| M3, first screen on phones | The first screen is ordinary flow and may be taller than the viewport. Only the zoom is pinned, in its own section, with the mark large. Table cards are decoration and cannot be focused. | Planner |
| M8, agent demo | Stays interactive, inside the WhatsApp agent's sheet, with a chip in the first screen that opens it. | Planner, for the owner to confirm |
| M1, question box at launch | Localised preset questions are the main path. Free text is matched in three languages and falls back to the WhatsApp offer. | Planner |
| B6, the page was never drawn | The preview is redrawn at the real scope before `/egm:egm-draft`: [h-scope.html](design/concepts/2026-11/previews/h-scope.html), three locales, 360 to 1280 wide. | Planner |

Added the same day: the owner did not like the look of the project cards on the table or in the work section
(a desktop capture cropped into a portrait card, on a paper frame). Preview H now carries three looks to choose
from, switched with `?c=1|2|3`: phone-shaped cards showing each project's phone capture whole, landscape cards
showing the desktop capture whole, and typographic cards with the name set large. Every project has a phone
capture; all but Nedaa Lifestyle have a desktop one.
The owner liked 1 and 3 and asked for a mix. Look 4, "Mix", is now the default: the phone capture fills most
of a phone-shaped card, and the name sits above it in large type on paper, ink or lime, with the status over
the name. On phones the work section uses two columns so the names stay readable.
**Decided by the owner on 2026-11-11: Mix is the card look.** Looks 1 to 3 and their picker are removed from
the preview.

**Deliberate removals (B1), decided by the owner on 2026-11-11.** Checked against the code first: the case
pages already carry the live embeds (`src/components/project-page.tsx` 21-33) and the evidence lists (208-210).

| Today's homepage | Decision |
| --- | --- |
| Work filters (WhatsApp, Telegram, AI, Mobile, Web) | Dropped. The "Live product" and "Install a preview" calls replace them. |
| Evidence list per project | Dropped from the homepage; stays on every case page. |
| Video loops (Bab, ElsewhereCo; `src/content/project-showcase.ts` 23, 81) | Kept, inside those two projects' sheets in place of the still. They exist nowhere else. |
| The interactive SOLitaire website and the playable SOLitaire table | **Kept on the homepage, by the owner's choice** (the planner had proposed moving them to the case page). Both live in SOLitaire's sheet: the website hero (`/embed/hero`) in place of the still, and the playable table (`/embed/table`) as "Play a hand" below it. A first-screen chip, "Play SOLitaire", opens that sheet directly. The build reuses `src/components/live-embed.tsx`, which loads the frame only near the viewport and shows it only after the page reports ready. The embeds allow only fhaj.dev and localhost to frame them (`src/content/portfolio.ts` 210-212), so they cannot be checked on a Vercel preview address. |

**Launch check (B2), decided by the owner on 2026-11-11.** The "tracked clicks do not drop" test is replaced
by the "nothing lost" test. It is one vitest that renders the homepage in English, Arabic and Hebrew and asserts
that every link, download and section id on today's page (the action table in B1, the anchor table in B3) is
still there, minus the removals the owner signed above. A second check runs on the preview deployment: every
placement of WhatsApp, the résumé and the form fires its event. Event names stay as they are, with a new
`placement` value for each new position. There is no before-and-after click comparison, because portfolio
traffic is too small for one to mean anything. Exporting today's counts in Staging step 1 is still worth doing as
a record, but it no longer gates the launch.

**Swap test (M10), decided by the owner on 2026-11-11: applied wider than the reviewers proposed.** It covers
every sentence a visitor reads on the homepage, in all three languages: the first screen, the preset questions and
every answer, the strip under the answer, the card summaries, the sheet text, the services and process thread, and
the contact introduction. The owner judges, line by line, in each language. Exempt: navigation labels, button
verbs, form field labels and errors, project names, and the footer's legal and credit lines. These have to be the
plain words a visitor expects. "Nothing lost" wins on conflict: a line may be rewritten, but never at the cost of a
link, a download or a section id. Note: the card summaries are each project's `summary` in `src/content`, which the
case pages show too, so rewriting one changes both places. The plan must list which summaries change.

**Tracking (M12), decided by the owner on 2026-11-11: track more than the one event the planner proposed.**
Today's events stay as they are (`whatsapp_click`, `email_click`, `resume_download`, `social_click`,
`brief_submit`, `cta_click`, `case_study_open`, `live_product_open`, `apk_download`,
`focusquest_apk_download`, `navigation`, `language_switch`). WhatsApp, the résumé and the form gain a `placement`
value for each new position (`first-screen`, `answer`, `sheet`, `contact`, `footer`). New events on the homepage:

| Event | Fires when | Data |
| --- | --- | --- |
| `ask` | the question box answers | `intent` (a topic, a project slug or `unknown`), `source` (`chip` or `typed`), `locale` |
| `zoom_play` | the zoom through the ف plays | `slug`, `trigger` (`tap` or `scroll`) |
| `sheet_open` | a project sheet opens | `slug`, `from` (`card`, `table`, `chip` or `answer`) |
| `sheet_language` | the sheet turns to another language | `slug`, `to` |
| `deal` | a call is made or "Deal again" is pressed | `call` (`all`, `live` or `install`), `again` |
| `demo_send` | a visitor sends a message in the agent demo | `locale` |
| `play_view` | the playable SOLitaire table is ready on screen | `via` (`chip` or `sheet`) |

Rules: no event ever carries what a visitor typed, in the question box or the demo, because people type names
and phone numbers there. A visitor's own question goes to WhatsApp only when they tap the button, and that tap is
counted as `whatsapp_click` with `placement: answer`. Moves inside the SOLitaire frame cannot be counted: it is
another site, and the page sees only that the frame became ready.

To check before the build (Staging step 1): that Vercel's plan for fhaj.dev accepts custom events at all, how many
data fields it keeps per event (some plans keep only two, and several of today's events already send three), and
the monthly event allowance. If the plan keeps two fields, `locale` is dropped first, since the page language can be
read from the page address.

Still open for the owner: the owner's read of the Arabic and Hebrew copy. This gates the launch, not the plan.
