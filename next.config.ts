import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    eslint: {
        dirs: ['pages', 'components', 'lib', 'src'], // Directories to lint
        ignoreDuringBuilds: false
    }
};

export default nextConfig;
