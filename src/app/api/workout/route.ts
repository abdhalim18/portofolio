import { NextResponse } from 'next/server';
import { getLatestWorkout } from '@/lib/intervals';

export async function GET() {
  try {
    const result = await getLatestWorkout();
    return NextResponse.json(result, {
      // Olahraga jarang berubah: simpan 10 menit di CDN.
      headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200' },
    });
  } catch (error) {
    console.error('[api/workout]', error);
    return NextResponse.json({ error: 'Workout data is unavailable right now.' }, { status: 502 });
  }
}
