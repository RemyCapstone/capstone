/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['wp-tid.zillowstatic.com', 'photos.zillowstatic.com', 'maps.googleapis.com', 'cdn.walk.sc']
  }
}

module.exports = nextConfig
