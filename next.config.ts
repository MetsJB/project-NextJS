import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.mds.yandex.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
