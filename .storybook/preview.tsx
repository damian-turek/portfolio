import type { Preview } from '@storybook/nextjs-vite'
import { Anton, DM_Sans, Space_Mono } from 'next/font/google'
import '@/styles/globals.css'

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: '--font-space-mono',
  subsets: ['latin'],
})

const anton = Anton({
  weight: '400',
  variable: '--font-anton',
  subsets: ['latin'],
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={`${anton.variable} ${spaceMono.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
