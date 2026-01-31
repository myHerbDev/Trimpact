/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["date-fns"],
  // Add optimizePackageImports to optimize imports from date-fns
  experimental: {
    optimizePackageImports: ["date-fns", "lucide-react"],
  },
  // Resolve the date-fns peer dependency issue
  webpack: (config, { isServer }) => {
    // Add resolve aliases if needed
    config.resolve.alias = {
      ...config.resolve.alias,
      // Add any specific aliases if needed
    }

    return config
  },
}

module.exports = nextConfig

