# Inside the Mark verification

## Project deck revision — 2026-09-14

Verified the revised collection against the local production build at
http://127.0.0.1:3108/. Five featured projects share a selectable print deck;
the opening Go To Nature reveal, additional work index and contact flow remain.

- Lint and production build passed. All 39 unit tests passed, including new
  regression coverage for canonical localized section links and deep links
  after delayed hero image loading.
- English, Arabic and Hebrew passed at 1440 × 900 and 360 × 640. All five
  selections show exactly one matching preview and its localized case-study
  link. No horizontal overflow or runtime errors were found.
- Desktop deck height remains stable when changing projects. Phone previews
  fit their content. Native radio controls support arrow keys and Tab reaches
  the visible case-study link. Axe found zero WCAG 2 A/AA or 2.1 AA violations
  in the collection in all six configurations.
- All five selections work without JavaScript and with reduced motion in all
  three languages. The hero retains its unpinned fallback in both modes.
- Direct Work links, repeated Work navigation, case-study navigation and return
  to the homepage passed. Localized homepage anchors now avoid an unnecessary
  trailing-slash redirect. Immediate homepage anchor jumps avoid racing the
  progressively enhanced hero height.
- Production screenshots and the check report are in
  `tmp/homepage/deck-verification/`. This revision was previewed locally;
  the deployment and the separately modified FocusQuest APK were not changed.

## Original homepage release — 2026-09-05

Verified on 2026-09-05 against the production build served at
http://127.0.0.1:3107/. The existing Vercel deployment was not changed.

## Automated checks

- `npm run lint`: passed.
- `npm test`: 37 tests passed, including canonical vector fidelity, delayed or
  failed image loading, reduced-motion changes, Strict Mode teardown, pending
  animation cancellation, localized project order and screenshot preservation.
- `npm run build`: passed compilation, TypeScript and all 40 static pages.
- Headless Chrome: English, Arabic and Hebrew at 1440 × 900 and 360 × 640.
  All six configurations passed: no horizontal content overflow, clipped opening
  titles, clipped resolved project links, or browser runtime errors.
- Axe WCAG 2 A/AA and 2.1 AA checks found no violations in those six
  configurations. This is automated evidence, not accessibility certification.
- Each configuration has five captured portal states (0%, 25%, 50%, 75%, 100%)
  and captures of work, services, process and contact. The remaining desktop
  project presentations were also inspected individually.

## Behaviors checked

- The hero's complete compound path and detached dot retain the canonical SVG
  geometry. The mark stays upright in both reading directions.
- Independent logo and screenshot movement, readable resolved project content,
  and a stable signed ending. Final-frame composition was reviewed visually.
- All three languages retain a complete, naturally flowing page under reduced
  motion and with JavaScript disabled. Non-scripted forms retain POST semantics.
- Image failure and short landscape viewports use the static fallback.
- Keyboard Tab reveals the first project link; Shift+Tab restores the opening
  controls. Repeated Work navigation lands at the same document position.
- Services, Process and Contact links, case-study navigation, client-side return
  to the homepage, and language switching work.
- The mobile menu closes after choosing a destination and on Escape.
- The PDF and APK URLs return their expected file signatures; the APK link
  retains its download attribute.
- Empty form submissions return localized invalid states and mark the expected
  fields in all six desktop/mobile configurations. Valid delivery behavior is
  covered by the existing mocked Server Action tests.

## Findings corrected during review

1. The original mobile reveal left a large landscape image inside a tall empty
   frame. The resolved composition now contains the complete screenshot, title,
   status, summary and project link together. Detailed evidence remains on the
   case study; the compact animated phone frame omits the evidence chips.
2. Repeating a framework-driven Work hash navigation shifted the scroll position.
   Home section navigation now uses native tracked anchors, and the Work target
   lives outside the sticky stage. Case-study routing remains client-side.
3. A synchronous measurement could clear the reference to a pending animation
   frame. Only the scheduled callback now clears that reference, allowing
   teardown to cancel it reliably.

The final production run supersedes the earlier failed interaction and cleanup
checks. Intended feelings were recognition, discovery, confidence, clarity and
connection. The visual review found the reveal and ending clear; the initial
mobile frame weakened the discovery-to-evidence handoff until recomposed.

## Evidence and limits

Local generated evidence is in `tmp/homepage/verification/`, including
`report.json`, the frame images and `contact-sheet.png`. Temporary Playwright
and Axe dependencies and verification scripts are under `tmp/homepage/`; no
browser dependencies were added to the application or lockfile.

Real iOS/Android hardware and Safari were not tested. No live email was sent.
The local environment does not have `RESEND_API_KEY`; actual email delivery
still requires the existing Resend configuration. The email and WhatsApp
contact links remain available. No deployment or hosting migration was performed.
