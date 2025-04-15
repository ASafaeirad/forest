import Arrow from './design/Arrow/Arrow.svg?react';
import { Toggle } from './design/Toggle/Toggle';

export function App() {
  return (
    <div className="grid place-content-center h-screen">
      <div className="relative size-90 flex flex-col items-center justify-center gap-5 rounded-full timer-border">
        <output className="text-4xl text-6xl text-fg font-bold font-mono">
          25:00
        </output>
        <Toggle>Focus</Toggle>
        <div className="absolute left-0 color-marker -bottom-5">
          <Arrow />
        </div>
      </div>
    </div>
  );
}
