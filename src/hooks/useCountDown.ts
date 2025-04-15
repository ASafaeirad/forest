import { useCallback, useState } from 'react';

import { useInterval } from './useInterval';
import { useToggle } from './useToggle';

interface CountdownOptions {
  countStart: number;

  intervalMs?: number;
  isIncrement?: boolean;

  countStop?: number;
}

interface CountdownControllers {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}

export function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}: CountdownOptions): [number, CountdownControllers] {
  const [count, setCount] = useState(countStart);

  const increment = useCallback(() => {
    setCount(x => x + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(x => x - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(countStart);
  }, [countStart]);

  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useToggle(false);

  const resetCountdown = useCallback(() => {
    stopCountdown();
    reset();
  }, [stopCountdown, reset]);

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [count, { startCountdown, stopCountdown, resetCountdown }];
}
