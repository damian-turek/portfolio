import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { getHomePageData } from '@/parsers/getHomePageData'

const { PROJECTS_DATA } = getHomePageData()

const meta: Meta<typeof ProjectCard> = {
  tags: ['autodocs'],
  component: ProjectCard,
  title: 'Molecules/Projects',
  argTypes: {
    title: { control: 'text' },
    technologies: { control: 'object' },
    description: { control: 'text' },
    projectUrl: { control: 'text' },
    index: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof ProjectCard>

export const Default: Story = {
  args: {
    ...PROJECTS_DATA.projects[0],
  },
}
