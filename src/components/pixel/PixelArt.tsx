import type { SVGProps } from 'react';

type PixelArtProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  /** Baris piksel. Setiap karakter = satu piksel; '.' = transparan. */
  map: readonly string[];
  /** Warna untuk setiap karakter di peta. */
  palette: Record<string, string>;
  /** Ukuran satu piksel dalam px saat dirender. */
  scale?: number;
};

/** Menggambar sprite pixel dari peta teks. Dekoratif, jadi disembunyikan dari screen reader. */
export default function PixelArt({ map, palette, scale = 4, className, ...rest }: PixelArtProps) {
  const width = Math.max(...map.map((row) => row.length));
  const height = map.length;
  const rects: { x: number; y: number; w: number; fill: string }[] = [];

  // Gabungkan piksel berwarna sama yang berurutan dalam satu baris supaya DOM tetap ringan.
  map.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      const fill = palette[ch];
      if (!fill) {
        x += 1;
        continue;
      }
      let w = 1;
      while (row[x + w] === ch) w += 1;
      rects.push({ x, y, w, fill });
      x += w;
    }
  });

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      className={className}
      {...rest}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}
