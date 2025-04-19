import { isNull } from '@fullstacksjs/toolbox';
import { Howl } from 'howler';

export function createSound({ src }: { src: string }) {
  const howler = new Howl({ src, loop: true });
  let timeout: number;

  const play = (duration: number) => {
    if (!howler.playing()) howler.play();
    if (!isNull(timeout)) clearTimeout(timeout);

    howler.fade(0, 100, duration);
  };

  const pause = (duration: number) => {
    howler.fade(howler.volume(), 0, duration);
    timeout = setTimeout(() => {
      if (timeout) howler.pause();
    }, duration);
  };

  return { pause, play };
}
