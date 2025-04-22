import { cn } from '@forest/cn';
import { Toggle as BaseToggle } from 'radix-ui';

export const Toggle = ({
  className,
  children,
  ...props
}: BaseToggle.ToggleProps) => {
  return (
    <BaseToggle.Root
      aria-label="focus"
      className="group relative cursor-pointer select-none rounded-full border-none bg-transparent p-0 outline-none transition-filter duration-250 focus-within:filter-brighter hover:filter-brighter"
      autoFocus
      {...props}
    >
      <span
        className={cn(
          'absolute left-0 top-0 size-full rounded-full toggle-gradient-shadow',
          'top-[-8%] left-[.5%] h-[110%] w-[99%] toggle-clip',
          'shadow-toggle-on group-data-[state=on]:shadow-toggle-off transition-shadow duration-250',
        )}
      />
      <div
        className={cn(
          'pl-5 pr-3 py-3 rounded-full -translate-y-1.5 font-bold',
          'text-fg-inverse bg-interface toggle-shadow-inset',
          'flex items-center gap-2 text-base',
          'will-change-transform transition-transform duration-300 ease-cubic',
          'group-data-[state=on]:(-translate-y-1)',
          'group-active:(-translate-y-0.5)',
        )}
      >
        {children}
        <div
          className={cn(
            'size-3 rounded-full',
            'group-data-[state=off]:(toggle-gradient-off bg-toggle-off )',
            'group-data-[state=on]:toggle-gradient-on',
          )}
        ></div>
      </div>
    </BaseToggle.Root>
  );
};
