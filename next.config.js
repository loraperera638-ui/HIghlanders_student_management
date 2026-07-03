/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'f002.backblazeb2.com'],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
}

module.exports = nextConfig
