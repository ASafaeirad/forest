import { useRef, useState } from 'react';

import { useKeyPress } from './hooks/useKeyPress';
import { TaskBar } from './TaskBar';
import { TaskDialog } from './TaskDialog';
import { Timer } from './Timer';

export function App() {
  const [task, setTask] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
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
      <Timer seconds={25 * 60} />
      <div className="text-md absolute top-1/2 flex flex-col translate-y-70 items-center justify-center gap-2 font-mono">
        <TaskDialog ref={dialogRef} onClose={closeDialog} onSubmit={setTask} />
        <TaskBar inert={isOpen} task={task} onAddTask={openDialog} />
      </div>
    </div>
  );
}
