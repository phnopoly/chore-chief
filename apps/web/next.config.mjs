/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  webpack(config) {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/node_modules/**", "!**/node_modules/@chore-champ/**"],
    };
    return config;
  },
};

export default nextConfig;
