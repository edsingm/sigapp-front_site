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
      {
        source: "/legal/contrato-utilizacao",
        destination: "/legal/termos-de-uso",
        permanent: true,
      },
      {
        source: "/juridico",
        destination: "/legal/privacidade",
        permanent: true,
      },
      {
        source: "/juridico/termos-de-uso",
        destination: "/legal/termos-de-uso",
        permanent: true,
      },
      {
        source: "/juridico/privacidade",
        destination: "/legal/privacidade",
        permanent: true,
      },
      {
        source: "/juridico/lgpd",
        destination: "/legal/lgpd",
        permanent: true,
      },
      {
        source: "/juridico/cookies",
        destination: "/legal/cookies",
        permanent: true,
      },
      {
        source: "/juridico/contrato-utilizacao",
        destination: "/legal/termos-de-uso",
        permanent: true,
      },
      {
        source: "/juridico/:path*",
        destination: "/legal/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
