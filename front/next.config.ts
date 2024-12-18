import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // Add the port if your server is running on localhost:8000
      },
    ],
  },
  reactStrictMode:false
};

export default nextConfig;
