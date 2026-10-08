/**
 * Musik dari Last.fm: lagu yang sedang/terakhir diputar.
 * Hubungkan Spotify ke Last.fm (scrobbling) agar setiap lagu Spotify tercatat di sini.
 * HANYA dipakai di server. Env: LASTFM_API_KEY, LASTFM_USERNAME
 */

export type MusicTrack = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string | null;
  albumImage: string | null;
  /** Halaman lagu di Last.fm. */
  url: string;
  /** Pencarian lagu yang sama di Spotify. */
  spotifySearchUrl: string;
  /** ISO time saat lagu terakhir diputar. Null bila sedang diputar. */
  playedAt: string | null;
};

export type MusicResult = { configured: false } | { configured: true; track: MusicTrack | null };

type LastfmImage = { size: string; '#text': string };
export type LastfmTrack = {
  name: string;
  url: string;
  artist: { '#text': string };
  album?: { '#text': string };
  image?: LastfmImage[];
  date?: { uts: string };
  '@attr'?: { nowplaying?: string };
};

// Last.fm memakai gambar bintang abu-abu ini saat album tidak punya cover.
const PLACEHOLDER_IMAGE = '2a96cbd8b46e442fc41c2b86b821562f';

export function toMusicTrack(t: LastfmTrack): MusicTrack {
  const images = t.image ?? [];
  const pick = images.find((i) => i.size === 'large') ?? images.at(-1);
  const imageUrl = pick?.['#text'] || null;
  const isPlaying = t['@attr']?.nowplaying === 'true';
  return {
    isPlaying,
    title: t.name,
    artist: t.artist['#text'],
    album: t.album?.['#text'] || null,
    albumImage: imageUrl && !imageUrl.includes(PLACEHOLDER_IMAGE) ? imageUrl : null,
    url: t.url,
    spotifySearchUrl: `https://open.spotify.com/search/${encodeURIComponent(`${t.artist['#text']} ${t.name}`)}`,
    playedAt: !isPlaying && t.date ? new Date(Number(t.date.uts) * 1000).toISOString() : null,
  };
}

export async function getRecentTrack(): Promise<MusicResult> {
  const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env;
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) return { configured: false };

  const url =
    'https://ws.audioscrobbler.com/2.0/?' +
    new URLSearchParams({
      method: 'user.getrecenttracks',
      user: LASTFM_USERNAME,
      api_key: LASTFM_API_KEY,
      format: 'json',
      limit: '1',
    });
  const res = await fetch(url, { cache: 'no-store', headers: { 'User-Agent': 'abdul-halim-portfolio' } });
  const data = (await res.json()) as {
    error?: number;
    message?: string;
    recenttracks?: { track: LastfmTrack[] | LastfmTrack };
  };
  if (!res.ok || data.error) throw new Error(`Last.fm error ${data.error ?? res.status}: ${data.message ?? ''}`);

  // Bila hanya ada satu lagu, Last.fm mengembalikan objek, bukan array.
  const raw = data.recenttracks?.track;
  const tracks = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return { configured: true, track: tracks[0] ? toMusicTrack(tracks[0]) : null };
}
