import { fireEvent, render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { getMockRouter, mockAppBar } from 'utils/test'

import { Header } from '.'

describe('<Header />', () => {
  it('Rendered well', async () => {
    const { container } = render(<Header />)

    const appBar = mockAppBar.mock.calls[0][0]
    expect(appBar.position).toBe('fixed')
    expect(appBar.elevation).toBe(4)
    expect(appBar.style).toEqual({
      backgroundColor: '#FFF',
    })

    const toolbar = appBar.children
    expect(toolbar.type.name).toBe('Toolbar')
    expect(toolbar.props.sx).toEqual({ flexWrap: 'wrap' })

    const appTitleLink = toolbar.props.children
    expect(appTitleLink.type.name).toBe('Link')
    expect(appTitleLink.props.href).toBe('/')

    const appTitle = appTitleLink.props.children
    expect(appTitle.type.name).toBe('Typography')
    expect(appTitle.props.variant).toBe('h6')
    expect(appTitle.props.color).toBe('inherit')
    expect(appTitle.props.noWrap).toBe(true)
    expect(appTitle.props.sx).toEqual({ flexGrow: 1 })
    expect(appTitle.props.children).toBe('Blog App')

    expect(container).toMatchSnapshot()
  })

  it('Go to the root page when the app title is clicked', async () => {
    const routerPush = jest.fn()
    const mockRouter = getMockRouter()
    mockRouter.push = routerPush

    render(
      <RouterContext.Provider value={mockRouter}>
        <Header />
      </RouterContext.Provider>,
    )

    expect(routerPush).not.toBeCalled()
    fireEvent.click(screen.getByText('Blog App'))
    expect(routerPush.mock.calls[0][0]).toBe('/')
  })
})
