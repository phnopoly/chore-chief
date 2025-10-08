import path from "path";
import withTM from "next-transpile-modules";

const withTranspile = withTM(
  [
    path.resolve("../../packages/forms"), // use full path to the package folder
  ],
  {
    resolveSymlinks: true,
  },
);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withTranspile(nextConfig);
