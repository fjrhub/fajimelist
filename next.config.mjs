/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "img.youtube.com",
                hostname: "cdn.myanimelist.net"
            }
        ]
    }
}

export default nextConfig;
