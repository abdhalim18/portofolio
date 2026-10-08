'use client';

import { useSyncExternalStore } from 'react';
import { isSfxEnabled, setSfxEnabled, subscribeSfx, playSfx } from '@/lib/sfx';

/** Tombol nyala/mati efek suara, disimpan di localStorage. */
export default function SoundToggle() {
  const enabled = useSyncExternalStore(subscribeSfx, isSfxEnabled, () => true);

  return (
    <button
      type="button"
      className="ff-button fixed left-4 top-4 z-50"
      aria-pressed={enabled}
      onClick={() => {
        const next = !enabled;
        setSfxEnabled(next);
        if (next) playSfx('confirm');
      }}
    >
      <span aria-hidden="true">♪</span>
      Sound {enabled ? 'On' : 'Off'}
    </button>
  );
}
