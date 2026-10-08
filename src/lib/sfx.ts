/**
 * Efek suara menu ala Final Fantasy.
 *
 * ── CARA MEMAKAI FILE AUDIO SENDIRI ─────────────────────────────
 * 1. Taruh file di folder `public/sfx/`, misalnya:
 *      public/sfx/cursor.wav   -> bunyi "bloop" saat kursor pindah/hover
 *      public/sfx/confirm.wav  -> bunyi "chime" saat memilih menu
 *      public/sfx/cancel.wav   -> bunyi saat menutup/membatalkan
 * 2. Isi path-nya di objek SFX_FILES di bawah (hapus `null`).
 * Selama nilainya `null`, suara dibuat otomatis dengan Web Audio
 * (gelombang square 8-bit), jadi tidak perlu file apa pun.
 *
 * Catatan: browser baru mengizinkan audio setelah interaksi pertama
 * (klik / tombol keyboard). Hover sebelum itu memang tidak berbunyi.
 */

export type SfxName = 'cursor' | 'confirm' | 'cancel';

const SFX_FILES: Record<SfxName, string | null> = {
  cursor: null, // contoh: '/sfx/cursor.wav'
  confirm: null, // contoh: '/sfx/confirm.wav'
  cancel: null, // contoh: '/sfx/cancel.wav'
};

const STORAGE_KEY = 'ff-sfx-enabled';
const listeners = new Set<(enabled: boolean) => void>();
const fileCache = new Map<SfxName, HTMLAudioElement>();
let ctx: AudioContext | null = null;
let enabled = true;
let hydrated = false;

function readPreference() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  try {
    enabled = window.localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    enabled = true;
  }
}

export function isSfxEnabled() {
  readPreference();
  return enabled;
}

export function setSfxEnabled(next: boolean) {
  enabled = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
  } catch {
    /* storage diblokir: preferensi hanya berlaku di sesi ini */
  }
  listeners.forEach((fn) => fn(next));
}

export function subscribeSfx(fn: (enabled: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function getContext() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/** Satu nada square wave pendek. */
function tone(ac: AudioContext, freq: number, start: number, duration: number, volume = 0.05) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function synth(name: SfxName) {
  const ac = getContext();
  if (!ac) return;
  const t = ac.currentTime;
  switch (name) {
    case 'cursor': // "bloop" pendek
      tone(ac, 1318, t, 0.045, 0.035);
      break;
    case 'confirm': // chime dua nada naik
      tone(ac, 988, t, 0.07);
      tone(ac, 1568, t + 0.07, 0.12);
      break;
    case 'cancel': // dua nada turun
      tone(ac, 784, t, 0.06);
      tone(ac, 523, t + 0.06, 0.1);
      break;
  }
}

export function playSfx(name: SfxName) {
  if (!isSfxEnabled()) return;
  const file = SFX_FILES[name];
  if (file) {
    let audio = fileCache.get(name);
    if (!audio) {
      audio = new Audio(file);
      audio.volume = 0.4;
      fileCache.set(name, audio);
    }
    audio.currentTime = 0;
    void audio.play().catch(() => {});
    return;
  }
  synth(name);
}
