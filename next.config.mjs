/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["gigsaw.s3.eu-north-1.amazonaws.com"],
      deviceSizes: [240, 480], // Optimize for phone sizes
      formats: ['image/webp'],
      minimumCacheTTL: 60,
    },
  };


export default nextConfig;
