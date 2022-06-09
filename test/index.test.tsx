import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'utils/i18n'

import Home from 'pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Home />
      </I18nextProvider>,
    )

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
