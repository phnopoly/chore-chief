import path from "path";
import withTM from "next-transpile-modules";

const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

let nextConfig = baseConfig;

// eslint-disable-next-line no-undef
if (process.env.NEXT_IGNORE_TRANSPILE !== "1") {
  const withTranspile = withTM([path.resolve("./packages/forms")], {
    resolveSymlinks: true,
  });
  nextConfig = withTranspile(baseConfig);
}

export default nextConfig;
