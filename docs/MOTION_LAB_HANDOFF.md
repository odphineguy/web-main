# Abe Media Motion Lab Handoff

Updated: 2026-08-21

## Current state

- Branch: `feature/homepage-light-overhaul`
- Editable worktree: `/Users/abemacmini/Desktop/testing-abemedia/web-main-homepage`
- English lab: `/en/motion-lab`
- Spanish lab: `/es/motion-lab`
- The routes are unlinked and use `noindex, nofollow` metadata.
- The motion-lab work is currently uncommitted.
- Do not edit `/Volumes/Media 2TB/web-main`. It is a live reference only.

The user reviewed the WebGL version and likes the curved images, including the visible front and back surfaces. Their assessment was that it is a strong start. Continue polishing this experiment in the next session before deciding whether it belongs on the homepage.

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

1. Tune the curve, camera, and scroll pacing against the user’s preferred composition.
2. Review the image order so the most legible operational screens reach the foreground at the right moment.
3. Refine panel spacing and entrance opacity while preserving the connected-strip appearance.
4. Decide whether the front and back should remain equally bright or whether the reverse side needs a subtle treatment.
5. Recheck mobile composition at the entrance and exit, not only the midpoint.
6. Decide where this sequence would replace or support existing homepage content.
7. Run a production build before committing.

Keep this as a lab until the user explicitly approves homepage integration.
