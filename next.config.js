/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/connect' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/connect/' : '',
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
