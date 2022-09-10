/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud', 'content.wrappr.wtf'],
  },
}

module.exports = nextConfig
