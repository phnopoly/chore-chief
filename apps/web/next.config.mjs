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
};

export default nextConfig;
