# Repro: SliderVideo preview error handling

Reproduction for `TimeSlider.Video` (`SliderVideo`) in `@vidstack/react@1.15.6`, started from the
[`player/react/default-theme`](https://github.com/vidstack/examples/tree/main/player/react/default-theme)
example.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][stackblitz]

[stackblitz]: https://stackblitz.com/github/TDaglis/examples/tree/slider-video-repro/player/react/slider-video-repro?file=src/player.tsx

The page renders two players with the default theme, each with a `TimeSlider.Video` preview. The
box under each player shows the preview `<video>` state, polled every 500ms, and the number of
`onError` calls.

## 1. Valid preview src

The preview loads (`readyState: 4`), but it has `data-error` and `data-hidden`, so the default theme
hides it (`display: none`). Hovering the time slider shows the time but no video.

Expected: `data-error: false`, `data-hidden: false`, `display: block`, and the preview is visible on
hover.

## 2. Missing preview src

The preview `src` doesn't exist. `onError` is called dozens of times for a single failure, and the
browser console shows `Uncaught RangeError: Maximum call stack size exceeded`.

Expected: `onError calls: 1` and no `RangeError`.

Related: vidstack/player#1090
