/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ['om-marketing.onrender.com', 'localhost'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  swcMinify: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },
}

export default nextConfig
