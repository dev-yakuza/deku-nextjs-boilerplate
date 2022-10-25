import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { PageLoading } from '.'

export default {
  title: 'Atoms/PageLoading',
  component: PageLoading,
} as ComponentMeta<typeof PageLoading>

const Template: ComponentStory<typeof PageLoading> = () => <PageLoading />

export const Default = Template.bind({})
