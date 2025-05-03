import { noop } from '@fullstacksjs/toolbox';
import {
  createContext,
  startTransition,
  experimental_useEffectEvent as useEffectEvent,
  useMemo,
  useState,
} from 'react';

import { useCountdown } from '../hooks/useCountDown';
import { createSound } from '../libs/createSound';

interface Store {
  count: number;
  hasOpened: boolean;
  isPlaying: boolean;
  seconds: number;
}

interface Dispatch {
  toggleFocus: (pressed: boolean) => void;
  decrementSeconds: (change: number) => void;
  incrementSeconds: (change: number) => void;
  reset: () => void;
}

export const StoreContext = createContext<Store>({
  count: 0,
  hasOpened: false,
  isPlaying: false,
  seconds: 30 * 60,
});

export const DispatchContext = createContext<Dispatch>({
  toggleFocus: noop,
  decrementSeconds: noop,
  incrementSeconds: noop,
  reset: noop,
});

const click = createSound({ src: '/click.wav' });
const noise = createSound({ src: '/noise.mp3', loop: true });

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasOpened, setHasOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(30 * 60);

  const decrementSeconds = useEffectEvent((arg: number) => {
    if (isPlaying) return;
    setSeconds(s => Math.max(s - arg, 0));
  });

  const incrementSeconds = useEffectEvent((arg: number) => {
    if (isPlaying) return;
    setSeconds(s => s + arg);
  });

  const { count, start, pause, reset, isCompleted } = useCountdown(seconds, {
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
      click.play(0);
      setIsPlaying(false);
    },
  });

  const toggleFocus = useEffectEvent((pressed: boolean) => {
    if (isCompleted) reset();

    if (pressed) {
      startTransition(() => {
        setHasOpened(true);
        start();
      });
    } else {
      pause();
    }
  });

  const dispatch = useMemo(
    () => ({ toggleFocus, decrementSeconds, incrementSeconds, reset }),
    [toggleFocus, decrementSeconds, incrementSeconds, reset],
  );

  const store = useMemo(
    () => ({ hasOpened, isPlaying, count, seconds }),
    [hasOpened, isPlaying, count, seconds],
  );

  return (
    <StoreContext.Provider value={store}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};
