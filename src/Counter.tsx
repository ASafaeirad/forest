import { cn } from './libs/cn';

interface Props {
  count: number;
  className?: string;
}

export const Counter = ({ count, className }: Props) => {
  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  return (
    <div className={className}>
      <output
        className={cn('text-5xl text-fg font-bold font-mono tracking-widest')}
      >
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </output>
    </div>
  );
};
