import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Ye build ke dauran TypeScript errors ko ignore karega
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ye build ke dauran ESLint errors ko ignore karega
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;