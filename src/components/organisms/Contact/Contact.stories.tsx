import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Contact } from '@/components/organisms/Contact'
import { getHomePageData } from '@/parsers/getHomePageData'

const { CONTACT_DATA } = await getHomePageData('en')

const meta: Meta<typeof Contact> = {
  tags: ['autodocs'],
  title: 'Organisms/Contact',
  component: Contact,
  argTypes: {
    title: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Contact>

export const Default: Story = {
  args: {
    ...CONTACT_DATA,
  },
}
