/** Sarung tangan putih penunjuk ala FF. Dekoratif, jadi disembunyikan dari screen reader. */
export default function HandPointer({ className = 'ff-hand' }: { className?: string }) {
  return (
    <img src="/cursors/ff-hand.svg" alt="" aria-hidden="true" width={32} height={26} className={className} draggable={false} />
  );
}
