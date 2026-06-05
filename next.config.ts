import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // 'eslint' object ko yahan se poora hata dein
};

export default nextConfig;