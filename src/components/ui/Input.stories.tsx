import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter text...',
    error: true,
    helperText: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: 'Enter text...',
    helperText: 'This is a helpful message',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter text...',
    disabled: true,
  },
};
