import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '@/components/atoms/Input'

const meta: Meta<typeof Input> = {
  tags: ['autodocs'],
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    input: { control: 'object' },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Input Label',
    input: {
      type: 'text',
    },
  },
}

export const Error: Story = {
  args: {
    label: 'Input Label',
    input: {
      type: 'text',
    },
    error: 'This field is required',
  },
}
