import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // About Me dan Journal sekarang ada di halaman utama; link lama diarahkan ke sana.
  async redirects() {
    return [
      { source: '/about', destination: '/#about-me', permanent: true },
      { source: '/journal', destination: '/#journal', permanent: true },
    ];
  },
};

export default nextConfig;
