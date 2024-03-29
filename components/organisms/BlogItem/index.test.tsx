import { fireEvent, render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { getMockRouter, mockGrid } from 'utils/test'

import { BlogItem } from '.'

describe('<BlogItem />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BlogItem
        id={20}
        title="This is the blog title."
        body="This is the blog contents."
      />,
    )

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.item).toBe(true)
    expect(grid.xs).toBe(12)

    const link = grid.children
    expect(link.type.name).toBe('Link')
    expect(link.props.href).toBe('/posts/20')

    const titleComponent = link.props.children[0]
    expect(titleComponent.type.name).toBe('Typography')
    expect(titleComponent.props.children).toBe('This is the blog title.')

    const contentsComponent = link.props.children[1]
    expect(contentsComponent.type.name).toBe('Typography')
    expect(contentsComponent.props.children).toBe('This is the blog contents.')

    expect(container).toMatchSnapshot()
  })

  it('Go to the post detail page when the blog item is clicked', async () => {
    const routerPush = jest.fn()
    const mockRouter = getMockRouter()
    mockRouter.push = routerPush

    render(
      <RouterContext.Provider value={mockRouter}>
        <BlogItem
          id={40}
          title="This is the blog title."
          body="This is the blog contents."
        />
      </RouterContext.Provider>,
    )

    expect(routerPush).not.toBeCalled()
    fireEvent.click(screen.getByText('This is the blog title.'))
    expect(routerPush.mock.calls[0][0]).toBe('/posts/40')
  })
})
