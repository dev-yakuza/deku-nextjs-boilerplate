import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { CreateBlogPost } from '.'

export default {
  title: 'Templates/CreateBlogPost',
  component: CreateBlogPost,
} as ComponentMeta<typeof CreateBlogPost>

const Template: ComponentStory<typeof CreateBlogPost> = (args) => (
  <CreateBlogPost {...args} />
)

export const Default = Template.bind({})
