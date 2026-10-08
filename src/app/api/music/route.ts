import { NextResponse } from 'next/server';
import { getRecentTrack } from '@/lib/lastfm';

export async function GET() {
  try {
    const result = await getRecentTrack();
    return NextResponse.json(result, {
      // CDN Vercel menyimpan 30 detik supaya tidak membebani API Last.fm.
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' },
    });
  } catch (error) {
    console.error('[api/music]', error);
    return NextResponse.json({ error: 'Music data is unavailable right now.' }, { status: 502 });
  }
}
