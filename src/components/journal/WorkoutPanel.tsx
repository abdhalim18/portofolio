'use client';

import Panel, { PanelMessage, PanelSkeleton } from './Panel';
import { useJson } from './useJson';
import { formatDuration, humanizeSport, timeAgo } from '@/lib/format';
import type { WorkoutResult } from '@/lib/intervals';

/** Olahraga terakhir dari jam Amazfit (lewat Zepp dan Intervals.icu). */
export default function WorkoutPanel() {
  const state = useJson<WorkoutResult>('/api/workout');

  return (
    <Panel label="Workout" source="Amazfit">
      {state.status === 'loading' && <PanelSkeleton />}
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
            <p className="truncate text-lg font-semibold text-cream" title={a.name}>
              {a.name}
            </p>
            <p className="font-mono text-xs text-muted">{timeAgo(a.startDate)}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="px-label">{s.label}</dt>
                  <dd className="mt-1 text-lg text-cream tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })()}
    </Panel>
  );
}
