# Abe Media Motion Lab Handoff

Updated: 2026-09-05

## September 5 path correction

The experiment remains in this worktree at `/en/motion-lab` and `/es/motion-lab`.
No changes were made to the live checkout. Ten existing Abe Media images are retained.

The supplied seven reference frames show a lower-left entrance, movement rightward on
an ascending rear arc, a large foreground sweep from right to left, then an upward exit.
The visible foreground/background occlusion is intentional. Repeated low-pitch looping is not.

### Verified reference measurements

Inspected https://trionn.com/ and its publicly delivered dynamic chunk
https://trionn.com/_next/static/chunks/0.924d2y-5~87.js on September 5, 2026.
The chunk name can change on deployment. Search loaded Sources for `images/orbit/orbit-09.jpg`
or `PlaneGeometry` to relocate it. These are observed geometry parameters, not a copied component.

| Setting | Previous lab | Reference / revised lab |
| --- | --- | --- |
| Horizontal/depth radius | 8.25 / 7.15 | 12 / 12 |
| Rise per radian | 0.43 | 28 / (4 pi), about 2.23 |
| Rise per revolution | 2.70 | 14 |
| Panel height | 4.25 | about 4.06 |
| Panel width / spacing along base helix | variable | 5.8 / 6.2 |
| Horizontal mesh subdivisions | 80 | 116 |
| Desktop camera field of view / distance | 43 degrees / 22.5 | 52 degrees / 22 |
| Global ribbon rotation | -8 to +7 degrees | fixed |

The center path has a gentle downward dip around theta = 2 pi. Each subdivided
image follows that same path; the surface's vertical direction is derived from
the path tangent with a vertical bias. Travel is finite, without modulo wrapping.
The larger pitch keeps successive revolutions vertically separated.

The reference uses nine images, scroll smoothing, and a later
six-card grid transition. This lab preserves its ten images, native reversible
scrolling, existing typography/guide lines, and upward exit. Its path proportions
now match the reference, but it is not a frame-for-frame copy of the entire section.

### Repeatable capture workflow

1. Keep browser zoom at 100% and use the same viewport dimensions for both pages.
   Undock DevTools so opening it does not change the camera's aspect ratio.
2. On Mac open DevTools with Command-Option-I. In Performance, enable Screenshots,
   record a slow downward scroll through the whole section, pause at the end,
   then reverse. Stop recording and scrub the filmstrip. A normal screen recording
   alongside this provides a denser visual record of the actual motion.
3. Use Sources global search (Command-Option-F) for the orbit asset name above.
   Format the chunk with the `{}` control. Read the camera, path, spacing, and
   scroll mapping together. Elements only exposes a canvas here, not individual
   image transforms. The CSS Animations panel cannot reconstruct these WebGL vertices.
4. For exact numerical inspection, set a breakpoint inside the mesh-update function.
   Its local scope exposes the current mesh, position buffer, path parameter, and
   camera. Record those at known scroll positions. Global `THREE` or `ScrollTrigger`
   variables are not guaranteed because the site uses bundled modules.
5. Compare checkpoints using scroll position, not elapsed recording time. Wait for
   the reference's scroll smoothing to settle before taking each still image.

For the lab, the canvas exposes `data-motion-progress` (0 to 1) and
`data-visible-panels` in Elements. The following Console expression reads both:

```js
document.querySelector('canvas[data-motion-progress]')?.dataset
```

Chrome documentation:
- https://developer.chrome.com/docs/devtools/performance
- https://developer.chrome.com/docs/devtools/javascript/reference

### Validation for this revision

- Production build passed, including type validation. Two existing unused-import
  warnings remain in unrelated portfolio/chatbot pages.
- Targeted component ESLint passed; diff whitespace check passed.
- Production preview: desktop entrance, foreground sweep, upward exit, and reverse
  scrolling visually checked; 390 x 844 mobile foreground sweep checked.
- The development preview showed a blank canvas during this run. Visual verification
  used the successful production build served on port 3124; dev-mode behavior remains
  a separate follow-up. Do not treat the production verification as a dev-mode fix.
- Existing reduced-motion static gallery is preserved.

## Hover expansion follow-up

- Fine-pointer hover now enlarges the nearest visible picture to 112%, matching the
  reference's observed hover scale. Expansion is centered along the curve and increases
  height proportionally; the ribbon path and scroll mapping stay unchanged.
- Raycasting uses refreshed bounds of the deformed geometry, respects depth, and
  rechecks after scrolling. Pointer leave and window blur release the active picture.
- Frame-rate-independent easing animates expansion and contraction; rendering stops
  once settled. Touch input does not enable hover. Reduced-motion mode retains its gallery.
- Production build, targeted ESLint, TypeScript, and whitespace checks passed.
- Browser verified: hovered panel 6 expanded to 1.1200; moving to panel 5 transferred
  expansion; moving into empty space reset hover to -1 and scale to 1.0000. Curvature
  was visually checked and the browser reported no errors.

## Continuous typography follow-up

- Both text lines now map linearly to the entire scroll sequence. SYSTEMS travels
  from fully outside the left edge to outside the right; IN MOTION travels oppositely.
  Actual rendered word widths determine endpoints for English and Spanish.
- Removed the entrance/hold/exit text mapping and text opacity animation. Support
  copy retains its existing fade, and the ribbon/hover geometry is unchanged.
- Typography uses the existing Familjen Grotesk face at weight 400, 8.5vw desktop
  and 13vw mobile, with softer gray ink. This replaces the heavier 15vw display text.

## Blank canvas recovery follow-up

A second open preview tab had an initialized canvas but no rendered-frame diagnostics;
reloading restored all ten images. The original stalled state did not identify an
exact cause, so do not claim a confirmed GPU or asset-cache failure.

Added redraw on window focus, page restoration, and document visibility; WebGL
context loss now pauses rendering and context restoration requests a fresh frame.
Removed a duplicate renderer disposal in the cancelled texture-load continuation.
The canvas now exposes `data-render-state` for diagnosing future incidents.

## Previous handoff (August 21, historical)

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
