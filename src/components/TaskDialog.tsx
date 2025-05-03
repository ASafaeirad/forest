import { Hotkey } from './design/Hotkey/Hotkey';

interface Props {
  ref: React.RefObject<HTMLDialogElement | null>;
  onClose?: () => void;
  onSubmit?: (task: string) => void;
}

export function TaskDialog({ ref, onClose, onSubmit }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      document.startViewTransition(() => {
        ref.current?.close();
        onClose?.();
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLDialogElement>) => {
    e.preventDefault();
    // @ts-expect-error - form event is not typed
    const value = e.target.task.value.trim();

    document.startViewTransition(() => {
      ref.current?.close();
      if (value) onSubmit?.(value);
    });
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      className="min-w-90 origin-center rounded bg-bg pl-5 pr-2 outline-1 outline-dark outline vt-dialog"
      ref={ref}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
    >
      <form className="flex items-center gap-2" method="dialog">
        <input
          className="h-8 flex-1 border-none bg-transparent font-semibold font-mono outline-none"
          name="task"
          autoComplete="off"
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
