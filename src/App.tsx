import { Counter } from './Counter';
import Arrow from './design/Arrow/Arrow.svg?react';
import { CircleProgress } from './design/CircleProgress/CircleProgress';
import { Toggle } from './design/Toggle/Toggle';
import { useCountdown } from './hooks/useCountDown';
import { createSound } from './libs/createSound';

const noise = createSound({ src: '/noise.mp3' });

export function App() {
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: 25 * 60,
  });

  const toggle = (pressed: boolean) => {
    if (pressed) {
      startCountdown();
      noise.play(1000);
    } else {
      stopCountdown();
      noise.pause(1000);
    }
  };

  return (
    <div className="relative grid place-content-center overflow-clip bg-[url('/noise.png')] h-screen bg-noise">
      <div className="relative size-90 flex flex-col items-center justify-center gap-5 rounded-full">
        <Counter count={count} />
        <CircleProgress
          className="absolute size-full color-marker"
          max={25 * 60}
          value={25 * 60 - count}
        />
        <Toggle onPressedChange={toggle}>Focus</Toggle>
        <div className="absolute color-marker -bottom-12% -left-8%">
          <Arrow />
        </div>
      </div>
    </div>
  );
}
