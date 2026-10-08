'use client';

import Panel, { PanelMessage } from './Panel';
import { useJson } from './useJson';
import { timeAgo } from '@/lib/format';
import type { MusicResult } from '@/lib/lastfm';

const linkClass = 'font-terminal text-xl text-ff-active underline underline-offset-4';

/** BGM: lagu Spotify yang sedang/terakhir diputar, lewat scrobble Last.fm. Diperbarui tiap 30 detik. */
export default function MusicPanel() {
  const state = useJson<MusicResult>('/api/music', 30_000);

  return (
    <Panel label="BGM" source="Spotify via Last.fm">
      {state.status === 'loading' && <PanelMessage blink>Loading...</PanelMessage>}
      {state.status === 'error' && <PanelMessage>Couldn&apos;t reach Last.fm. Try again later.</PanelMessage>}
      {state.status === 'ok' && !state.data.configured && <PanelMessage>Music isn&apos;t connected yet.</PanelMessage>}
      {state.status === 'ok' && state.data.configured && !state.data.track && <PanelMessage>Nothing played recently.</PanelMessage>}
      {state.status === 'ok' && state.data.configured && state.data.track && (() => {
        const t = state.data.track;
        return (
          <div className="flex gap-4">
            {t.albumImage ? (
              <img
                src={t.albumImage}
                alt={t.album ? `Album cover: ${t.album}` : ''}
                width={96}
                height={96}
                className="size-24 shrink-0 border-2 border-white/80 [image-rendering:auto]"
              />
            ) : null}
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-pixel text-[0.6rem] text-ff-hp" aria-live="polite">
                {t.isPlaying ? (
                  <>
                    <span aria-hidden="true" className="ff-blink inline-block size-2 bg-ff-hp" />
                    Now playing
                  </>
                ) : (
                  <span className="text-ff-muted">Last played {t.playedAt ? timeAgo(t.playedAt) : ''}</span>
                )}
              </p>
              <p className="mt-2 truncate text-sm leading-relaxed [font-family:var(--font-pixel)]" title={t.title}>
                {t.title}
              </p>
              <p className="truncate font-terminal text-xl text-ff-dim" title={t.artist}>
                {t.artist}
              </p>
              <p className="mt-2 flex flex-wrap gap-x-4">
                <a href={t.spotifySearchUrl} target="_blank" rel="noopener noreferrer" className={linkClass} data-sfx>
                  Find on Spotify
                </a>
                <a href={t.url} target="_blank" rel="noopener noreferrer" className={linkClass} data-sfx>
                  View on Last.fm
                </a>
              </p>
            </div>
          </div>
        );
      })()}
    </Panel>
  );
}
