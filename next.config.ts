import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.fallback = {
      fs: require.resolve('browserify-fs'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    };
    // config.plugins.push(
    //   new webpack.ProvidePlugin({
    //     Buffer: ['buffer', 'Buffer'],
    //   }),
    // );
    return config;
  },
};

export default nextConfig;
