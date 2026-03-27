/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment optimizations
  experimental: {
    serverComponentsExternalPackages: ['mongoose'], // If needed for backend calls
  },
  env: {
    NEXT_PUBLIC_BASE_URI: process.env.NEXT_PUBLIC_BASE_URI || 'http://localhost:8000/api/v1',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable telemetry
  telemetry: false,
};

export default nextConfig;
