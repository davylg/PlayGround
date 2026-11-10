# PlayGround

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://go.ondev.store/).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://go.ondev.store/davylg/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/davylg/PlayGround)

- 🎮 [Open the project](https://go.ondev.store/davylg/PlayGround).
- ✨ [Remix this project](https://go.ondev.store/davylg/PlayGround?remix=1).
- 💻 [Explore the source](https://github.com/davylg/PlayGround).
- 🛠️ [Check build runs](https://github.com/davylg/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/davylg/PlayGround/issues).
- 👤 [Explore the creator's projects](https://go.ondev.store/davylg).
- 🌍 [Create with OMGithub](https://go.ondev.store/).
<!-- omgithub:readme:end -->

## Chain Blade — Night Dojo

A 2D fruit-slicing game staged as a 3D night dojo. Built with plain ES modules and
a vendored Three.js build — there is no build step and no external art or audio.

**Play:** open the project and tap **PLAY** (or open `index.html?play=1`).

- **Swipe** across fruit to slice. On desktop you can also slice by moving the mouse.
- Keep cutting before the chain ring drains to grow the multiplier and transform
  the blade at chain **5 / 10 / 17**.
- Golden fruit adds **+2 chain** and either restores a heart or awards **+100**.
- Bombs cost a heart and break the chain. Missed fruit also costs a heart once the
  short opening grace period ends.
- Reach a **25 chain** to restore a heart. Three hearts, endless night.
- **P / Esc** pauses; **M** mutes. Progress and sound preference are saved locally.

The game is tuned for phones and tablets (portrait and landscape), with safe-area
aware HUD, touch-safe controls, synthesized WebAudio, and small JPEG visual checks
in `screenshots/`.

### Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | Screens, HUD, import map |
| `styles.css` | Full responsive UI and effects |
| `src/main.js` | Renderer, bloom, camera framing, loop |
| `src/game.js` | State, spawning, slicing, chaining, scoring |
| `src/fruits.js` | Procedural fruit textures, geometry, halves, bombs |
| `src/effects.js` | Juice, sparks, trails, splats, shockwaves, popups |
| `src/world.js` | Night-dojo environment, lights, ambient particles |
| `src/ui.js` | HUD, overlays, tiers |
| `src/audio.js` | Procedural WebAudio engine |
| `vendor/` | Vendored Three.js r170 and postprocessing addons |
