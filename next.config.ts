import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    eslint: {
        dirs: ['pages', 'components', 'lib', 'src'], // Directories to lint
        ignoreDuringBuilds: true
    },
    experimental: {
        reactCompiler: true
    }
};

export default nextConfig;
