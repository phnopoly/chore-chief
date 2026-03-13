/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  transpilePackages: [
    "@chore-champ/api-client",
    "@chore-champ/config",
    "@chore-champ/forms",
    "@chore-champ/mirage",
    "@chore-champ/types",
    "@chore-champ/ui",
    "@chore-champ/utils",
  ],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  webpack(config) {
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};

export default nextConfig;
