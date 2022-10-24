import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { BlogList } from '.'

export default {
  title: 'Templates/BlogList',
  component: BlogList,
} as ComponentMeta<typeof BlogList>

const Template: ComponentStory<typeof BlogList> = (args) => (
  <BlogList {...args} />
)

export const Default = Template.bind({})

export const WithData = Template.bind({})
WithData.args = {
  posts: [
    { id: 1, title: 'blog title 1', contents: 'blog contents 1' },
    { id: 2, title: 'blog title 2', contents: 'blog contents 2' },
    { id: 3, title: 'blog title 3', contents: 'blog contents 3' },
    { id: 4, title: 'blog title 4', contents: 'blog contents 4' },
    { id: 5, title: 'blog title 5', contents: 'blog contents 5' },
    { id: 6, title: 'blog title 6', contents: 'blog contents 6' },
    { id: 7, title: 'blog title 7', contents: 'blog contents 7' },
    { id: 8, title: 'blog title 8', contents: 'blog contents 8' },
  ],
}
