import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tag } from '@/components/atoms/Tag'

const meta: Meta<typeof Tag> = {
  tags: ['autodocs'],
  component: Tag,
  title: 'Atoms/Tag',
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Tag>

export const Small: Story = {
  args: {
    text: 'Tag text',
  },
}

export const Medium: Story = {
  args: {
    text: 'Tag text',
    variant: 'medium',
  },
}

export const Large: Story = {
  args: {
    text: 'Tag text',
    variant: 'large',
  },
}
