import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SampleLocale } from '.'

export default {
  title: 'Components/SampleLocale',
  component: SampleLocale,
  parameters: { controls: { disabled: true } },
} as ComponentMeta<typeof SampleLocale>

const Template: ComponentStory<typeof SampleLocale> = () => <SampleLocale />

export const Default = Template.bind({})
