import { use, unstable_ViewTransition as ViewTransition } from 'react';

import { Counter } from './Counter';
import Arrow from './design/Arrow/Arrow.svg?react';
import { CircleProgress } from './design/CircleProgress/CircleProgress';
import { Toggle } from './design/Toggle/Toggle';
import { DispatchContext, StoreContext } from './StoreProvider';

export function Timer() {
  const { count, isPlaying, hasOpened, seconds } = use(StoreContext);
  const { toggleFocus } = use(DispatchContext);

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
