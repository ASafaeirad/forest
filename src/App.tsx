import {
  experimental_useEffectEvent as useEffectEvent,
  useRef,
  useState,
} from 'react';

import { TaskBar } from './components/TaskBar';
import { TaskDialog } from './components/TaskDialog';
import { Timer } from './components/Timer';
import { useKeyPress } from './hooks/useKeyPress';
import { createSound } from './libs/createSound';

const click = createSound({ src: '/click.wav' });
const seconds = 25;

export function App() {
  const [task, setTask] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = useEffectEvent(() => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  });

  const closeDialog = useEffectEvent(() => {
    setIsOpen(false);
  });

  useKeyPress('a', () => {
    if (!isOpen) {
      openDialog();
    }
  });

  const playClick = useEffectEvent(() => {
    click.play(0);
  });

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 overflow-clip h-screen bg-noise">
      <Timer onComplete={playClick} seconds={seconds} />
      <div className="text-md absolute top-1/2 flex flex-col translate-y-70 items-center justify-center gap-2 font-mono">
        <TaskDialog ref={dialogRef} onClose={closeDialog} onSubmit={setTask} />
        <TaskBar inert={isOpen} task={task} onAddTask={openDialog} />
      </div>
    </div>
  );
}
