import AddIcon from '@mui/icons-material/Add'
import { render, screen, fireEvent } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { mockLink, getMockRouter } from 'utils/test'

import { FloatingActionLink } from '.'

describe('<FloatingActionLink />', () => {
  it('Rendered well with string', async () => {
    const { container } = render(
      <FloatingActionLink link="/posts/add">Add</FloatingActionLink>,
    )

    const link = mockLink.mock.calls[0][0]
    expect(link.href).toBe('/posts/add')

    const button = link.children
    expect(button.type.render.displayName).toBe('Styled(Component)')

    const style = button.type.__emotion_styles[0]
    expect(style.includes('position: absolute;')).toBe(true)
    expect(style.includes('right: 40px;')).toBe(true)
    expect(style.includes('bottom: 40px;')).toBe(true)

    expect(button.type.__emotion_base.render.name).toBe('Fab')
    expect(button.props.color).toBe('primary')
    expect(button.props['aria-label']).toBe('add')
    expect(button.props.children).toBe('Add')

    expect(container).toMatchSnapshot()
  })

  it('Rendered well with icon', async () => {
    const { container } = render(
      <FloatingActionLink link="/posts/add">
        <AddIcon />
      </FloatingActionLink>,
    )

    const link = mockLink.mock.calls[0][0]
    expect(link.href).toBe('/posts/add')

    const button = link.children
    expect(button.type.render.displayName).toBe('Styled(Component)')

    const style = button.type.__emotion_styles[0]
    expect(style.includes('position: absolute;')).toBe(true)
    expect(style.includes('right: 40px;')).toBe(true)
    expect(style.includes('bottom: 40px;')).toBe(true)
    expect(button.type.__emotion_base.render.name).toBe('Fab')
    expect(button.props.color).toBe('primary')
    expect(button.props['aria-label']).toBe('add')

    const icon = button.props.children
    expect(icon.type.type.render.displayName).toBe('AddIcon')
    expect(icon.type.type.render.muiName).toBe('SvgIcon')

    expect(container).toMatchSnapshot()
  })

  it('Go to the link page when the button is clicked', async () => {
    const routerPush = jest.fn()
    const mockRouter = getMockRouter()
    mockRouter.push = routerPush

    render(
      <RouterContext.Provider value={mockRouter}>
        <FloatingActionLink link="/posts/add">Add</FloatingActionLink>,
      </RouterContext.Provider>,
    )

    expect(routerPush).not.toBeCalled()
    fireEvent.click(screen.getByText('Add'))
    expect(routerPush.mock.calls[0][0]).toBe('/posts/add')
  })
})
