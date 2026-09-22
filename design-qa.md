# Homepage project showcase — design QA

final result: passed

## Reference and scope

- Selected visual: `C:/Users/Fatoh/.codex/generated_images/01a071fc-175a-7e30-b41d-4ad81b9e50fb/exec-fc67f846-8d39-45cf-acbc-555b39e2968f.png` (1464 × 1074).
- Accepted direction: a desktop/mobile product composition, followed by enlarged interface details with descriptions, using the existing brand.
- Implementation: `http://127.0.0.1:3109/#work`, selected Seeker Radar panel. The selector remains one project at a time.
- Real project captures are authoritative for the interface content. The generated mock's reconstructed UI, stone prop, and studio floor are not shipped. Existing project copy, navigation, downloads, and exact monogram are retained.

## Evidence and normalization

- Full composition: `tmp/homepage/showcase-qa/en-desktop.png`.
- Focused close-ups: `tmp/homepage/showcase-qa/en-details.png` (browser clip in document coordinates).
- RTL desktop: `tmp/homepage/showcase-qa/ar-desktop.png` and `he-desktop.png`.
- Phone: `tmp/homepage/showcase-qa/en-phone-panel.png`, `ar-phone-panel.png`, `he-phone-panel.png`, and `he-phone-details.png`.
- Without JavaScript: `tmp/homepage/showcase-qa/no-js-keyboard.png`.
- Desktop CSS viewport: 1464 × 1074, devicePixelRatio approximately 1. Browser screenshot bitmap: 1449 × 1050. Phone CSS viewport: 375 × 812; bitmap: 360 × 779. Additional layout checks used 360 × 780 and 960 × 800. The browser capture includes slightly different bounds from the reported CSS viewport; compare the shared content region and proportions, not a raw pixel diff. No @2x image normalization was needed.
- The source mock and implementation were opened together for full-composition comparison. A separate focused capture and original source captures were inspected for crop boundaries and readable labels. Settled screenshots were recaptured after the entrance animation; intermediate dim captures are not final evidence.

## Findings and comparison history

1. **P2, fixed — incorrect mobile detail crop.** In the first implementation, a maximum height changed the crop's aspect ratio and exposed the wrong area of the TokenRun screenshot. The crop now fits the available width and height while preserving its source ratio, using container dimensions. The corrected image shows the icon, title, score, and store rating. Evidence: `en-desktop-v1.png` versus `en-desktop-v2.png` and the final `en-desktop.png`.
2. **P2, fixed — excessive portrait spacing.** The first desktop stage was unnecessarily tall. Its ratio changed from 1.55 to 1.8, bringing the two details closer to the product. The final screenshot retains space between the product and detail row.
3. No remaining actionable P0/P1/P2 findings in the selected scope.

## Required fidelity surfaces

- **Typography:** existing Space Grotesk and Arabic/Hebrew families retained. Project names establish the hierarchy; summaries and detail descriptions remain separate and readable. Long titles wrap without horizontal overflow.
- **Layout:** a compact project selector precedes one active composition. Desktop and phone captures overlap without covering project copy or actions. Two details sit side by side on desktop and flow vertically on phones. RTL copy and reading order adapt while the source screenshots and monogram remain upright.
- **Colors:** near-black, acid, off-white, and muted text match the homepage tokens. The screenshots retain their original project colors. Selected and keyboard-focused controls have clear acid accents.
- **Images:** complete desktop and mobile images preserve their ratios. The detail windows crop the actual source images with no generated interface text. SOLitaire uses its current desktop lobby and mobile gameplay; Go To Nature uses its existing desktop image with two details. Projects without screenshots use their factual architecture descriptions. All visible Seeker Radar images loaded successfully.
- **Copy:** descriptions explain the shown detail and exist in English, Arabic, and Hebrew. Existing status, summary, evidence, case-study actions, download labels, and download notes remain sourced from portfolio content.

## Verification

- Lint passed; 78 tests passed across 14 files; production build generated all 40 pages.
- All five selectors tested at phone width in all three languages: exactly one visible project, correct selection, no horizontal overflow.
- Desktop checked in English, Arabic, and Hebrew; SOLitaire's actions also checked at 960 px.
- Keyboard arrow navigation changes selection and exposes the focus indicator.
- Native project selection and keyboard navigation verified through a temporary local proxy with `script-src 'none'`. The opening correctly stays unpinned without JavaScript.
- Hebrew case-study link opened `/he/work/seeker-radar`; its EN language link opened `/work/seeker-radar`.
- SOLitaire production and staging download destinations remain present, along with their existing tracking and notes. No binaries changed.
- Reduced-motion CSS in the built page disables the deck animation and transitions. The browser capability did not expose preference emulation; this was a stylesheet verification, not an emulated reduced-motion session.
- No browser console errors in the normal production preview. The script-blocking proxy intentionally produces CSP blocks.

## Follow-up polish

- P3: higher-resolution source mobile captures would improve fine screenshot text at large desktop magnification. Current sources remain factual and their titles/icons are readable; explanatory captions supply the context on small screens.

## Implementation checklist

- [x] Real desktop/mobile compositions and descriptive close-ups.
- [x] Localized copy, RTL layout, compact phone layout.
- [x] Existing case-study routes, download actions, and analytics preserved.
- [x] Browser interaction checks and visual comparison completed.
- [x] Local production preview left available for review.

## Nuqta and SOLitaire imagery refresh — 2026-09-22

- Nuqta now pairs its Arabic landing page with the Android learning journey, followed by two real interface crops and localized explanations. Its landing-page logo and headline remain visible beside the phone. The existing APK link and download event remain intact; an English/Arabic landing-page link is now available.
- Nuqta sources: a fresh browser capture of `https://www.nuqtakids.com`; journey and quest screens rendered on 2026-09-22 by the current FocusQuest repository's `app/test/store_shots_test.dart`, with demo state and real app widgets. Output was directed into this portfolio's temporary folder. No app source was changed. These are interface captures, not device photographs.
- SOLitaire sources: a fresh desktop lobby capture from the current local app (2026-09-22), plus `assets/store/court/listing/raw/home.png` and `board-mid-a.png` from its 2026-09-18 Court Table set. The homepage and case study share the refreshed media. Detail windows now show the Play tile and court characters during a game.
- Image dimensions: Nuqta desktop 1430×755, app 1170×2532; SOLitaire desktop 1600×1000, app 1179×2622. New filenames prevent reuse of old cached assets. Existing screenshots remain available at their previous URLs.
- Verified both sections at 1440px and 375px in English, Arabic, and Hebrew: all visible images loaded; no horizontal overflow; localized captions and upright image orientation. Settled screenshots are in `tmp/imagery-qa/`.
- Lint passed, all 78 existing tests passed, and the final production build generated all 40 pages. Browser error log was empty. Existing SOLitaire case-study and APK destinations remain intact; Nuqta's APK binary was not changed.
- Visual adjustment: reduced Nuqta's desktop frame to 77% of the stage so the phone does not obscure its brand or heading. Phone details stack vertically. No remaining actionable P0/P1/P2 findings in this refresh.
- Local production preview: `http://127.0.0.1:3111/#nuqta`. This imagery refresh has not been pushed or deployed.
