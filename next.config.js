/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/connect',
  assetPrefix: '/connect/',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig;
