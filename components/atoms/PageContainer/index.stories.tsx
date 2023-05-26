import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { PageContainer } from '.'

export default {
  title: 'Atoms/PageContainer',
  component: PageContainer,
} as ComponentMeta<typeof PageContainer>

const Template: ComponentStory<typeof PageContainer> = (args) => (
  <PageContainer {...args} />
)

export const String = Template.bind({})
String.args = {
  children: 'This is PageContainer',
}

export const Component = Template.bind({})
Component.args = {
  children: <h1>This is PageContainer</h1>,
}
