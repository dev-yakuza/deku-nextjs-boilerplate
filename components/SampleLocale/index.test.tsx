import { useEffect } from 'react'

import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'

import i18n from 'utils/i18n'

import { SampleLocale } from './index'

interface Props {
  readonly locale: 'en' | 'ko' | 'ja'
}
const TestComponent = ({ locale }: Props) => {
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <I18nextProvider i18n={i18n}>
      <SampleLocale />
    </I18nextProvider>
  )
}

describe('<SampleLocale />', () => {
  it('displayed well', () => {
    const { container, rerender } = render(<TestComponent locale="en" />)

    expect(
      screen.queryByText('English | Korean | Japanese'),
    ).toBeInTheDocument()
    expect(screen.queryByText('영어 | 한국어 | 일본어')).not.toBeInTheDocument()
    expect(screen.queryByText('英語 | 韓国語 | 日本語')).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()

    rerender(<TestComponent locale="ko" />)
    expect(
      screen.queryByText('English | Korean | Japanese'),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('영어 | 한국어 | 일본어')).toBeInTheDocument()
    expect(screen.queryByText('英語 | 韓国語 | 日本語')).not.toBeInTheDocument()

    rerender(<TestComponent locale="ja" />)
    expect(
      screen.queryByText('English | Korean | Japanese'),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('영어 | 한국어 | 일본어')).not.toBeInTheDocument()
    expect(screen.queryByText('英語 | 韓国語 | 日本語')).toBeInTheDocument()
  })
})
