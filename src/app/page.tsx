import TitleScreen from '@/components/TitleScreen';

// Halaman utama hanya Title Screen. Isi lain dibuka lewat menu sebagai layar sendiri.
export default function Home() {
  return (
    <main id="main">
      <TitleScreen />
    </main>
  );
}
