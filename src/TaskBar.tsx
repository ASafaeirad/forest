import { Hotkey } from './design/Hotkey/Hotkey';

export function TaskBar({
  inert,
  task,
  onAddTask,
}: {
  inert?: boolean;
  task?: string;
  onAddTask: () => void;
}) {
  return (
    <div className="h-12 flex items-center gap-4" inert={inert}>
      <Hotkey onPress={onAddTask}>A</Hotkey>
      <span className="font-semibold">{task ?? 'Add new task'}</span>
    </div>
  );
}
