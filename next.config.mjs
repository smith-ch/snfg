/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'source.unsplash.com',
      'unsplash.com',
      'blob.v0.app',
    ],
    unoptimized: false,
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
