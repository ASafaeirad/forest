interface Props {
  count: number;
}

export const Counter = ({ count }: Props) => {
  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  return (
    <div>
      <output className="text-5xl text-fg font-bold font-mono">
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </output>
    </div>
  );
};
