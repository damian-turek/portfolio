import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '@/components/atoms/Button'
import { MoveUpRight } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    iconOnly: { type: 'boolean' },
    isRounded: { type: 'boolean' },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    link: '#',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'primary',
    icon: MoveUpRight,
  },
}

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    variant: 'primary',
    icon: MoveUpRight,
  },
}

export const RoundedIconOnly: Story = {
  args: {
    isRounded: true,
    iconOnly: true,
    variant: 'primary',
    icon: MoveUpRight,
  },
}
