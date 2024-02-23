/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  "output": "export",
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
