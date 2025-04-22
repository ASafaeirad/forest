import { cn } from '@forest/cn';
import { formatSeconds } from '@fullstacksjs/toolbox';

interface Props {
  count: number;
  className?: string;
}

export const Counter = ({ count, className }: Props) => {
  return (
    <div className={className}>
      <output
        className={cn('text-5xl text-fg font-bold font-mono tracking-widest')}
      >
        {formatSeconds(count, { format: 'mm:ss' })}
      </output>
    </div>
  );
};
