import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Form } from '@/components/molecules/Form'

const meta: Meta<typeof Form> = {
  tags: ['autodocs'],
  component: Form,
  title: 'Molecules/Form',
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Form>

export const Default: Story = {
  args: {},
}
