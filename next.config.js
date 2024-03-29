/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dr.com.tr",
        port: "",
        pathname: "/cache/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: "https://localhost:7052/:path*",
      },

    ];
  },
};

module.exports = nextConfig;
