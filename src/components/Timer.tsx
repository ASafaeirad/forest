import {
  startTransition,
  useState,
  unstable_ViewTransition as ViewTransition,
} from 'react';

import { useCountdown } from '../hooks/useCountDown';
import { createSound } from '../libs/createSound';
import { Counter } from './Counter';
import Arrow from './design/Arrow/Arrow.svg?react';
import { CircleProgress } from './design/CircleProgress/CircleProgress';
import { Toggle } from './design/Toggle/Toggle';

const noise = createSound({ src: '/noise.mp3', loop: true });

interface Props {
  seconds: number;
  onComplete?: () => void;
}

export function Timer({ seconds, onComplete }: Props) {
  const [hasOpened, setHasOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { count, start, pause } = useCountdown(seconds, {
    onPause: () => {
      noise.pause(0);
      setIsPlaying(false);
    },
    onResume: () => {
      noise.play();
      setIsPlaying(true);
    },
    onComplete: () => {
      noise.pause(0);
      onComplete?.();
      setIsPlaying(false);
    },
  });

  const toggleFocus = (pressed: boolean) => {
    if (pressed) {
      startTransition(() => {
        setHasOpened(true);
      });
      start();
    } else {
      pause();
    }
  };

  return (
    <div className="relative size-75 flex flex-col items-center justify-center gap-5 rounded-full sm:size-90">
      <Counter count={count} />
      <CircleProgress
        className="absolute size-full color-marker"
        max={seconds}
        value={seconds - count}
      />
      <Toggle pressed={isPlaying} onPressedChange={toggleFocus}>
        Focus
      </Toggle>
      {!hasOpened && (
        <ViewTransition>
          <div className="absolute color-marker -bottom-12% -left-8%">
            <Arrow />
          </div>
        </ViewTransition>
      )}
    </div>
  );
}
