import { isNull } from '@fullstacksjs/toolbox';
import {
  experimental_useEffectEvent as useEffectEvent,
  useRef,
  useState,
} from 'react';

interface CountdownOptions {
  interval?: number;
  onComplete?: VoidFunction;
  onTick?: VoidFunction;
  onPause?: VoidFunction;
  onResume?: VoidFunction;
}

export function useCountdown(
  endTime: number,
  { interval = 1000, onComplete, onTick, onPause, onResume }: CountdownOptions,
) {
  const [count, setCount] = useState<number>(endTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<number>(null);

  const clearInterval = () => {
    if (intervalIdRef.current) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  const stop = useEffectEvent(() => {
    setIsRunning(false);
    clearInterval();
  });

  const handleTick = useEffectEvent(() => {
    if (isNull(count)) return;
    const isFinished = count === 0;

    if (isFinished) {
      stop();
      onComplete?.();
    } else {
      setCount(c => c - 1);
      onTick?.();
    }
  });

  const start = useEffectEvent(() => {
    if (isRunning && count === 0) return;

    setIsRunning(true);
    intervalIdRef.current = window.setInterval(handleTick, interval);
    onResume?.();
  });

  const pause = useEffectEvent(() => {
    stop();
    onPause?.();
  });

  const reset = useEffectEvent(() => {
    setCount(endTime);
    pause();
  });

  return {
    count,
    isRunning,
    start,
    pause,
    reset,
    isCompleted: count === 0,
  };
}
