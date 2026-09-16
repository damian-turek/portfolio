import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AboutMe } from '@/components/organisms/AboutMe'
import { getHomePageData } from '@/parsers/getHomePageData'

const { ABOUT_ME_DATA } = getHomePageData()

const meta: Meta<typeof AboutMe> = {
  tags: ['autodocs'],
  title: 'Organisms/AboutMe',
  component: AboutMe,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'object' },
    positions: { control: 'object' },
  },
}

export default meta

type Story = StoryObj<typeof AboutMe>

export const Default: Story = {
  args: {
    ...ABOUT_ME_DATA,
  },
}
