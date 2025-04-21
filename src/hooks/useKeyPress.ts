import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from 'react';

interface Options {
  event?: 'keydown' | 'keyup';
  eventOptions?: AddEventListenerOptions;
}

export function useKeyPress(
  key: string,
  cb: (event: KeyboardEvent) => void,
  { event = 'keyup', eventOptions = {} }: Options = {},
) {
  const onListen = useEffectEvent(cb);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) {
        onListen(e);
      }
    };

    window.addEventListener(event, handler, eventOptions);

    return () => {
      window.removeEventListener(event, handler, eventOptions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, event, eventOptions]);
}
