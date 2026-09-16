import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { getHomePageData } from '@/parsers/getHomePageData'
import { Skills } from '@/components/organisms/Skills'

const { SKILLS_DATA } = getHomePageData()

const meta: Meta<typeof Skills> = {
  tags: ['autodocs'],
  title: 'Organisms/Skills',
  component: Skills,
  argTypes: {
    title: { control: 'text' },
    mainTechnologies: { control: 'object' },
    technologies: { control: 'object' },
  },
}

export default meta

type Story = StoryObj<typeof Skills>

export const Default: Story = {
  args: {
    ...SKILLS_DATA,
  },
}
