/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dr.com.tr",
        port: "",
        pathname: "/cache/**",
      },
    ],
  },
};

module.exports = nextConfig;
