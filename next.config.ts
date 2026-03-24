import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    testProxy: process.env.PLAYWRIGHT_TEST === 'true',
  },
};

export default nextConfig;
