/**
 * Olahraga terakhir dari jam Amazfit: Zepp -> Intervals.icu -> portofolio.
 * HANYA dipakai di server. Env: INTERVALS_API_KEY (Intervals.icu > Settings > Developer Settings).
 *
 * Privasi: lokasi, peta rute, dan detak jantung SENGAJA tidak dikirim ke browser.
 */

export type WorkoutActivity = {
  name: string;
  type: string;
  distanceKm: number | null;
  movingTimeSec: number | null;
  elevationGainM: number | null;
  startDate: string;
};

export type WorkoutResult = { configured: false } | { configured: true; activity: WorkoutActivity | null };

export type IntervalsActivity = {
  id: string;
  name?: string | null;
  type?: string | null;
  start_date?: string | null;
  start_date_local?: string | null;
  distance?: number | null;
  moving_time?: number | null;
  total_elevation_gain?: number | null;
  /** Ada pada aktivitas dari Strava yang tidak boleh dibagikan lewat API. */
  _note?: string;
};

const LOOKBACK_DAYS = 180;

const isoDay = (d: Date) => d.toISOString().slice(0, 10);
const startOf = (a: IntervalsActivity) => a.start_date ?? a.start_date_local ?? '';

export function toWorkout(a: IntervalsActivity): WorkoutActivity {
  return {
    name: a.name?.trim() || 'Workout',
    type: a.type || 'Workout',
    distanceKm: a.distance ? Math.round((a.distance / 1000) * 100) / 100 : null,
    movingTimeSec: a.moving_time ?? null,
    elevationGainM: a.total_elevation_gain != null ? Math.round(a.total_elevation_gain) : null,
    startDate: startOf(a),
  };
}

export async function getLatestWorkout(now = new Date()): Promise<WorkoutResult> {
  const { INTERVALS_API_KEY } = process.env;
  if (!INTERVALS_API_KEY) return { configured: false };

  const oldest = new Date(now.getTime() - LOOKBACK_DAYS * 86_400_000);
  const tomorrow = new Date(now.getTime() + 86_400_000);
  // Athlete id "0" = pemilik API key.
  const url =
    'https://intervals.icu/api/v1/athlete/0/activities?' +
    new URLSearchParams({ oldest: isoDay(oldest), newest: isoDay(tomorrow) });

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${Buffer.from(`API_KEY:${INTERVALS_API_KEY}`).toString('base64')}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Intervals.icu activities failed: ${res.status}`);

  const list = (await res.json()) as IntervalsActivity[];
  const latest = list
    .filter((a) => !a._note && startOf(a))
    .sort((a, b) => startOf(b).localeCompare(startOf(a)))[0];
  return { configured: true, activity: latest ? toWorkout(latest) : null };
}
