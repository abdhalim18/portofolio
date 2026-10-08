import type { ReactNode } from 'react';

/** Sub-jendela di dalam layar Journal. */
export default function Panel({ label, source, children }: { label: string; source: string; children: ReactNode }) {
  return (
    <section data-reveal className="flex flex-col rounded border-2 border-white/20 bg-black/15 p-5">
      <header className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="text-xs text-ff-active">{label}</h2>
        <span className="font-terminal text-lg text-ff-muted">{source}</span>
      </header>
      <div className="flex-1">{children}</div>
    </section>
  );
}

export function PanelMessage({ children, blink }: { children: ReactNode; blink?: boolean }) {
  return <p className={`font-terminal text-2xl text-ff-dim ${blink ? 'ff-blink' : ''}`}>{children}</p>;
}
