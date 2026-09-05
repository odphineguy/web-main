# Abe Media Motion Lab Handoff

Updated: 2026-09-04

## Current state

- The lab now lives on `main` (the `feature/homepage-light-overhaul` branch was merged; the
  Desktop worktree is stale for this work). Edit `/Volumes/Media 2TB/web-main` directly.
- English lab: `/en/motion-lab`. Spanish lab: `/es/motion-lab`.
- The routes are unlinked and use `noindex, nofollow` metadata.
- 2026-09-04 polish pass is committed on `main` (local commit, push when Abe says so). Abe
  reviewed the screenshots and called it good progress with touch-ups still to come.

## 2026-09-04 session

Bug fixed: the ribbon never rendered for a visitor who let the page load before scrolling.
After the textures loaded, the effect recomputed `visible` with a strict
`rect.top < innerHeight`; at load the section top sits exactly at `innerHeight`, so it
overwrote the IntersectionObserver's `true` with `false`, and the observer never fired
again because the intersection state never changed. `renderer.render` was never called
(confirmed by instrumenting the GL context: zero draw calls). The recompute now ORs with the
observer value and uses inclusive bounds. This bug was live on production.

Composition tuned against the Trionn.com "Design in Motion" reference (Abe's screenshots):

- Panels are true 16:10 on screen (`panelSpan` 0.86 rad, `panelHeight` 4.0) so the texture
  crop no longer squeezes screens horizontally. Gap tightened (`panelStep` 0.885).
- Camera moved from z 22.5 to z 16.5, at ring height (y 1.6, target y 0.2). The near pass
  now fills roughly 55 to 60 percent of the viewport height.
- The ring is pitched (`ringPitch` -0.22 rad, far side down) so the strip enters low and
  small and sweeps across the upper half at the near pass with the far loop visible below.
- The camera rides up with the helix (`cameraRide` 1.2) so the near pass holds a steady
  screen height on both laps; helix `rise` reduced 0.43 to 0.24; `ringOffsetY` -0.5.
- Roll is now consistently clockwise like the reference (-12deg to -6deg).
- Travel math is explicit: nothing is visible at progress 0 or 1 (`fadeDistance` 0.95).
- The ring's inner surface (geometric front face) is dimmed to 0.86 for depth.
- Panel order reversed in spirit: the LAST array entry enters first, so `fleet.webp` (a real
  dashboard) leads and the two AI illustrations sit mid-strip. Dark, light, and photo panels
  alternate. Abe may want a different order.
- Display words are ink mixed 24 percent toward paper (dark grey, like the reference) and
  keep a 14vw continuous drift on top of the slide in / rest / slide out.

Verification: ESLint and `tsc --noEmit` clean; production build clean; EN and ES rendered
at 1440x900 across 0 to 100 percent scroll and 390x844 mobile in headless Chromium
(SwiftShader WebGL renders fine there; a red-square canvas test confirmed screenshots capture
WebGL). The rig is a Playwright script that scrolls the section to fixed progress values and
screenshots each one.

## Open decisions for Abe

1. Panel order and whether the two AI-generated illustrations (`ai-agent.webp`,
   `bilingual-build.webp`) belong in the strip at all.
2. Word color (grey vs full ink) and the continuous drift.
3. DECIDED 2026-09-04: it stays in the lab. Abe: "good progress, almost got it down, a few
   more sessions and touch ups." No homepage integration for now. (If that changes: the fixed
   site navbar overlaps the top ~90px of any 100svh sticky stage.)

## Implementation

The first prototype used rigid HTML cards with independent transforms. It was replaced because the cards looked layered rather than connected.

The current prototype uses Three.js:

- Ten separate image textures are rendered on subdivided `PlaneGeometry` meshes.
- Each plane has 80 horizontal segments.
- Every vertex follows the same custom 3D helix, causing adjacent images to read as one curved film strip.
- A double-sided shader flips the back-face UV horizontally so the imagery remains readable as the strip rotates.
- Native scroll progress drives the ribbon and oversized typography through `requestAnimationFrame`.
- The sequence reverses deterministically when scrolling upward.
- Three.js is loaded through a dynamic `import()` inside the lab component.
- WebGL rendering pauses while the section is outside the viewport.

The Trionn reference was inspected in a real browser. Its connected appearance comes from the same general method: separate image planes with more than 100 horizontal subdivisions, all deformed along a shared 3D path. The Abe Media implementation uses an original curve and scroll mapping.

## Files

- `src/app/[locale]/motion-lab/page.tsx`
- `src/components/experiments/ScrollMotionLab.tsx`
- `src/components/experiments/ScrollMotionLab.module.css`
- `public/images/motion-lab/`
- `package.json`
- `package-lock.json`

New dependencies:

- `three`
- `@types/three`

## Performance and accessibility

- Lab-specific WebP textures total about 648 KB. The original source set was about 9 MB.
- Desktop pixel ratio is capped at 1.8.
- Mobile pixel ratio is capped at 1.35 and uses a wider camera.
- `prefers-reduced-motion: reduce` disables the WebGL sequence and shows a static ten-image gallery.
- The canvas is hidden from assistive technology, with localized English and Spanish labels provided in the DOM.

## Verification completed

- Strict ESLint on the new page and component passed.
- TypeScript passed with `npx tsc --noEmit`.
- `git diff --check` passed.
- Desktop entrance, midpoint, and exit were visually inspected at 1440 × 900.
- Mobile midpoint was visually inspected at 390 × 844.
- English and Spanish routes were verified.
- Reduced-motion behavior was emulated and verified.
- Browser console showed no errors. Existing Clutch widget timeout warnings are unrelated.

## Next-session polish targets

1. Apply Abe's review notes from the 2026-09-04 screenshots, then commit.
2. Recheck the mobile entrance and exit after any camera change (only the desktop camera
   ride was tuned by eye; mobile inherits `cameraRide`).
3. Decide where this sequence would replace or support existing homepage content.

Keep this as a lab until the user explicitly approves homepage integration.
