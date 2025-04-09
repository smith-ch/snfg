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
      'images.pexels.com',
      'pexels.com',
      'picsum.photos',
      'loremflickr.com',
      'placekitten.com',
      'placeimg.com',
      'placeholdit.imgix.net',
      'via.placeholder.com',
      'dummyimage.com',
      'cloudinary.com',
      'res.cloudinary.com'
    ],
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

export default nextConfig
