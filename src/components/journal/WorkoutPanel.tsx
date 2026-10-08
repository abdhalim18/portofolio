'use client';

import Panel, { PanelMessage } from './Panel';
import { useJson } from './useJson';
import { formatDuration, humanizeSport, timeAgo } from '@/lib/format';
import type { WorkoutResult } from '@/lib/intervals';

/** Last Quest: olahraga terakhir dari jam Amazfit (lewat Zepp dan Intervals.icu). */
export default function WorkoutPanel() {
  const state = useJson<WorkoutResult>('/api/workout');

  return (
    <Panel label="Last Quest" source="Amazfit">
      {state.status === 'loading' && <PanelMessage blink>Loading...</PanelMessage>}
      {state.status === 'error' && <PanelMessage>Couldn&apos;t load my workouts. Try again later.</PanelMessage>}
      {state.status === 'ok' && !state.data.configured && <PanelMessage>Workouts aren&apos;t connected yet.</PanelMessage>}
      {state.status === 'ok' && state.data.configured && !state.data.activity && <PanelMessage>No workouts in the last 6 months.</PanelMessage>}
      {state.status === 'ok' && state.data.configured && state.data.activity && (() => {
        const a = state.data.activity;
        const stats = [
          { label: 'Type', value: humanizeSport(a.type) },
          { label: 'Distance', value: a.distanceKm != null ? `${a.distanceKm.toFixed(2)} km` : null },
          { label: 'Time', value: a.movingTimeSec != null ? formatDuration(a.movingTimeSec) : null },
          { label: 'Elevation', value: a.elevationGainM ? `${a.elevationGainM} m` : null },
        ].filter((s): s is { label: string; value: string } => s.value !== null);
        return (
          <div>
            <p className="truncate text-sm leading-relaxed [font-family:var(--font-pixel)]" title={a.name}>
              {a.name}
            </p>
            <p className="font-terminal text-xl text-ff-muted">{timeAgo(a.startDate)}</p>
            <dl className="mt-3 grid gap-x-6 gap-y-1 font-terminal text-xl sm:grid-cols-2">
              {stats.map((s) => (
                <div key={s.label} className="flex justify-between gap-3 border-b border-white/10 py-1">
                  <dt className="text-ff-muted">{s.label}</dt>
                  <dd className="whitespace-nowrap tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })()}
    </Panel>
  );
}
