import type { Meta, StoryObj } from '@storybook/react';

import Arrow from './Arrow.svg?react';

const meta: Meta<typeof Arrow> = {
  component: Arrow,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
