import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects/kazzi-soda",
        destination: "/projects/side-projects",
        permanent: true,
      },
      {
        source: "/work/kazzi-soda",
        destination: "/projects/side-projects",
        permanent: true,
      },
    ];
  },

  
};

export default nextConfig;
