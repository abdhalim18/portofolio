'use client';

import Panel, { PanelMessage, PanelSkeleton } from './Panel';
import { useJson } from './useJson';
import { timeAgo } from '@/lib/format';
import type { MusicResult } from '@/lib/lastfm';

/** Lagu Spotify yang sedang/terakhir diputar, lewat scrobble Last.fm. Diperbarui tiap 30 detik. */
export default function MusicPanel() {
  const state = useJson<MusicResult>('/api/music', 30_000);

  return (
    <Panel label="Music" source="Spotify via Last.fm">
      {state.status === 'loading' && <PanelSkeleton media />}
      {state.status === 'error' && <PanelMessage>Couldn&apos;t reach Last.fm. Try again later.</PanelMessage>}
      {state.status === 'ok' && !state.data.configured && <PanelMessage>Music isn&apos;t connected yet.</PanelMessage>}
      {state.status === 'ok' && state.data.configured && !state.data.track && <PanelMessage>Nothing played recently.</PanelMessage>}
      {state.status === 'ok' && state.data.configured && state.data.track && (() => {
        const t = state.data.track;
        return (
          <div className="flex gap-5">
            {t.albumImage ? (
              <img
                src={t.albumImage}
                alt={t.album ? `Album cover: ${t.album}` : ''}
                width={80}
                height={80}
                className="size-20 shrink-0 rounded-md border border-line object-cover"
              />
            ) : null}
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-mono text-xs text-muted" aria-live="polite">
                {t.isPlaying ? (
                  <>
                    <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-accent-fg" />
                    <span className="text-accent-fg">Now playing</span>
                  </>
                ) : (
                  <>Last played {t.playedAt ? timeAgo(t.playedAt) : ''}</>
                )}
              </p>
              <p className="mt-2 truncate text-lg font-medium text-ink" title={t.title}>
                {t.title}
              </p>
              <p className="truncate text-muted" title={t.artist}>
                {t.artist}
              </p>
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <a href={t.spotifySearchUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                  Find on Spotify
                </a>
                <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-link">
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
