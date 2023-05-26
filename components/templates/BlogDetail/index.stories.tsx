import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { BlogDetail } from '.'

export default {
  title: 'Templates/BlogDetail',
  component: BlogDetail,
} as ComponentMeta<typeof BlogDetail>

const Template: ComponentStory<typeof BlogDetail> = (args) => (
  <BlogDetail {...args} />
)

export const Default = Template.bind({})

export const WithData = Template.bind({})
WithData.args = {
  post: { userId: 1, id: 1, title: 'blog title 1', body: 'blog contents 1' },
}
