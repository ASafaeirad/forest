import { cn } from '@forest/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export const Hotkey = ({ children, className, onPress }: Props) => {
  return (
    <kbd
      onTouchEnd={onPress}
      role="button"
      className={cn(
        'grid size-8 place-content-center border-1 rounded-full border-solid bg-shade shadow-kbd',
        className,
      )}
    >
      {children}
    </kbd>
  );
};
