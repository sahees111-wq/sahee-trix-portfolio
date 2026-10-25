/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';
const repositoryName = 'sahee-trix-portfolio';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isGitHubPages && !isCustomDomain ? `/${repositoryName}` : '',
  assetPrefix: isGitHubPages && !isCustomDomain ? `/${repositoryName}/` : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'illustrations.popsy.co',
      }
    ],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(projectRoot, 'src'),
    };
    return config;
  },
};

export default nextConfig;
