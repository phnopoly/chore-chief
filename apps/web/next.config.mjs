/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    externalDir: true,
  },
  transpilePackages: [
    "@chore-champ/forms",
    "@chore-champ/mirage",
    "@chore-champ/ui",
    "@chore-champ/utils",
    "@chore-champ/types",
  ],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  webpack(config) {
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};

export default nextConfig;
