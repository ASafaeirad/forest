import { Hotkey } from './design/Hotkey/Hotkey';

interface Props {
  inert?: boolean;
  task?: string;
  onAddTask: () => void;
}

export function TaskBar({ inert, task, onAddTask }: Props) {
  return (
    <div className="h-12 flex items-center gap-4" inert={inert}>
      <Hotkey onPress={onAddTask}>A</Hotkey>
      <span className="font-semibold">{task ?? 'Add new task'}</span>
    </div>
  );
}
