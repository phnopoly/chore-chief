const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  transpilePackages: [
    "@chore-chief/api-client",
    "@chore-chief/config",
    "@chore-chief/forms",
    "@chore-chief/mirage",
    "@chore-chief/types",
    "@chore-chief/ui",
    "@chore-chief/utils",
  ],
};

export default nextConfig;
