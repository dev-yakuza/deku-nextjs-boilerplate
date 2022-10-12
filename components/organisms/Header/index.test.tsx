import { render } from '@testing-library/react'

import { mockAppBar } from 'utils/test/mocks'

import { Header } from '.'

describe('<Header />', () => {
  it('Rendered well', async () => {
    const { container } = render(<Header />)

    const appBar = mockAppBar.mock.calls[0][0]
    expect(appBar.position).toBe('static')
    expect(appBar.elevation).toBe(0)
    expect(appBar.style).toEqual({
      backgroundColor: '#FFF',
    })

    const toolbar = appBar.children
    expect(toolbar.type.name).toBe('Toolbar')
    expect(toolbar.props.sx).toEqual({ flexWrap: 'wrap' })

    const appTitle = toolbar.props.children
    expect(appTitle.type.name).toBe('Typography')
    expect(appTitle.props.variant).toBe('h6')
    expect(appTitle.props.color).toBe('inherit')
    expect(appTitle.props.noWrap).toBe(true)
    expect(appTitle.props.sx).toEqual({ flexGrow: 1 })
    expect(appTitle.props.children).toBe('Blog App')

    expect(container).toMatchSnapshot()
  })
})
