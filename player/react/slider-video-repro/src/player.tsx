import '@vidstack/react/player/styles/default/theme.css';

import { useEffect, useRef, useState } from 'react';

import { MediaPlayer, MediaProvider, TimeSlider } from '@vidstack/react';

const src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

export function Player() {
  return (
    <>
      <Example title="1. Valid preview src" previewSrc={src} />
      <Example title="2. Missing preview src" previewSrc="/missing.mp4" />
    </>
  );
}

function Example({ title, previewSrc }: { title: string; previewSrc: string }) {
  const video = useRef<HTMLVideoElement>(null),
    errorCalls = useRef(0),
    [status, setStatus] = useState('');

  // Polls the preview <video> so the result is visible without devtools.
  useEffect(() => {
    const id = setInterval(() => {
      const el = video.current;
      if (!el) return;
      setStatus(
        [
          `readyState: ${el.readyState}`,
          `data-error: ${el.hasAttribute('data-error')}`,
          `data-hidden: ${el.hasAttribute('data-hidden')}`,
          `display: ${getComputedStyle(el).display}`,
          `onError calls: ${errorCalls.current}`,
        ].join('\n'),
      );
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <section>
      <h2>{title}</h2>
      <MediaPlayer className="player" src={src} crossOrigin load="eager">
        <MediaProvider />
        <TimeSlider.Root className="vds-time-slider vds-slider">
          <TimeSlider.Track className="vds-slider-track" />
          <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
          <TimeSlider.Thumb className="vds-slider-thumb" />
          <TimeSlider.Preview className="vds-slider-preview">
            <TimeSlider.Video
              className="vds-slider-video"
              src={previewSrc}
              ref={video}
              onError={() => {
                errorCalls.current++;
                console.count('SliderVideo onError');
              }}
            />
            <TimeSlider.Value className="vds-slider-value" />
          </TimeSlider.Preview>
        </TimeSlider.Root>
      </MediaPlayer>
      <pre>{status}</pre>
    </section>
  );
}
