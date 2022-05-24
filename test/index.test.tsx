import { render, screen } from '@testing-library/react'
import Home from 'pages/index'
import commonJA from 'locales/ja/common.json'
import I18nProvider from 'next-translate/I18nProvider'

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(
      <I18nProvider lang="en" namespaces={{ common: commonJA }}>
        <Home />{' '}
      </I18nProvider>,
    )

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
