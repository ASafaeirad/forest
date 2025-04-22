import { Hotkey } from './design/Hotkey/Hotkey';

interface Props {
  ref: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
  onSubmit?: (task: string) => void;
}

export function TaskDialog({ ref, onClose, onSubmit }: Props) {
  return (
    <dialog
      className="min-w-90 rounded bg-bg pl-5 pr-2 outline-1 outline-dark outline"
      ref={ref}
      onClose={onClose}
      onSubmit={e => {
        // @ts-expect-error - form event is not typed
        const value = e.target.task.value.trim();
        if (value) onSubmit?.(value);
      }}
    >
      <form className="flex items-center gap-2" method="dialog">
        <input
          className="h-8 flex-1 border-none bg-transparent font-semibold font-mono outline-none"
          name="task"
          onFocus={e => {
            e.target.select();
          }}
          placeholder="Add new task"
        />
        <button
          className="rounded-full border-none bg-transparent p-0 outline-none focus:bg-shade"
          type="submit"
        >
          <Hotkey>
            <div className="i-ic-baseline-arrow-outward" />
          </Hotkey>
        </button>
      </form>
    </dialog>
  );
}
