/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', '192.168.100.97'],
  },
  future: {
    webpack5: true,  
  }, 
}

module.exports = nextConfig
