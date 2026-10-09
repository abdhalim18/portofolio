import type { ReactNode } from 'react';

/** Kartu datar dengan garis 1px. Dipakai untuk Music dan Workout di bagian Journal. */
export default function Panel({ label, source, children }: { label: string; source: string; children: ReactNode }) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgb(0_0_0/0.04)] sm:p-8">
      <header className="mb-6 flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] font-medium text-ink">{label}</h3>
        <span className="font-mono text-xs text-muted">{source}</span>
      </header>
      <div className="flex-1">{children}</div>
    </section>
  );
}

export function PanelMessage({ children }: { children: ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

/** Kerangka abu-abu berbentuk isi asli, ditampilkan selama data dimuat. */
export function PanelSkeleton({ media }: { media?: boolean }) {
  return (
    <div className="flex animate-pulse gap-4" aria-label="Loading" role="status">
      {media ? <div className="size-20 shrink-0 rounded-md bg-line" /> : null}
      <div className="flex-1 space-y-3 pt-1">
        <div className="h-4 w-3/4 rounded bg-line" />
        <div className="h-3.5 w-1/2 rounded bg-line" />
        <div className="h-3.5 w-1/3 rounded bg-line" />
      </div>
    </div>
  );
}
