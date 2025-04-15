import { Toggle as BaseToggle } from 'radix-ui';

import { cn } from '../libs/cn';

export const Toggle = ({
  className,
  children,
  ...props
}: BaseToggle.ToggleProps) => {
  return (
    <BaseToggle.Root
      aria-label="focus"
      className="group relative cursor-pointer rounded-full border-none bg-transparent p-0 outline-none transition-filter duration-250 focus-within:filter-brighter hover:filter-brighter"
      {...props}
    >
      <span
        className={cn(
          'absolute left-0 top-0 size-full rounded-full bg-[hsl(0,0,11%)]',
          'top-[-8%] left-[.5%] h-[110%] w-[99%] ',
          'toggle-shadow group-data-[state=on]:(toggle-shadow-sm) transition-shadow duration-250',
        )}
      />
      <div
        className={cn(
          'pl-5 pr-3 py-3 rounded-full -translate-y-1.5 font-bold',
          'text-fg-inverse bg-interface toggle-shadow-inset',
          'flex items-center gap-2',
          'will-change-transform transition-transform duration-300 ease-cubic',
          'group-data-[state=on]:(-translate-y-1 transition-transform duration-100)',
        )}
      >
        {children}
        <div
          className={cn(
            'size-3 rounded-full',
            'bg-toggle-off toggle-gradient-off',
            'group-data-[state=on]:toggle-gradient-on',
          )}
        ></div>
      </div>
    </BaseToggle.Root>
  );
};
