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
  setSeconds: (seconds: number) => void;
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
  setSeconds: noop,
  reset: noop,
});

const click = createSound({ src: '/click.wav' });
const noise = createSound({ src: '/noise.mp3', loop: true });

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasOpened, setHasOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(30 * 60);

  const { count, start, pause, reset } = useCountdown(seconds, {
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
    if (pressed) {
      startTransition(() => {
        setHasOpened(true);
      });
      start();
    } else {
      pause();
    }
  });

  const dispatch = useMemo(
    () => ({ toggleFocus, setSeconds, reset }),
    [toggleFocus, setSeconds, reset],
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
