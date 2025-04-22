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

const noise = createSound({ src: '/noise.mp3' });

export function Timer({ seconds }: { seconds: number }) {
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: seconds,
  });
  const [hasOpened, setHasOpened] = useState(false);

  const toggleFocus = (pressed: boolean) => {
    if (pressed) {
      startTransition(() => {
        setHasOpened(true);
      });
      startCountdown();
      noise.play(1000);
    } else {
      stopCountdown();
      noise.pause(1000);
    }
  };

  return (
    <div className="relative size-75 flex flex-col items-center justify-center gap-5 rounded-full sm:size-90">
      <Counter count={count} />
      <CircleProgress
        className="absolute size-full color-marker"
        max={25 * 60}
        value={25 * 60 - count}
      />
      <Toggle onPressedChange={toggleFocus}>Focus</Toggle>
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
