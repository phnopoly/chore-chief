import path from "path";
import process from "node:process";
import withTM from "next-transpile-modules";

const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const repoRoot = path.join(process.cwd(), "../../");
const formsPath = path.join(repoRoot, "packages/forms");

let nextConfig = baseConfig;

if (process.env.NEXT_IGNORE_TRANSPILE !== "1") {
  const withTranspile = withTM([formsPath], {
    resolveSymlinks: true,
  });
  nextConfig = withTranspile(baseConfig);
}

export default nextConfig;
