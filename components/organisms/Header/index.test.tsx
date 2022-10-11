import { render } from '@testing-library/react'

import { mockAppBar, mockToolbar, mockTypography } from 'utils/test/mocks'

import { Header } from '.'

describe('<Header />', () => {
  it('Rendered well', async () => {
    const { container } = render(<Header />)

    expect(mockAppBar.mock.calls[0][0].position).toBe('static')
    expect(mockAppBar.mock.calls[0][0].elevation).toBe(0)
    expect(mockAppBar.mock.calls[0][0].style).toEqual({
      backgroundColor: '#FFF',
    })

    expect(mockToolbar.mock.calls[0][0].sx).toEqual({ flexWrap: 'wrap' })

    expect(mockTypography.mock.calls[0][0].variant).toBe('h6')
    expect(mockTypography.mock.calls[0][0].color).toBe('inherit')
    expect(mockTypography.mock.calls[0][0].noWrap).toBe(true)
    expect(mockTypography.mock.calls[0][0].sx).toEqual({ flexGrow: 1 })
    expect(mockTypography.mock.calls[0][0].children).toBe('Blog App')

    expect(container).toMatchSnapshot()
  })
})
