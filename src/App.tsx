import { Toggle } from './design/Toggle/Toggle';

export function App() {
  return (
    <div className="grid h-screen place-content-center">
      <div className="size-[400px] flex flex-col items-center justify-center gap-5 rounded-full timer-border">
        <output className="text-4xl text-6xl text-fg font-bold font-mono">
          25:00
        </output>
        <Toggle>Focus</Toggle>
      </div>
    </div>
  );
}
