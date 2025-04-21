import { useRef, useState } from 'react';

import { Counter } from './Counter';
import Arrow from './design/Arrow/Arrow.svg?react';
import { CircleProgress } from './design/CircleProgress/CircleProgress';
import { Hotkey } from './design/Hotkey/Hotkey';
import { Toggle } from './design/Toggle/Toggle';
import { useCountdown } from './hooks/useCountDown';
import { useKeyPress } from './hooks/useKeyPress';
import { createSound } from './libs/createSound';

const noise = createSound({ src: '/noise.mp3' });

export function App() {
  const [task, setTask] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: 25 * 60,
  });

  const toggleFocus = (pressed: boolean) => {
    if (pressed) {
      startCountdown();
      noise.play(1000);
    } else {
      stopCountdown();
      noise.pause(1000);
    }
  };

  const openDialog = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
    inputRef.current?.select();
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  useKeyPress('a', () => {
    if (!isOpen) {
      openDialog();
    }
  });

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 overflow-clip h-screen bg-noise">
      <div className="relative size-75 flex flex-col items-center justify-center gap-5 rounded-full sm:size-90">
        <Counter count={count} />
        <CircleProgress
          className="absolute size-full color-marker"
          max={25 * 60}
          value={25 * 60 - count}
        />
        <Toggle onPressedChange={toggleFocus}>Focus</Toggle>
        <div className="absolute color-marker -bottom-12% -left-8%">
          <Arrow />
        </div>
      </div>

      <div className="text-md absolute top-1/2 flex flex-col translate-y-70 items-center justify-center gap-2 font-mono">
        <dialog
          className="min-w-90 rounded bg-bg pl-5 pr-2 outline-1 outline-dark outline"
          ref={dialogRef}
          onClose={closeDialog}
        >
          <form className="flex items-center gap-2" method="dialog">
            <input
              className="h-8 flex-1 border-none bg-transparent font-semibold font-mono outline-none"
              name="task"
              ref={inputRef}
              onBlur={e => {
                e.currentTarget.form?.submit();
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setTask(e.currentTarget.value.trim());
                  e.currentTarget.form?.submit();
                }
              }}
              placeholder="Add new task"
            />
            <Hotkey>
              <div className="i-ic-baseline-arrow-outward" />
            </Hotkey>
          </form>
        </dialog>
        <div className="h-12 flex items-center gap-4" inert={isOpen}>
          <Hotkey onPress={openDialog}>A</Hotkey>
          <span className="font-semibold">{task ?? 'Add new task'}</span>
        </div>
      </div>
    </div>
  );
}
