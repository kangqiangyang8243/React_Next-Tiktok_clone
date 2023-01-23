/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      "th.bing.com"
    ]
  },
  env: {
    base_url: process.env.NEXT_PUBLIC_BASE_URL,
  },
}
