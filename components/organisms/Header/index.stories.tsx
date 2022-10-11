import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { Header } from '.'

export default {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    backgrounds: {
      default: 'App background color',
      values: [{ name: 'App background color', value: '#EEEEEE' }],
    },
  },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const Default = Template.bind({})
