import { isNull } from '@fullstacksjs/toolbox';
import { Howl } from 'howler';

export function createSound({ src, loop }: { src: string; loop?: boolean }) {
  const howler = new Howl({ src, loop });
  let timeout: number;

  const play = (duration = 1000) => {
    if (!howler.playing()) howler.play();
    if (!isNull(timeout)) clearTimeout(timeout);

    howler.fade(0, 100, duration);
  };

  const pause = (duration = 1000) => {
    howler.fade(howler.volume() || 100, 0, duration);
    timeout = setTimeout(() => {
      if (timeout) howler.pause();
    }, duration);
  };

  return { pause, play };
}
