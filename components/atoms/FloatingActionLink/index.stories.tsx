import AddIcon from '@mui/icons-material/Add'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { FloatingActionLink } from '.'

export default {
  title: 'Atoms/FloatingActionLink',
  component: FloatingActionLink,
} as ComponentMeta<typeof FloatingActionLink>

const Template: ComponentStory<typeof FloatingActionLink> = (args) => (
  <FloatingActionLink {...args} />
)

export const Text = Template.bind({})
Text.args = {
  link: '/posts/add',
  children: 'Add',
}

export const Icon = Template.bind({})
Icon.args = {
  link: '/posts/add',
  children: <AddIcon />,
}
