import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    type: 'Primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    type: 'Secondary',
    children: 'Secondary Button',
  },
}

export const LoadingButton: Story = {
  args: {
    type: 'Primary',
    children: 'Loading Button',
    loading: true,
  },
}

export const DisabledButton: Story = {
  args: {
    type: 'Primary',
    children: 'Disabled Button',
    disabled: true,
  },
}
