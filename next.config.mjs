/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  server: {
    host: "127.0.0.1",
  },
  rewrites() {
    return [
      {
        source: "/edge/api/authentication/:path*",
        destination: "/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
