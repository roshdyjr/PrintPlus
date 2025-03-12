import type { NextConfig } from 'next';
import nextI18NextConfig from './next-i18next.config';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // Add next-i18next configuration
  i18n: nextI18NextConfig.i18n,
};

export default nextConfig;