import { preload } from 'react-dom';

import { Counter } from './Counter';
import Arrow from './design/Arrow/Arrow.svg?react';
import { Toggle } from './design/Toggle/Toggle';
import { useCountdown } from './hooks/useCountDown';

export function App() {
  preload('/click.wav', { as: 'audio' });
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: 25 * 60,
  });

  const toggle = (pressed: boolean) => {
    const audio = new Audio('/click.wav');
    audio.play();

    if (pressed) {
      startCountdown();
    } else {
      stopCountdown();
    }
  };

  return (
    <div className="relative grid place-content-center overflow-clip bg-[url('/noise.png')] h-screen bg-noise">
      <div className="relative size-80 flex flex-col items-center justify-center gap-5 rounded-full timer-border">
        <Counter count={count} />
        <Toggle onPressedChange={toggle}>Focus</Toggle>
        <div className="absolute color-marker -bottom-12% -left-8%">
          <Arrow />
        </div>
      </div>
    </div>
  );
}
