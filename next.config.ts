import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '5zr71v3idd.ucarecd.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
