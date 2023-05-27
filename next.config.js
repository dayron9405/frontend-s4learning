/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        baseUrl: process.env.BASE_URL,
        nextApi: process.env.NEXT_API,
    },
}

module.exports = nextConfig
