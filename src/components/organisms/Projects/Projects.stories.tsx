import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Projects } from '@/components/organisms/Projects'
import { getHomePageData } from '@/parsers/getHomePageData'

const { PROJECTS_DATA } = getHomePageData()

const meta: Meta<typeof Projects> = {
  tags: ['autodocs'],
  title: 'Organisms/Projects',
  component: Projects,
  argTypes: {
    title: { control: 'text' },
    projects: { control: 'object' },
  },
}

export default meta

type Story = StoryObj<typeof Projects>

export const Default: Story = {
  args: {
    ...PROJECTS_DATA,
  },
}
