import type {NextConfig} from 'next'

const STUDIO_URL = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'

const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
  },
  async headers() {
    return [
      {
        // Allow the Sanity Studio to embed this app in an iframe for Presentation/visual editing
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' ${STUDIO_URL} https://wric-sanity-2026-studio.vercel.app`,
          },
        ],
      },
    ]
  },
}

export default nextConfig
