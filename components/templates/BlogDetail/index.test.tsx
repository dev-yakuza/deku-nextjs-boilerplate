import { fireEvent, render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { mockToolbar, mockGrid, getMockRouter } from 'utils/test'

import { BlogDetail } from '.'

describe('<BlogDetail />', () => {
  it('Skeleton is rendered with no data', async () => {
    const { container } = render(<BlogDetail post={undefined} />)

    expect(mockToolbar.mock.calls.length).toBe(1)

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.container).toBe(true)

    const blogDetail = grid.children
    expect(blogDetail.type.render.displayName).toBe('Styled(Grid)')
    expect(blogDetail.props.item).toBe(true)
    expect(blogDetail.props.xs).toBe(12)

    expect(blogDetail.props.children.length).toBe(4)

    const backButton = blogDetail.props.children[0]
    expect(backButton.type.render.name).toBe('Button')
    expect(backButton.props.size).toBe('small')
    expect(backButton.props.color).toBe('inherit')
    expect(backButton.props.style).toEqual({ marginBottom: 16 })
    expect(backButton.props.startIcon.type.type.render.displayName).toBe(
      'ArrowBackIosNewIcon',
    )
    expect(backButton.props.onClick.name).toBe('handleBack')
    expect(backButton.props.children).toBe('Posts')

    const blogTitle = blogDetail.props.children[1]
    expect(blogTitle.type.name).toBe('Typography')
    expect(blogTitle.props.variant).toBe('h1')
    expect(blogTitle.props.style).toEqual({
      fontWeight: 600,
      margin: '0 16px',
    })
    expect(blogTitle.props.children.type.render.name).toBe('Skeleton')

    const divider = blogDetail.props.children[2]
    expect(divider.type.render.name).toBe('Divider')
    expect(divider.props.style).toEqual({ margin: '16px 0' })

    const blogBody = blogDetail.props.children[3]
    expect(blogBody.type.name).toBe('Typography')
    expect(blogBody.props.style).toEqual({ margin: '0 8px' })

    const contents = blogBody.props.children.props.children
    expect(contents.length).toBe(3)
    expect(contents[0].type.render.name).toBe('Skeleton')
    expect(contents[1].type.render.name).toBe('Skeleton')
    expect(contents[2].type.render.name).toBe('Skeleton')

    expect(container).toMatchSnapshot()
  })

  it('contents are rendered with data', async () => {
    const { container } = render(
      <BlogDetail
        post={{
          userId: 1,
          id: 1,
          title: 'blog title 1',
          body: 'blog contents 1',
        }}
      />,
    )

    const grid = mockGrid.mock.calls[0][0]
    const blogDetail = grid.children
    expect(blogDetail.props.children.length).toBe(4)

    const blogTitle = blogDetail.props.children[1]
    expect(blogTitle.props.variant).toBe('h1')
    expect(blogTitle.props.children).toBe('blog title 1')

    const blogBody = blogDetail.props.children[3]
    expect(blogBody.type.name).toBe('Typography')
    expect(blogBody.props.children).toBe('blog contents 1')

    expect(container).toMatchSnapshot()
  })

  it('Go to posts page when back button is clicked', async () => {
    const routerPush = jest.fn()
    const mockRouter = getMockRouter()
    mockRouter.push = routerPush

    render(
      <RouterContext.Provider value={mockRouter}>
        <BlogDetail
          post={{
            userId: 1,
            id: 1,
            title: 'blog title 1',
            body: 'blog contents 1',
          }}
        />
        ,
      </RouterContext.Provider>,
    )

    expect(routerPush).not.toBeCalled()
    fireEvent.click(screen.getByText('Posts'))
    expect(routerPush.mock.calls[0][0]).toBe('/')
  })
})
