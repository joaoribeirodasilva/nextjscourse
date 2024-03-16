/** @type {import('next').NextConfig} */
import path from 'path';
const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './'),
        };
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**'
            }
        ]
    }
};

export default nextConfig;
