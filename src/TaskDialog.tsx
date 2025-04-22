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
    >
      <form className="flex items-center gap-2" method="dialog">
        <input
          className="h-8 flex-1 border-none bg-transparent font-semibold font-mono outline-none"
          name="task"
          onBlur={e => {
            e.currentTarget.form?.submit();
          }}
          onFocus={e => {
            e.target.select();
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const value = e.currentTarget.value.trim();
              if (value) onSubmit?.(value);
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
  );
}
