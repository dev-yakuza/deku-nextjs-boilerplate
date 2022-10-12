import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { BlogItem } from '.'

export default {
  title: 'Organisms/BlogItem',
  component: BlogItem,
} as ComponentMeta<typeof BlogItem>

const Template: ComponentStory<typeof BlogItem> = (args) => (
  <BlogItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'This is the blog title',
  contents: 'This is the blog contents.',
}
