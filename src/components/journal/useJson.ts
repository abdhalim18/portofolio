'use client';

import { useEffect, useState } from 'react';

export type FetchState<T> = { status: 'loading' } | { status: 'error' } | { status: 'ok'; data: T };

/** Ambil JSON dari route API; opsional diperbarui berkala selama tab terlihat. */
export function useJson<T>(url: string, refreshMs?: number): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as T;
        if (!cancelled) setState({ status: 'ok', data });
      } catch {
        if (!cancelled) setState((prev) => (prev.status === 'ok' ? prev : { status: 'error' }));
      }
    };
    void load();
    if (!refreshMs) return () => {
      cancelled = true;
    };
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') void load();
    }, refreshMs);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [url, refreshMs]);

  return state;
}
