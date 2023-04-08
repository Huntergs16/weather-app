/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.weatherapi.com'],
  },
  output: 'export',
}

module.exports = nextConfig
