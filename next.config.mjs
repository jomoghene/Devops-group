/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    //... other eslint configurations...
    // formatter: 'prettier',
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
