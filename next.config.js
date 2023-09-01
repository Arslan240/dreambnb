/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com", //we can also just CldImage instead on next/Image. Then we'll render image using cloudinary component
    ]
  }
}

module.exports = nextConfig
