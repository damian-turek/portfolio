import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Hero } from '@/components/organisms/Hero'
import { getHomePageData } from '@/parsers/getHomePageData'

const { HERO_DATA } = await getHomePageData()

const meta: Meta<typeof Hero> = {
  tags: ['autodocs'],
  title: 'Organisms/Hero',
  component: Hero,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'object' },
    tiles: { control: 'object' },
  },
}

export default meta

type Story = StoryObj<typeof Hero>

export const Default: Story = {
  args: { ...HERO_DATA },
}
