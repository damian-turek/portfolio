import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              dimensions: false,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  images: {
    unoptimized: true,
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
