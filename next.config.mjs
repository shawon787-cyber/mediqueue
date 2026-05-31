/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "static.vecteezy.com",
    ],
  },
};

export default nextConfig;