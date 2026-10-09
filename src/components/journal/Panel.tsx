import type { ReactNode } from 'react';

/** Panel berbingkai pixel untuk Music dan Workout di bagian Journal. */
export default function Panel({ label, source, children }: { label: string; source: string; children: ReactNode }) {
  return (
    <section className="px-panel flex h-full flex-col p-6">
      <header className="mb-5 flex items-baseline justify-between gap-3 border-b-4 border-dashed border-panel-2 pb-4">
        <h3 className="text-xs text-coin">{label.toUpperCase()}</h3>
        <span className="text-xs text-muted">{source}</span>
      </header>
      <div className="flex-1">{children}</div>
    </section>
  );
}

export function PanelMessage({ children }: { children: ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

/** Kerangka kotak-kotak selama data dimuat, berkedip bertahap. */
export function PanelSkeleton({ media }: { media?: boolean }) {
  return (
    <div className="flex gap-4" aria-label="Loading" role="status">
      {media ? <div className="px-blink size-20 shrink-0 bg-panel-2" /> : null}
      <div className="flex-1 space-y-3 pt-1">
        <div className="px-blink h-4 w-3/4 bg-panel-2" />
        <div className="px-blink h-3.5 w-1/2 bg-panel-2" />
        <div className="px-blink h-3.5 w-1/3 bg-panel-2" />
      </div>
    </div>
  );
}
