import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/legal",
        destination: "/legal/privacidade",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
